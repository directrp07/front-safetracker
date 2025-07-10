import { AppProduct, AppQuestion, AppUser } from "@/types";

// Mock Products
export const mockProducts: AppProduct[] = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    category: "Smartphones",
    imageUrl:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop",
    minEarning: "2.50",
    maxEarning: "5.00",
    active: true,
  },
  {
    id: 2,
    name: "MacBook Air M2",
    category: "Laptops",
    imageUrl:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    minEarning: "3.00",
    maxEarning: "6.00",
    active: true,
  },
  {
    id: 3,
    name: "Samsung Galaxy S24",
    category: "Smartphones",
    imageUrl:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop",
    minEarning: "2.00",
    maxEarning: "4.50",
    active: true,
  },
  {
    id: 4,
    name: "Dell XPS 13",
    category: "Laptops",
    imageUrl:
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop",
    minEarning: "2.75",
    maxEarning: "5.50",
    active: true,
  },
  {
    id: 5,
    name: "Sony WH-1000XM5",
    category: "Audio",
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    minEarning: "1.50",
    maxEarning: "3.00",
    active: true,
  },
  {
    id: 6,
    name: "Nintendo Switch OLED",
    category: "Gaming",
    imageUrl:
      "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400&h=400&fit=crop",
    minEarning: "1.75",
    maxEarning: "3.50",
    active: true,
  },
];

