import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useAppState } from "@/hooks/use-app-state";
import { useToast } from "@/hooks/use-toast";
import QuestionMultipleChoice from "@/components/question-multiple-choice";
import QuestionStarRating from "@/components/question-star-rating";
import QuestionFreeText from "@/components/question-free-text";
import {
  getQuestionsForProduct,
  createEvaluation,
  updateEvaluation,
  completeEvaluation as completeEvaluationStorage,
} from "@/lib/local-storage";

// Debounce utility function
function debounce<T extends (...args: any[]) => any>(func: T, wait: number): T {
  let timeout: ReturnType<typeof setTimeout>;
  return ((...args: any[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T;
}

export default function Evaluation() {
  const [, setLocation] = useLocation();
  const { user, currentProduct, setCurrentEvaluation } = useAppState();
  const { toast } = useToast();

  const [currentStage, setCurrentStage] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [stageAnswers, setStageAnswers] = useState<Record<number, any>>({});
  const [evaluationId, setEvaluationId] = useState<number | null>(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [earnings, setEarnings] = useState<string>("");
  const [showStageComplete, setShowStageComplete] = useState(false);
  const [allAnswers, setAllAnswers] = useState<Record<string, any>>({});

  // Get questions for current stage from local storage
  const questions = getQuestionsForProduct(currentProduct?.id || 0)
    .filter((q) => q.stage === currentStage)
    .sort((a, b) => a.questionNumber - b.questionNumber);

  // Create evaluation on mount if not exists
  useEffect(() => {
    if (user && currentProduct && !evaluationId) {
      const newEvaluation = createEvaluation(user.id, currentProduct.id);
      setEvaluationId(newEvaluation.id);
      setCurrentEvaluation(newEvaluation);
    }
  }, [user, currentProduct, evaluationId, setCurrentEvaluation]);

  // Load existing answers for current stage
  useEffect(() => {
    if (evaluationId) {
      const existingAnswers = allAnswers[`stage_${currentStage}`] || {};
      const answeredQuestions = Object.keys(existingAnswers).length;

      setStageAnswers(existingAnswers);
      setAnsweredCount(answeredQuestions);
    }
  }, [currentStage, evaluationId, currentProduct, allAnswers]);

  // Create debounced save function
  const debouncedSave = useCallback(
    debounce((stageAnswers: Record<number, any>) => {
      if (evaluationId) {
        const updatedAllAnswers = {
          ...allAnswers,
          [`stage_${currentStage}`]: stageAnswers,
        };

        updateEvaluation(evaluationId, {
          answers: updatedAllAnswers,
          currentStage: currentStage,
        });

        setAllAnswers(updatedAllAnswers);
      }
    }, 500),
    [evaluationId, currentStage, allAnswers]
  );

  // Auto-save when answers change
  useEffect(() => {
    if (Object.keys(stageAnswers).length > 0) {
      debouncedSave(stageAnswers);
    }
  }, [stageAnswers, debouncedSave]);

  const handleBack = () => {
    setLocation("/main");
  };

  const handleAnswerChange = (
    questionId: number,
    answer: any,
    questionType: string
  ) => {
    // Check if this is a new answer
    const isNewAnswer = !stageAnswers[questionId];

    setStageAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));

    // Auto-advance for single-choice and star-rating questions
    if (questionType === "multiple_choice" || questionType === "star_rating") {
      // Update answered count only if this is a new answer
      if (isNewAnswer) {
        setAnsweredCount((prev) => prev + 1);
      }

      // Show success toast
      toast({
        title: "Progreso guardado",
        description: "Tu respuesta ha sido registrada",
      });

      // Auto-advance with smooth animation
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex((prev) => prev + 1);
        } else {
          // All questions answered - show stage complete
          setShowStageComplete(true);
        }
      }, 300);
    }
  };

  const handleNextQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion || !stageAnswers[currentQuestion.id]) {
      return; // Don't advance if no answer
    }

    setAnsweredCount((prev) => prev + 1);

    // Show success toast
    toast({
      title: "Progreso guardado",
      description: "Tu respuesta ha sido registrada",
    });

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // All questions answered - show stage complete
      setShowStageComplete(true);
    }
  };

  const handleNextStage = () => {
    if (currentStage < 5) {
      setCurrentStage(currentStage + 1);
      setCurrentQuestionIndex(0);
      setAnsweredCount(0);
      setShowStageComplete(false);
      setStageAnswers(allAnswers[`stage_${currentStage + 1}`] || {});
    } else {
      // Complete evaluation
      if (evaluationId) {
        const completedEvaluation = completeEvaluationStorage(evaluationId);
        if (completedEvaluation) {
          setEarnings(completedEvaluation.totalEarned);
          setShowCompletionModal(true);
          setCurrentEvaluation(completedEvaluation);
        }
      }
    }
  };

  const canContinue = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) return false;

    const answer = stageAnswers[currentQuestion.id];
    if (currentQuestion.type === "free_text") {
      return answer && answer.trim() !== "";
    }
    return answer !== undefined && answer !== "";
  };

  const handleModalClose = () => {
    setShowCompletionModal(false);
    setLocation("/wallet");
  };

  if (!currentProduct) {
    return <div>No product selected</div>;
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-neutral-600">
            No hay preguntas disponibles para este producto
          </p>
          <Button onClick={handleBack} className="mt-4">
            Volver
          </Button>
        </div>
      </div>
    );
  }

  // Hide total product count from users for better UX
  const progressPercentage = (answeredCount / questions.length) * 100;
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <>
      <div className="min-h-screen bg-neutral-50">
        {/* Header */}
        <div className="bg-white border-b border-neutral-200 px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="text-neutral-600 hover:text-neutral-800"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="text-center">
              <h2 className="text-lg font-semibold text-neutral-800">
                Evaluación de Producto
              </h2>
              <p className="text-sm text-neutral-600">
                Etapa {currentStage} de 5
              </p>
            </div>
            <div className="w-6"></div>
          </div>
        </div>

        {/* Progress Bar */}
        <Progress value={progressPercentage} className="h-2" />

        {/* Product Info - Instagram style */}
        <Card className="mx-4 mt-4 border border-neutral-200">
          <CardContent className="p-0">
            {/* Instagram-style square image */}
            <div className="aspect-square w-full">
              <img
                src={currentProduct.imageUrl}
                alt={currentProduct.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <p className="text-sm text-neutral-600">
                Evaluación en progreso • {answeredCount}/{questions.length}{" "}
                respondidas
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Questions Area */}
        <div className="p-4 pb-24">
          {showStageComplete ? (
            // Stage Completion View
            <Card className="border border-neutral-200">
              <CardContent className="p-6 text-center">
                <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="text-primary h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                  Has completado la Etapa {currentStage}
                </h3>
                <p className="text-neutral-600 mb-6">
                  Todas las preguntas han sido respondidas correctamente
                </p>
                <Button
                  onClick={handleNextStage}
                  className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold text-lg"
                >
                  {currentStage < 5
                    ? "Siguiente etapa"
                    : "Finalizar evaluación"}
                </Button>
              </CardContent>
            </Card>
          ) : currentQuestion ? (
            // Single Question View
            <Card className="border border-neutral-200">
              <CardContent className="p-4">
                <h3 className="font-semibold text-neutral-800 mb-4">
                  {currentQuestion.questionNumber}. {currentQuestion.question}
                </h3>

                {currentQuestion.type === "multiple_choice" && (
                  <QuestionMultipleChoice
                    question={currentQuestion}
                    value={stageAnswers[currentQuestion.id]}
                    onChange={(value) =>
                      handleAnswerChange(
                        currentQuestion.id,
                        value,
                        currentQuestion.type
                      )
                    }
                  />
                )}

                {currentQuestion.type === "star_rating" && (
                  <QuestionStarRating
                    question={currentQuestion}
                    value={stageAnswers[currentQuestion.id]}
                    onChange={(value) =>
                      handleAnswerChange(
                        currentQuestion.id,
                        value,
                        currentQuestion.type
                      )
                    }
                  />
                )}

                {currentQuestion.type === "free_text" && (
                  <>
                    <QuestionFreeText
                      value={stageAnswers[currentQuestion.id]}
                      onChange={(value) =>
                        handleAnswerChange(
                          currentQuestion.id,
                          value,
                          currentQuestion.type
                        )
                      }
                    />
                    <Button
                      onClick={handleNextQuestion}
                      disabled={!canContinue()}
                      className="w-full mt-4 bg-primary text-white py-3 px-6 rounded-lg font-semibold disabled:bg-neutral-300 disabled:cursor-not-allowed"
                    >
                      Continuar
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="text-center py-8">
              <p className="text-neutral-600">No hay preguntas disponibles</p>
            </div>
          )}
        </div>
      </div>

      {/* Completion Modal */}
      <Dialog open={showCompletionModal} onOpenChange={setShowCompletionModal}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader className="text-center">
            <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="text-primary h-8 w-8" />
            </div>
            <DialogTitle className="text-xl font-bold text-neutral-800">
              ¡Completado!
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-4">
            <p className="text-lg text-neutral-700">
              Has ganado{" "}
              <span className="font-bold text-primary">R$ {earnings}</span>
            </p>
            <Button
              onClick={handleModalClose}
              className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold"
            >
              Ver mi saldo
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
