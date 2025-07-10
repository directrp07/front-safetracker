import { useLocation } from "wouter";
import {
  TrendingUp,
  Star,
  Clock,
  DollarSign,
  ArrowRight,
  User,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAppState } from "@/hooks/use-app-state";
import { getProducts, getUserEvaluations } from "@/lib/local-storage";
import ProductCard from "@/components/product-card";
import BottomNavigation from "@/components/bottom-navigation";

function getTodayString() {
  return new Date().toISOString().split("T")[0];
}

export default function Main() {
  const [, setLocation] = useLocation();
  const { user, logout } = useAppState();
  const products = getProducts();

  // Calculate dynamic stats
  let totalEarned = 0;
  let todayEarned = 0;
  let completedCount = 0;
  if (user) {
    const evaluations = getUserEvaluations(user.id).filter((e) => e.completed);
    completedCount = evaluations.length;
    totalEarned = evaluations.reduce(
      (sum, e) => sum + parseFloat(e.totalEarned),
      0
    );
    todayEarned = evaluations
      .filter(
        (e) => e.completedAt && e.completedAt.startsWith(getTodayString())
      )
      .reduce((sum, e) => sum + parseFloat(e.totalEarned), 0);
  }

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  const handleProfile = () => {
    setLocation("/profile");
  };

  const handleWallet = () => {
    setLocation("/wallet");
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-neutral-800">
              ¡Hola, {user?.email?.split("@")[0] || "Usuario"}!
            </h1>
            <p className="text-sm text-neutral-600">Bienvenido a SafeMoney</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleProfile}
              className="p-2"
            >
              <User className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="p-2"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Card className="border border-neutral-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-neutral-600">Ganado hoy</p>
                  <p className="text-lg font-bold text-neutral-800">
                    R$ {todayEarned.toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-neutral-200">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="bg-green-100 p-2 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-neutral-600">Total ganado</p>
                  <p className="text-lg font-bold text-neutral-800">
                    R$ {totalEarned.toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border border-neutral-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-neutral-600">
                    Evaluaciones completadas
                  </p>
                  <p className="text-lg font-bold text-neutral-800">
                    {completedCount}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleWallet}
                className="text-primary"
              >
                Ver detalles
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Products Section */}
      <div className="px-4 pb-24">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-neutral-800">
            Productos para evaluar
          </h2>
          <div className="flex items-center space-x-1 text-sm text-neutral-600">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>Gana dinero evaluando</span>
          </div>
        </div>

        <div className="space-y-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={() => {
                // Handle product selection
                setLocation("/evaluation");
              }}
            />
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-8">
            <p className="text-neutral-600">No hay productos disponibles</p>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}
