import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ArrowLeft,
  Info,
  CreditCard,
  CheckCircle,
  Mail,
  Building,
} from "lucide-react";
import { useAppState } from "@/hooks/use-app-state";
import { useToast } from "@/hooks/use-toast";
import { AppTransaction, AppStats } from "@/types";
import { apiRequest } from "@/lib/queryClient";
import { getUserEvaluations } from "@/lib/local-storage";

export default function Wallet() {
  const [, setLocation] = useLocation();
  const { user } = useAppState();
  const { toast } = useToast();
  const [selectedPayoutMethod, setSelectedPayoutMethod] = useState<string>("");
  const [currentPayoutMethod, setCurrentPayoutMethod] = useState<string>("");
  const [payoutDetails, setPayoutDetails] = useState({
    email: "",
    accountName: "",
    bankName: "",
    accountNumber: "",
  });

  const { data: transactions = [] } = useQuery<AppTransaction[]>({
    queryKey: ["/api/transactions", user?.id],
    enabled: !!user?.id,
  });

  const { data: stats } = useQuery<AppStats>({
    queryKey: ["/api/users", user?.id, "stats"],
    enabled: !!user?.id,
  });

  // Load payout method from localStorage on component mount
  useEffect(() => {
    const savedPayoutMethod = localStorage.getItem("payoutMethod");
    const savedPayoutDetails = localStorage.getItem("payoutDetails");
    if (savedPayoutMethod) {
      setCurrentPayoutMethod(savedPayoutMethod);
    }
    if (savedPayoutDetails) {
      setPayoutDetails(JSON.parse(savedPayoutDetails));
    }
  }, []);

  // Mutation for registering payout method
  const payoutMethodMutation = useMutation({
    mutationFn: async (method: string) => {
      console.log(
        "Registering payout method:",
        method,
        "for user:",
        user?.id || 1
      );
      try {
        const response = await apiRequest("POST", "/api/payout-method", {
          userId: user?.id || 1,
          method,
          details:
            method === "PayPal"
              ? {
                  email: payoutDetails.email,
                }
              : {
                  accountName: payoutDetails.accountName,
                  bankName: payoutDetails.bankName,
                  accountNumber: payoutDetails.accountNumber,
                },
        });
        console.log("Payout method registration response:", response);
        return await response.json();
      } catch (error) {
        console.error("Error registering payout method:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log("Payout method registration successful:", data);
      // Store in localStorage
      localStorage.setItem("payoutMethod", selectedPayoutMethod);
      localStorage.setItem("payoutDetails", JSON.stringify(payoutDetails));
      setCurrentPayoutMethod(selectedPayoutMethod);

      // Show success toast
      toast({
        title: "¡Método registrado!",
        description: `Tu método de cobro (${selectedPayoutMethod}) se ha registrado con éxito.`,
        duration: 3000,
      });

      // Reset selection
      setSelectedPayoutMethod("");
      setPayoutDetails({
        email: "",
        accountName: "",
        bankName: "",
        accountNumber: "",
      });
    },
    onError: (error) => {
      console.error("Payout method registration error:", error);
      toast({
        title: "Error",
        description: `No se pudo registrar el método de cobro: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const handleRegisterPayoutMethod = () => {
    if (selectedPayoutMethod && isFormValid()) {
      payoutMethodMutation.mutate(selectedPayoutMethod);
    }
  };

  const handleChangePayoutMethod = () => {
    setCurrentPayoutMethod("");
    setSelectedPayoutMethod("");
    setPayoutDetails({
      email: "",
      accountName: "",
      bankName: "",
      accountNumber: "",
    });
    localStorage.removeItem("payoutMethod");
    localStorage.removeItem("payoutDetails");
  };

  const isFormValid = () => {
    if (selectedPayoutMethod === "PayPal") {
      return (
        payoutDetails.email.trim() !== "" && payoutDetails.email.includes("@")
      );
    } else if (selectedPayoutMethod === "Depósito bancario") {
      return (
        payoutDetails.accountName.trim() !== "" &&
        payoutDetails.bankName.trim() !== "" &&
        payoutDetails.accountNumber.trim() !== ""
      );
    }
    return false;
  };

  const getCurrentPayoutInfo = () => {
    const savedDetails = localStorage.getItem("payoutDetails");
    if (savedDetails && currentPayoutMethod) {
      const details = JSON.parse(savedDetails);
      if (currentPayoutMethod === "PayPal") {
        return details.email;
      } else {
        return `${details.bankName} - ${details.accountName}`;
      }
    }
    return currentPayoutMethod;
  };

  const handleBack = () => {
    setLocation("/main");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Ayer";
    if (diffDays < 1) return "Hace unas horas";
    if (diffDays < 7) return `Hace ${diffDays} días`;
    return date.toLocaleDateString();
  };

  // Calculate dynamic balance
  let dynamicBalance = 0;
  if (user) {
    // Welcome bonus (if any)
    dynamicBalance += parseFloat(user.balance) || 0;
    // Add all completed evaluation earnings
    const evaluations = getUserEvaluations(user.id).filter((e) => e.completed);
    const earned = evaluations.reduce(
      (sum, e) => sum + parseFloat(e.totalEarned),
      0
    );
    dynamicBalance = earned + (parseFloat(user.balance) || 0);
  }

  return (
    <div className="min-h-screen bg-neutral-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            className="text-neutral-600 hover:text-neutral-800"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h2 className="text-xl font-semibold text-neutral-800">
            Mi Billetera
          </h2>
          <div className="w-6"></div>
        </div>
      </div>

      {/* Balance Card */}
      <Card className="bg-gradient-to-r from-primary to-secondary mx-4 mt-4 text-white">
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-white/80 text-sm mb-2">Saldo disponible</p>
            <p className="text-4xl font-bold mb-4">
              ${dynamicBalance.toFixed(2)}
            </p>
            <div className="bg-white/20 rounded-lg p-3 text-sm flex items-center justify-center">
              <Info className="h-4 w-4 mr-2" />
              Saque disponible después de 7 días
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payout Method Card */}
      <Card className="mx-4 mt-4 border border-neutral-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-neutral-800">
              Método de Cobro
            </h3>
          </div>

          {currentPayoutMethod ? (
            // Show active payout method
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <div>
                  <p className="font-medium">
                    Método de cobro activo: {currentPayoutMethod}
                  </p>
                  <p className="text-sm text-neutral-600">
                    {getCurrentPayoutInfo()}
                  </p>
                </div>
              </div>
              <Button
                onClick={handleChangePayoutMethod}
                variant="outline"
                className="w-full"
              >
                Cambiar método
              </Button>
            </div>
          ) : (
            // Show payout method selection
            <div className="space-y-4">
              <RadioGroup
                value={selectedPayoutMethod}
                onValueChange={setSelectedPayoutMethod}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="PayPal" id="paypal" />
                  <Label
                    htmlFor="paypal"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    PayPal
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Depósito bancario" id="bank" />
                  <Label
                    htmlFor="bank"
                    className="text-sm font-medium flex items-center gap-2"
                  >
                    <Building className="h-4 w-4" />
                    Depósito bancario
                  </Label>
                </div>
              </RadioGroup>

              {/* PayPal Details */}
              {selectedPayoutMethod === "PayPal" && (
                <div className="space-y-3 p-3 bg-blue-50 rounded-lg border">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-blue-800"
                  >
                    Email de PayPal
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu-email@ejemplo.com"
                    value={payoutDetails.email}
                    onChange={(e) =>
                      setPayoutDetails({
                        ...payoutDetails,
                        email: e.target.value,
                      })
                    }
                    className="border-blue-200 focus:border-blue-400"
                  />
                  <p className="text-xs text-blue-600">
                    Ingresa el email asociado a tu cuenta de PayPal
                  </p>
                </div>
              )}

              {/* Bank Details */}
              {selectedPayoutMethod === "Depósito bancario" && (
                <div className="space-y-3 p-3 bg-green-50 rounded-lg border">
                  <Label className="text-sm font-medium text-green-800">
                    Datos bancarios básicos
                  </Label>
                  <div className="space-y-2">
                    <Input
                      placeholder="Nombre del titular"
                      value={payoutDetails.accountName}
                      onChange={(e) =>
                        setPayoutDetails({
                          ...payoutDetails,
                          accountName: e.target.value,
                        })
                      }
                      className="border-green-200 focus:border-green-400"
                    />
                    <Input
                      placeholder="Nombre del banco"
                      value={payoutDetails.bankName}
                      onChange={(e) =>
                        setPayoutDetails({
                          ...payoutDetails,
                          bankName: e.target.value,
                        })
                      }
                      className="border-green-200 focus:border-green-400"
                    />
                    <Input
                      placeholder="Número de cuenta"
                      value={payoutDetails.accountNumber}
                      onChange={(e) =>
                        setPayoutDetails({
                          ...payoutDetails,
                          accountNumber: e.target.value,
                        })
                      }
                      className="border-green-200 focus:border-green-400"
                    />
                  </div>
                  <p className="text-xs text-green-600">
                    Información básica para procesamiento de pagos
                  </p>
                </div>
              )}

              <Button
                onClick={handleRegisterPayoutMethod}
                disabled={
                  !selectedPayoutMethod ||
                  !isFormValid() ||
                  payoutMethodMutation.isPending
                }
                className="w-full"
              >
                {payoutMethodMutation.isPending
                  ? "Registrando..."
                  : "Registrar método"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="mx-4 mt-4 grid grid-cols-2 gap-4">
        <Card className="border border-neutral-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">
                {Number(stats?.totalEvaluations) || 0}
              </p>
              <p className="text-sm text-neutral-600">Evaluaciones</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border border-neutral-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-accent">
                {Number(stats?.todayEvaluations) || 0}
              </p>
              <p className="text-sm text-neutral-600">Hoy</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-neutral-800 mb-4">
          Historial de transacciones
        </h3>

        <div className="space-y-3">
          {transactions.map((transaction) => (
            <Card key={transaction.id} className="border border-neutral-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-neutral-800">
                      {transaction.description}
                    </p>
                    <p className="text-sm text-neutral-600">
                      {transaction.type === "welcome_bonus"
                        ? "Registro completado"
                        : "Evaluación completada"}
                    </p>
                    <p className="text-xs text-neutral-400">
                      {formatDate(transaction.createdAt)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">
                      +${transaction.amount}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
