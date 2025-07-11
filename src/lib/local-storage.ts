import {
  AppUser,
  AppProduct,
  AppEvaluation,
  AppTransaction,
  AppQuestion,
} from "@/types";
import { mockQuestions } from "./mock-data";

// Storage keys
const STORAGE_KEYS = {
  USER: "safetracker_user",
  PRODUCTS: "safetracker_products",
  EVALUATIONS: "safetracker_evaluations",
  TRANSACTIONS: "safetracker_transactions",
  QUESTIONS: "safetracker_questions",
  DAILY_EVALUATIONS: "safetracker_daily_evaluations",
  LOGIN_DATE: "safetracker_login_date",
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
    console.error(`Error saving to localStorage: ${error}`);
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
  const demoUser: AppUser = {
    id: Date.now(),
    name: "Usuario Demo",
    email: "demo@safetracker.com",
    balance: "50.00",
    registrationDate: new Date().toISOString(),
    dailyEvaluationsUsed: 0,
    isDemo: true,
  };
  setUser(demoUser);
  return demoUser;
};

// Login date management
export const setLoginDate = (): void => {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format
  setToStorage(STORAGE_KEYS.LOGIN_DATE, today);
};

export const getLoginDate = (): string | null => {
  return getFromStorage(STORAGE_KEYS.LOGIN_DATE, null);
};

// Daily image rotation logic
export const getDailyImageRange = (): { start: number; end: number } => {
  const loginDate = getLoginDate();
  if (!loginDate) {
    // If no login date, use today as first day
    setLoginDate();
    return { start: 1, end: 25 };
  }

  const today = new Date().toISOString().split("T")[0];
  const loginDateTime = new Date(loginDate);
  const todayDateTime = new Date(today);

  // Calculate days since login
  const timeDiff = todayDateTime.getTime() - loginDateTime.getTime();
  const daysSinceLogin = Math.floor(timeDiff / (1000 * 3600 * 24));

  // Each day shows 25 images (PT1-PT25, PT26-PT50, etc.)
  const dayIndex = daysSinceLogin;
  const start = dayIndex * 25 + 1;
  const end = start + 24; // 25 images per day (1-25, 26-50, etc.)

  return { start, end };
};

// Check if products need to be refreshed for a new day
export const shouldRefreshProducts = (): boolean => {
  const loginDate = getLoginDate();
  if (!loginDate) return true;

  const today = new Date().toISOString().split("T")[0];
  const loginDateTime = new Date(loginDate);
  const todayDateTime = new Date(today);

  // Calculate days since login
  const timeDiff = todayDateTime.getTime() - loginDateTime.getTime();
  const daysSinceLogin = Math.floor(timeDiff / (1000 * 3600 * 24));

  // Get current stored products to check their image range
  const storedProducts = getFromStorage<AppProduct[]>(
    STORAGE_KEYS.PRODUCTS,
    []
  );
  if (!storedProducts || storedProducts.length === 0) return true;

  // Check if the first product's image number matches the expected range for today
  const firstProductImage = storedProducts[0]?.imageUrl;
  if (!firstProductImage) return true;

  // Extract image number from URL (e.g., "/images/PT1.png" -> 1)
  const match = firstProductImage.match(/PT(\d+)\.png$/);
  if (!match) return true;

  const currentImageNumber = parseInt(match[1]);
  const expectedStart = daysSinceLogin * 25 + 1;

  return currentImageNumber !== expectedStart;
};

// Generate product images based on daily rotation
export const generateDailyProducts = (): AppProduct[] => {
  const { start } = getDailyImageRange();
  const baseProducts = [
    {
      id: 1,
      name: "iPhone 15 Pro",
      category: "Smartphones",
      minEarning: "2.50",
      maxEarning: "5.00",
      active: true,
    },
    {
      id: 2,
      name: "MacBook Air M2",
      category: "Laptops",
      minEarning: "3.00",
      maxEarning: "6.00",
      active: true,
    },
    {
      id: 3,
      name: "Samsung Galaxy S24",
      category: "Smartphones",
      minEarning: "2.00",
      maxEarning: "4.50",
      active: true,
    },
    {
      id: 4,
      name: "Dell XPS 13",
      category: "Laptops",
      minEarning: "2.75",
      maxEarning: "5.50",
      active: true,
    },
    {
      id: 5,
      name: "Sony WH-1000XM5",
      category: "Audio",
      minEarning: "1.50",
      maxEarning: "3.00",
      active: true,
    },
    {
      id: 6,
      name: "Nintendo Switch OLED",
      category: "Gaming",
      minEarning: "1.75",
      maxEarning: "3.50",
      active: true,
    },
  ];

  return baseProducts.map((product, index) => {
    const imageNumber = start + index;
    return {
      ...product,
      imageUrl: `/images/PT${imageNumber}.png`,
    };
  });
};

// Products management
export const getProducts = (): AppProduct[] => {
  // Check if products need to be refreshed for a new day
  if (shouldRefreshProducts()) {
    const dailyProducts = generateDailyProducts();
    setProducts(dailyProducts);
    return dailyProducts;
  }

  // Return stored products if they're still current
  const storedProducts = getFromStorage<AppProduct[]>(
    STORAGE_KEYS.PRODUCTS,
    []
  );
  if (storedProducts && storedProducts.length > 0) {
    return storedProducts;
  }

  // Fallback to generating new products
  const dailyProducts = generateDailyProducts();
  setProducts(dailyProducts);
  return dailyProducts;
};

export const setProducts = (products: AppProduct[]): void => {
  setToStorage(STORAGE_KEYS.PRODUCTS, products);
};

// Force refresh products (useful for testing)
export const refreshProducts = (): AppProduct[] => {
  const dailyProducts = generateDailyProducts();
  setProducts(dailyProducts);
  return dailyProducts;
};

// Clear stored products (useful for testing)
export const clearStoredProducts = (): void => {
  localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
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
