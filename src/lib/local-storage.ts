import {
  AppUser,
  AppProduct,
  AppEvaluation,
  AppTransaction,
  AppQuestion,
} from "@/types";
import { mockProducts, mockQuestions, mockDefaultUser } from "./mock-data";

// Storage keys
const STORAGE_KEYS = {
  USER: "safetracker_user",
  PRODUCTS: "safetracker_products",
  EVALUATIONS: "safetracker_evaluations",
  TRANSACTIONS: "safetracker_transactions",
  QUESTIONS: "safetracker_questions",
  DAILY_EVALUATIONS: "safetracker_daily_evaluations",
} as const;

// Helper functions
const getFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const setToStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

// User management
export const getUser = (): AppUser | null => {
  return getFromStorage(STORAGE_KEYS.USER, null);
};

export const setUser = (user: AppUser | null): void => {
  setToStorage(STORAGE_KEYS.USER, user);
};

export const createDemoUser = (): AppUser => {
  const demoUser = {
    ...mockDefaultUser,
    id: Date.now(),
    name: `Usuário ${Math.floor(Math.random() * 1000)}`,
    email: `user${Math.floor(Math.random() * 1000)}@demo.com`,
  };
  setUser(demoUser);
  return demoUser;
};

// Products management
export const getProducts = (): AppProduct[] => {
  return getFromStorage(STORAGE_KEYS.PRODUCTS, mockProducts);
};

export const setProducts = (products: AppProduct[]): void => {
  setToStorage(STORAGE_KEYS.PRODUCTS, products);
};

// Questions management
export const getQuestions = (): Record<number, AppQuestion[]> => {
  return getFromStorage(STORAGE_KEYS.QUESTIONS, mockQuestions);
};

export const setQuestions = (
  questions: Record<number, AppQuestion[]>
): void => {
  setToStorage(STORAGE_KEYS.QUESTIONS, questions);
};

export const getQuestionsForProduct = (productId: number): AppQuestion[] => {
  const allQuestions = getQuestions();
  return allQuestions[productId] || [];
};

// Evaluations management
export const getEvaluations = (): AppEvaluation[] => {
  return getFromStorage(STORAGE_KEYS.EVALUATIONS, []);
};

export const setEvaluations = (evaluations: AppEvaluation[]): void => {
  setToStorage(STORAGE_KEYS.EVALUATIONS, evaluations);
};

export const createEvaluation = (
  userId: number,
  productId: number
): AppEvaluation => {
  const evaluations = getEvaluations();
  const newEvaluation: AppEvaluation = {
    id: Date.now(),
    userId,
    productId,
    currentStage: 1,
    completed: false,
    totalEarned: "0.00",
    startedAt: new Date().toISOString(),
    answers: {},
  };

  evaluations.push(newEvaluation);
  setEvaluations(evaluations);
  return newEvaluation;
};

export const updateEvaluation = (
  evaluationId: number,
  updates: Partial<AppEvaluation>
): AppEvaluation | null => {
  const evaluations = getEvaluations();
  const index = evaluations.findIndex((e) => e.id === evaluationId);

  if (index === -1) return null;

  evaluations[index] = { ...evaluations[index], ...updates };
  setEvaluations(evaluations);
  return evaluations[index];
};

export const getEvaluationById = (
  evaluationId: number
): AppEvaluation | null => {
  const evaluations = getEvaluations();
  return evaluations.find((e) => e.id === evaluationId) || null;
};

export const getUserEvaluations = (userId: number): AppEvaluation[] => {
  const evaluations = getEvaluations();
  return evaluations.filter((e) => e.userId === userId);
};

// Transactions management
export const getTransactions = (): AppTransaction[] => {
  return getFromStorage(STORAGE_KEYS.TRANSACTIONS, []);
};

export const setTransactions = (transactions: AppTransaction[]): void => {
  setToStorage(STORAGE_KEYS.TRANSACTIONS, transactions);
};

export const createTransaction = (
  userId: number,
  type: string,
  amount: string,
  description: string,
  evaluationId?: number
): AppTransaction => {
  const transactions = getTransactions();
  const newTransaction: AppTransaction = {
    id: Date.now(),
    userId,
    evaluationId,
    type,
    amount,
    description,
    createdAt: new Date().toISOString(),
  };

  transactions.push(newTransaction);
  setTransactions(transactions);
  return newTransaction;
};

export const getUserTransactions = (userId: number): AppTransaction[] => {
  const transactions = getTransactions();
  return transactions.filter((t) => t.userId === userId);
};

// Daily evaluations tracking
export const getDailyEvaluations = (): Record<string, number> => {
  return getFromStorage(STORAGE_KEYS.DAILY_EVALUATIONS, {});
};

export const setDailyEvaluations = (
  dailyEvaluations: Record<string, number>
): void => {
  setToStorage(STORAGE_KEYS.DAILY_EVALUATIONS, dailyEvaluations);
};

export const incrementDailyEvaluations = (userId: number): number => {
  const today = new Date().toISOString().split("T")[0];
  const dailyEvaluations = getDailyEvaluations();
  const key = `${userId}_${today}`;

  dailyEvaluations[key] = (dailyEvaluations[key] || 0) + 1;
  setDailyEvaluations(dailyEvaluations);

  return dailyEvaluations[key];
};

export const getDailyEvaluationsForUser = (userId: number): number => {
  const today = new Date().toISOString().split("T")[0];
  const dailyEvaluations = getDailyEvaluations();
  const key = `${userId}_${today}`;

  return dailyEvaluations[key] || 0;
};

// Balance management
export const updateUserBalance = (userId: number, amount: string): void => {
  const user = getUser();
  if (user && user.id === userId) {
    const currentBalance = parseFloat(user.balance);
    const newBalance = currentBalance + parseFloat(amount);
    setUser({
      ...user,
      balance: newBalance.toFixed(2),
    });
  }
};

// Complete evaluation and award money
export const completeEvaluation = (
  evaluationId: number
): AppEvaluation | null => {
  const evaluation = getEvaluationById(evaluationId);
  if (!evaluation) return null;

  // Calculate earnings based on product
  const product = getProducts().find((p) => p.id === evaluation.productId);
  if (!product) return null;

  const minEarning = parseFloat(product.minEarning);
  const maxEarning = parseFloat(product.maxEarning);
  const earned = (
    Math.random() * (maxEarning - minEarning) +
    minEarning
  ).toFixed(2);

  // Update evaluation
  const updatedEvaluation = updateEvaluation(evaluationId, {
    completed: true,
    completedAt: new Date().toISOString(),
    totalEarned: earned,
  });

  if (updatedEvaluation) {
    // Create transaction
    createTransaction(
      evaluation.userId,
      "evaluation_completed",
      earned,
      `Avaliação completada: ${product.name}`,
      evaluationId
    );

    // Update user balance
    updateUserBalance(evaluation.userId, earned);

    // Update daily evaluations count
    incrementDailyEvaluations(evaluation.userId);
  }

  return updatedEvaluation;
};

// Reset all data (for testing)
export const resetAllData = (): void => {
  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });
};