// Mock Questions for each product (5 stages)
export const mockQuestions: Record<number, AppQuestion[]> = {
  1: [
    // iPhone 15 Pro - Stage 1: Background & Experience
    {
      id: 1,
      productId: 1,
      stage: 1,
      questionNumber: 1,
      type: "multiple_choice",
      question: "¿Cuál es tu experiencia general con smartphones?",
      options: ["Iniciante", "Intermedio", "Avanzado", "Experto"],
    },
    {
      id: 2,
      productId: 1,
      stage: 1,
      questionNumber: 2,
      type: "star_rating",
      question: "¿Cómo evalúas la importancia de la calidad de la cámara?",
    },
    {
      id: 3,
      productId: 1,
      stage: 1,
      questionNumber: 3,
      type: "free_text",
      question: "Describe lo que más valoras en un smartphone.",
    },
    {
      id: 4,
      productId: 1,
      stage: 1,
      questionNumber: 4,
      type: "multiple_choice",
      question: "¿Qué sistema operativo prefieres?",
      options: ["iOS", "Android", "No tengo preferencia"],
    },
    {
      id: 5,
      productId: 1,
      stage: 1,
      questionNumber: 5,
      type: "star_rating",
      question: "¿Cómo evalúas la importancia de la duración de la batería?",
    },
    // Stage 2: Product Features
    {
      id: 6,
      productId: 1,
      stage: 2,
      questionNumber: 1,
      type: "multiple_choice",
      question: "¿Qué característica del iPhone 15 Pro te interesa más?",
      options: [
        "Cámara profesional",
        "Rendimiento A17 Pro",
        "Diseño en titanio",
        "Todas las opciones",
      ],
    },
    {
      id: 7,
      productId: 1,
      stage: 2,
      questionNumber: 2,
      type: "star_rating",
      question: "¿Cómo evalúas la importancia del chip A17 Pro?",
    },
    {
      id: 8,
      productId: 1,
      stage: 2,
      questionNumber: 3,
      type: "free_text",
      question: "¿Qué opinas de la nueva cámara de 48MP?",
    },
    {
      id: 9,
      productId: 1,
      stage: 2,
      questionNumber: 4,
      type: "multiple_choice",
      question: "¿Usarías la función de Action Button?",
      options: ["Sí, muy útil", "Tal vez", "No, no veo utilidad"],
    },
    {
      id: 10,
      productId: 1,
      stage: 2,
      questionNumber: 5,
      type: "star_rating",
      question: "¿Cómo evalúas el precio del iPhone 15 Pro?",
    },
    // Stage 3: User Experience
    {
      id: 11,
      productId: 1,
      stage: 3,
      questionNumber: 1,
      type: "multiple_choice",
      question: "¿Cómo evalúas la facilidad de uso del iOS?",
      options: ["Muy fácil", "Fácil", "Neutral", "Difícil", "Muy difícil"],
    },
    {
      id: 12,
      productId: 1,
      stage: 3,
      questionNumber: 2,
      type: "star_rating",
      question: "¿Cómo evalúas la velocidad del sistema?",
    },
    {
      id: 13,
      productId: 1,
      stage: 3,
      questionNumber: 3,
      type: "free_text",
      question: "¿Qué te gustaría mejorar en el iPhone 15 Pro?",
    },
    {
      id: 14,
      productId: 1,
      stage: 3,
      questionNumber: 4,
      type: "multiple_choice",
      question: "¿Te importa el tamaño del dispositivo?",
      options: [
        "Muy importante",
        "Importante",
        "Poco importante",
        "No importante",
      ],
    },
    {
      id: 15,
      productId: 1,
      stage: 3,
      questionNumber: 5,
      type: "star_rating",
      question: "¿Cómo evalúas la calidad de construcción?",
    },
    // Stage 4: Comparison & Value
    {
      id: 16,
      productId: 1,
      stage: 4,
      questionNumber: 1,
      type: "multiple_choice",
      question: "¿Cómo se compara con otros smartphones del mercado?",
      options: [
        "Muy superior",
        "Superior",
        "Similar",
        "Inferior",
        "Muy inferior",
      ],
    },
    {
      id: 17,
      productId: 1,
      stage: 4,
      questionNumber: 2,
      type: "star_rating",
      question: "¿Cómo evalúas la relación calidad-precio?",
    },
    {
      id: 18,
      productId: 1,
      stage: 4,
      questionNumber: 3,
      type: "free_text",
      question: "¿Qué ventajas tiene sobre la competencia?",
    },
    {
      id: 19,
      productId: 1,
      stage: 4,
      questionNumber: 4,
      type: "multiple_choice",
      question: "¿Vale la pena el precio premium?",
      options: [
        "Definitivamente sí",
        "Probablemente sí",
        "Tal vez",
        "Probablemente no",
        "Definitivamente no",
      ],
    },
    {
      id: 20,
      productId: 1,
      stage: 4,
      questionNumber: 5,
      type: "star_rating",
      question: "¿Cómo evalúas la innovación del producto?",
    },
    // Stage 5: Final Assessment
    {
      id: 21,
      productId: 1,
      stage: 5,
      questionNumber: 1,
      type: "multiple_choice",
      question: "¿Recomendarías el iPhone 15 Pro a un amigo?",
      options: [
        "Definitivamente sí",
        "Probablemente sí",
        "Tal vez",
        "Probablemente no",
        "Definitivamente no",
      ],
    },
    {
      id: 22,
      productId: 1,
      stage: 5,
      questionNumber: 2,
      type: "star_rating",
      question: "¿Cómo evalúas la experiencia general del producto?",
    },
    {
      id: 23,
      productId: 1,
      stage: 5,
      questionNumber: 3,
      type: "free_text",
      question: "¿Cuál es tu opinión final sobre el iPhone 15 Pro?",
    },
    {
      id: 24,
      productId: 1,
      stage: 5,
      questionNumber: 4,
      type: "multiple_choice",
      question: "¿Comprarías este producto?",
      options: [
        "Sí, inmediatamente",
        "Sí, pronto",
        "Tal vez en el futuro",
        "No",
      ],
    },
    {
      id: 25,
      productId: 1,
      stage: 5,
      questionNumber: 5,
      type: "star_rating",
      question: "¿Cómo evalúas la satisfacción general?",
    },
  ],
  2: [
    // MacBook Air M2 - Stage 1: Background & Experience
    {
      id: 26,
      productId: 2,
      stage: 1,
      questionNumber: 1,
      type: "multiple_choice",
      question: "¿Cuál es tu experiencia con computadoras?",
      options: ["Iniciante", "Intermedio", "Avanzado", "Experto"],
    },
    {
      id: 27,
      productId: 2,
      stage: 1,
      questionNumber: 2,
      type: "star_rating",
      question: "¿Cómo evalúas la importancia de la portabilidad?",
    },
    {
      id: 28,
      productId: 2,
      stage: 1,
      questionNumber: 3,
      type: "free_text",
      question: "¿Para qué usarías principalmente esta laptop?",
    },
    {
      id: 29,
      productId: 2,
      stage: 1,
      questionNumber: 4,
      type: "multiple_choice",
      question: "¿Qué sistema operativo prefieres?",
      options: ["macOS", "Windows", "Linux", "No tengo preferencia"],
    },
    {
      id: 30,
      productId: 2,
      stage: 1,
      questionNumber: 5,
      type: "star_rating",
      question: "¿Cómo evalúas la importancia de la duración de la batería?",
    },
    // Stage 2: Product Features
    {
      id: 31,
      productId: 2,
      stage: 2,
      questionNumber: 1,
      type: "multiple_choice",
      question: "¿Qué característica del MacBook Air M2 te interesa más?",
      options: [
        "Chip M2",
        "Diseño delgado",
        "Pantalla Retina",
        "Todas las opciones",
      ],
    },
    {
      id: 32,
      productId: 2,
      stage: 2,
      questionNumber: 2,
      type: "star_rating",
      question: "¿Cómo evalúas la importancia del rendimiento del M2?",
    },
    {
      id: 33,
      productId: 2,
      stage: 2,
      questionNumber: 3,
      type: "free_text",
      question: "¿Qué opinas del diseño del MacBook Air?",
    },
    {
      id: 34,
      productId: 2,
      stage: 2,
      questionNumber: 4,
      type: "multiple_choice",
      question: "¿Te importa el peso de la laptop?",
      options: [
        "Muy importante",
        "Importante",
        "Poco importante",
        "No importante",
      ],
    },
    {
      id: 35,
      productId: 2,
      stage: 2,
      questionNumber: 5,
      type: "star_rating",
      question: "¿Cómo evalúas el precio del MacBook Air M2?",
    },
    // Stage 3: User Experience
    {
      id: 36,
      productId: 2,
      stage: 3,
      questionNumber: 1,
      type: "multiple_choice",
      question: "¿Cómo evalúas la facilidad de uso del macOS?",
      options: ["Muy fácil", "Fácil", "Neutral", "Difícil", "Muy difícil"],
    },
    {
      id: 37,
      productId: 2,
      stage: 3,
      questionNumber: 2,
      type: "star_rating",
      question: "¿Cómo evalúas la velocidad del sistema?",
    },
    {
      id: 38,
      productId: 2,
      stage: 3,
      questionNumber: 3,
      type: "free_text",
      question: "¿Qué te gustaría mejorar en el MacBook Air?",
    },
    {
      id: 39,
      productId: 2,
      stage: 3,
      questionNumber: 4,
      type: "multiple_choice",
      question: "¿Te importa el tamaño de la pantalla?",
      options: [
        "Muy importante",
        "Importante",
        "Poco importante",
        "No importante",
      ],
    },
    {
      id: 40,
      productId: 2,
      stage: 3,
      questionNumber: 5,
      type: "star_rating",
      question: "¿Cómo evalúas la calidad de construcción?",
    },
    // Stage 4: Comparison & Value
    {
      id: 41,
      productId: 2,
      stage: 4,
      questionNumber: 1,
      type: "multiple_choice",
      question: "¿Cómo se compara con otras laptops del mercado?",
      options: [
        "Muy superior",
        "Superior",
        "Similar",
        "Inferior",
        "Muy inferior",
      ],
    },
    {
      id: 42,
      productId: 2,
      stage: 4,
      questionNumber: 2,
      type: "star_rating",
      question: "¿Cómo evalúas la relación calidad-precio?",
    },
    {
      id: 43,
      productId: 2,
      stage: 4,
      questionNumber: 3,
      type: "free_text",
      question: "¿Qué ventajas tiene sobre la competencia?",
    },
    {
      id: 44,
      productId: 2,
      stage: 4,
      questionNumber: 4,
      type: "multiple_choice",
      question: "¿Vale la pena el precio premium?",
      options: [
        "Definitivamente sí",
        "Probablemente sí",
        "Tal vez",
        "Probablemente no",
        "Definitivamente no",
      ],
    },
    {
      id: 45,
      productId: 2,
      stage: 4,
      questionNumber: 5,
      type: "star_rating",
      question: "¿Cómo evalúas la innovación del producto?",
    },
    // Stage 5: Final Assessment
    {
      id: 46,
      productId: 2,
      stage: 5,
      questionNumber: 1,
      type: "multiple_choice",
      question: "¿Recomendarías el MacBook Air M2?",
      options: [
        "Definitivamente sí",
        "Probablemente sí",
        "Tal vez",
        "Probablemente no",
        "Definitivamente no",
      ],
    },
    {
      id: 47,
      productId: 2,
      stage: 5,
      questionNumber: 2,
      type: "star_rating",
      question: "¿Cómo evalúas la experiencia general?",
    },
    {
      id: 48,
      productId: 2,
      stage: 5,
      questionNumber: 3,
      type: "free_text",
      question: "¿Cuál es tu opinión final sobre el MacBook Air M2?",
    },
    {
      id: 49,
      productId: 2,
      stage: 5,
      questionNumber: 4,
      type: "multiple_choice",
      question: "¿Comprarías este producto?",
      options: [
        "Sí, inmediatamente",
        "Sí, pronto",
        "Tal vez en el futuro",
        "No",
      ],
    },
    {
      id: 50,
      productId: 2,
      stage: 5,
      questionNumber: 5,
      type: "star_rating",
      question: "¿Cómo evalúas la satisfacción general?",
    },
  ],
  // Add similar 5-stage structure for products 3-6
  3: generateProductQuestions(3, "Samsung Galaxy S24"),
  4: generateProductQuestions(4, "Dell XPS 13"),
  5: generateProductQuestions(5, "Sony WH-1000XM5"),
  6: generateProductQuestions(6, "Nintendo Switch OLED"),
};

