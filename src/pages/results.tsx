import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Star } from "lucide-react";
import { useAppState } from "@/hooks/use-app-state";
import BottomNavigation from "@/components/bottom-navigation";

export default function Results() {
  const [, setLocation] = useLocation();
  const { currentEvaluation } = useAppState();

  if (!currentEvaluation) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-neutral-600">No hay resultados disponibles</p>
          <Button onClick={() => setLocation("/main")} className="mt-4">
            Volver al inicio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 px-4 py-4">
        <div className="text-center">
          <h1 className="text-xl font-bold text-neutral-800">
            Resultados de la Evaluación
          </h1>
          <p className="text-sm text-neutral-600">
            ¡Gracias por tu participación!
          </p>
        </div>
      </div>

      {/* Results Content */}
      <div className="p-4 space-y-4">
        {/* Success Card */}
        <Card className="border border-green-200 bg-green-50">
          <CardContent className="p-6 text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="text-green-600 h-8 w-8" />
            </div>
            <h2 className="text-xl font-bold text-neutral-800 mb-2">
              ¡Evaluación Completada!
            </h2>
            <p className="text-neutral-600 mb-4">
              Has completado exitosamente la evaluación del producto
            </p>
            <div className="bg-white rounded-lg p-4 mb-4">
              <p className="text-2xl font-bold text-green-600">
                R$ {currentEvaluation.totalEarned}
              </p>
              <p className="text-sm text-neutral-600">
                Ganado en esta evaluación
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Stats Card */}
        <Card className="border border-neutral-200">
          <CardContent className="p-4">
            <h3 className="font-semibold text-neutral-800 mb-3">
              Resumen de la Evaluación
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-neutral-600">Producto evaluado:</span>
                <span className="font-medium">
                  Producto #{currentEvaluation.productId}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-600">Fecha:</span>
                <span className="font-medium">
                  {new Date(
                    currentEvaluation.completedAt || Date.now()
                  ).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-600">Preguntas respondidas:</span>
                <span className="font-medium">
                  {Object.keys(currentEvaluation.answers || {}).length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={() => setLocation("/wallet")}
            className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold"
          >
            <div className="flex items-center justify-center gap-2">
              <span>Ver mi saldo</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </Button>

          <Button
            variant="outline"
            onClick={() => setLocation("/main")}
            className="w-full border-neutral-300 text-neutral-700 py-3 px-6 rounded-lg font-semibold"
          >
            Evaluar otro producto
          </Button>
        </div>

        {/* Rating Prompt */}
        <Card className="border border-neutral-200">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-1 mb-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            </div>
            <p className="text-sm text-neutral-600">
              ¿Te gustó evaluar este producto? ¡Continúa evaluando para ganar
              más dinero!
            </p>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
}
