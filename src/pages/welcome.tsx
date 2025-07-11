import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAppState } from "@/hooks/use-app-state";
import { createTransaction, setLoginDate } from "@/lib/local-storage";
import { Shield } from "lucide-react";

export default function Welcome() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { setUser } = useAppState();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Create user locally
      const newUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        balance: "289.00",
        registrationDate: new Date().toISOString(),
        dailyEvaluationsUsed: 0,
        isDemo: false,
      };

      setUser(newUser);

      // Set login date for daily image rotation
      setLoginDate();

      // Create welcome bonus transaction
      createTransaction(
        newUser.id,
        "welcome_bonus",
        "289.00",
        "Bono de bienvenida"
      );

      toast({
        title: "¡Bienvenido!",
        description: "Has iniciado sesión correctamente",
      });
      setLocation("/main");
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema con tu solicitud",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary p-6 flex flex-col justify-center">
      <div className="max-w-md mx-auto w-full">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="bg-white rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
            <Shield className="text-primary text-3xl" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Bienvenido a SafeMoney
          </h1>
          <p className="text-white/90 text-lg">Inicia sesión en tu cuenta</p>
        </div>

        {/* Form */}
        <Card className="bg-white rounded-2xl shadow-xl">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label
                  htmlFor="name"
                  className="block text-sm font-medium text-neutral-700 mb-2"
                >
                  Nombre
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Tu nombre completo"
                  className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>

              <div>
                <Label
                  htmlFor="email"
                  className="block text-sm font-medium text-neutral-700 mb-2"
                >
                  Correo electrónico
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="tu@email.com"
                  className="w-full px-4 py-3 border border-neutral-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
                <p className="text-xs text-neutral-500 mt-1 italic">
                  Coloca el e-mail de la compra
                </p>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-primary/90 shadow-lg"
              >
                {isLoading ? "Cargando..." : "Iniciar sesión"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