// Helper function to generate questions for products 3-6
function generateProductQuestions(
  productId: number,
  _category: string
): AppQuestion[] {
  const questions: AppQuestion[] = [];
  let questionId = 50 + (productId - 3) * 25; // Start from ID 51 for product 3

  // Stage 1: Background & Experience
  for (let i = 1; i <= 5; i++) {
    questionId++;
    questions.push({
      id: questionId,
      productId,
      stage: 1,
      questionNumber: i,
      type:
        i === 1
          ? "multiple_choice"
          : i === 3
          ? "free_text"
          : i === 4
          ? "multiple_choice"
          : "star_rating",
      question: getStage1Question(i),
      options:
        i === 1
          ? ["Iniciante", "Intermedio", "Avanzado", "Experto"]
          : i === 4
          ? productId === 3
            ? ["Android", "iOS", "No tengo preferencia"]
            : productId === 4
            ? ["Windows", "macOS", "Linux", "No tengo preferencia"]
            : productId === 5
            ? [
                "Muy importante",
                "Importante",
                "Poco importante",
                "No importante",
              ]
            : ["Casual", "Intermedio", "Avanzado", "Experto"]
          : undefined,
    });
  }

  // Stage 2: Product Features
  for (let i = 1; i <= 5; i++) {
    questionId++;
    questions.push({
      id: questionId,
      productId,
      stage: 2,
      questionNumber: i,
      type:
        i === 1
          ? "multiple_choice"
          : i === 3
          ? "free_text"
          : i === 4
          ? "multiple_choice"
          : "star_rating",
      question: getStage2Question(i),
      options:
        i === 1
          ? getFeatureOptions(productId)
          : i === 4
          ? ["Sí, muy útil", "Tal vez", "No, no veo utilidad"]
          : undefined,
    });
  }

  // Stage 3: User Experience
  for (let i = 1; i <= 5; i++) {
    questionId++;
    questions.push({
      id: questionId,
      productId,
      stage: 3,
      questionNumber: i,
      type:
        i === 1
          ? "multiple_choice"
          : i === 3
          ? "free_text"
          : i === 4
          ? "multiple_choice"
          : "star_rating",
      question: getStage3Question(i),
      options:
        i === 1
          ? ["Muy fácil", "Fácil", "Neutral", "Difícil", "Muy difícil"]
          : i === 4
          ? ["Muy importante", "Importante", "Poco importante", "No importante"]
          : undefined,
    });
  }

  // Stage 4: Comparison & Value
  for (let i = 1; i <= 5; i++) {
    questionId++;
    questions.push({
      id: questionId,
      productId,
      stage: 4,
      questionNumber: i,
      type:
        i === 1
          ? "multiple_choice"
          : i === 3
          ? "free_text"
          : i === 4
          ? "multiple_choice"
          : "star_rating",
      question: getStage4Question(i),
      options:
        i === 1
          ? ["Muy superior", "Superior", "Similar", "Inferior", "Muy inferior"]
          : i === 4
          ? [
              "Definitivamente sí",
              "Probablemente sí",
              "Tal vez",
              "Probablemente no",
              "Definitivamente no",
            ]
          : undefined,
    });
  }

  // Stage 5: Final Assessment
  for (let i = 1; i <= 5; i++) {
    questionId++;
    questions.push({
      id: questionId,
      productId,
      stage: 5,
      questionNumber: i,
      type:
        i === 1
          ? "multiple_choice"
          : i === 3
          ? "free_text"
          : i === 4
          ? "multiple_choice"
          : "star_rating",
      question: getStage5Question(i),
      options:
        i === 1
          ? [
              "Definitivamente sí",
              "Probablemente sí",
              "Tal vez",
              "Probablemente no",
              "Definitivamente no",
            ]
          : i === 4
          ? ["Sí, inmediatamente", "Sí, pronto", "Tal vez en el futuro", "No"]
          : undefined,
    });
  }

  return questions;
}

// Helper functions for generating questions
function getStage1Question(num: number): string {
  const questions = {
    1: "¿Cuál es tu experiencia con este tipo de producto?",
    2: "¿Cómo evalúas la importancia de la calidad?",
    3: "Describe lo que más valoras en este tipo de producto.",
    4: "¿Qué características buscas en este tipo de producto?",
    5: "¿Cómo evalúas la importancia del precio?",
  };
  return questions[num as keyof typeof questions] || "";
}

function getStage2Question(num: number): string {
  const questions = {
    1: "¿Qué característica te interesa más?",
    2: "¿Cómo evalúas la importancia del rendimiento?",
    3: "¿Qué opinas del diseño?",
    4: "¿Te importa la funcionalidad?",
    5: "¿Cómo evalúas el precio?",
  };
  return questions[num as keyof typeof questions] || "";
}

function getStage3Question(num: number): string {
  const questions = {
    1: "¿Cómo evalúas la facilidad de uso?",
    2: "¿Cómo evalúas la velocidad?",
    3: "¿Qué te gustaría mejorar?",
    4: "¿Te importa el tamaño?",
    5: "¿Cómo evalúas la calidad de construcción?",
  };
  return questions[num as keyof typeof questions] || "";
}

function getStage4Question(num: number): string {
  const questions = {
    1: "¿Cómo se compara con otros productos del mercado?",
    2: "¿Cómo evalúas la relación calidad-precio?",
    3: "¿Qué ventajas tiene sobre la competencia?",
    4: "¿Vale la pena el precio?",
    5: "¿Cómo evalúas la innovación del producto?",
  };
  return questions[num as keyof typeof questions] || "";
}

function getStage5Question(num: number): string {
  const questions = {
    1: "¿Recomendarías este producto a un amigo?",
    2: "¿Cómo evalúas la experiencia general?",
    3: "¿Cuál es tu opinión final?",
    4: "¿Comprarías este producto?",
    5: "¿Cómo evalúas la satisfacción general?",
  };
  return questions[num as keyof typeof questions] || "";
}

function getFeatureOptions(productId: number): string[] {
  switch (productId) {
    case 3: // Samsung Galaxy S24
      return [
        "Cámara",
        "Rendimiento",
        "Diseño",
        "Batería",
        "Todas las opciones",
      ];
    case 4: // Dell XPS 13
      return [
        "Procesador",
        "Pantalla",
        "Portabilidad",
        "Batería",
        "Todas las opciones",
      ];
    case 5: // Sony WH-1000XM5
      return [
        "Calidad de sonido",
        "Cancelación de ruido",
        "Comodidad",
        "Batería",
        "Todas las opciones",
      ];
    case 6: // Nintendo Switch OLED
      return [
        "Rendimiento",
        "Pantalla",
        "Controles",
        "Portabilidad",
        "Todas las opciones",
      ];
    default:
      return [
        "Característica 1",
        "Característica 2",
        "Característica 3",
        "Todas las opciones",
      ];
  }
}

// Mock default user
export const mockDefaultUser: AppUser = {
  id: 1,
  name: "Usuario Demo",
  email: "demo@example.com",
  balance: "0.00",
  registrationDate: new Date().toISOString(),
  dailyEvaluationsUsed: 0,
  isDemo: true,
};
