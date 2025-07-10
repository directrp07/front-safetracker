import { ArrowLeft, HelpCircle } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import BottomNavigation from "@/components/bottom-navigation";

export default function Support() {
  const [, setLocation] = useLocation();

  const handleBack = () => {
    setLocation("/main");
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 px-4 py-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={handleBack}
            className="text-neutral-600 hover:text-neutral-800"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-neutral-800">Soporte</h1>
            <p className="text-sm text-neutral-600">¿Necesitas ayuda?</p>
          </div>
        </div>
      </div>

      {/* Support Content */}
      <div className="p-4 space-y-4">
        {/* FAQ Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-neutral-800">
            Preguntas Frecuentes
          </h2>

          <div className="space-y-3">
            <div className="bg-white border border-neutral-200 rounded-lg p-4">
              <h3 className="font-semibold text-neutral-800 mb-2">
                ¿Cómo funciona SafeMoney?
              </h3>
              <p className="text-sm text-neutral-600">
                SafeMoney te permite ganar dinero evaluando productos.
                Simplemente selecciona un producto, responde las preguntas de
                evaluación y gana dinero por cada evaluación completada.
              </p>
            </div>

            <div className="bg-white border border-neutral-200 rounded-lg p-4">
              <h3 className="font-semibold text-neutral-800 mb-2">
                ¿Cuánto puedo ganar por evaluación?
              </h3>
              <p className="text-sm text-neutral-600">
                Los ganancias varían entre R$ 1,00 y R$ 5,00 por evaluación,
                dependiendo del producto y la calidad de tus respuestas.
              </p>
            </div>

            <div className="bg-white border border-neutral-200 rounded-lg p-4">
              <h3 className="font-semibold text-neutral-800 mb-2">
                ¿Cuándo recibo mi pago?
              </h3>
              <p className="text-sm text-neutral-600">
                Los pagos se procesan automáticamente al completar cada
                evaluación. Puedes verificar tu saldo en la sección "Mi
                Billetera".
              </p>
            </div>

            <div className="bg-white border border-neutral-200 rounded-lg p-4">
              <h3 className="font-semibold text-neutral-800 mb-2">
                ¿Hay un límite de evaluaciones por día?
              </h3>
              <p className="text-sm text-neutral-600">
                Sí, puedes completar hasta 25 evaluaciones por día. El límite se
                restablece a las 00:00 horas.
              </p>
            </div>

            <div className="bg-white border border-neutral-200 rounded-lg p-4">
              <h3 className="font-semibold text-neutral-800 mb-2">
                ¿Qué pasa si no puedo completar una evaluación?
              </h3>
              <p className="text-sm text-neutral-600">
                Puedes pausar y reanudar las evaluaciones en cualquier momento.
                Tu progreso se guarda automáticamente.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white border border-neutral-200 rounded-lg p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <HelpCircle className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold text-neutral-800">
              ¿Necesitas más ayuda?
            </h3>
          </div>
          <p className="text-sm text-neutral-600 mb-4">
            Si no encuentras la respuesta que buscas, contáctanos directamente.
          </p>
          <div className="space-y-2">
            <Button className="w-full bg-primary text-white">
              Enviar mensaje
            </Button>
            <Button variant="outline" className="w-full border-neutral-300">
              Llamar al soporte
            </Button>
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">
            💡 Consejos para ganar más
          </h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Responde todas las preguntas con honestidad</li>
            <li>• Completa las evaluaciones con atención</li>
            <li>• Evalúa productos regularmente</li>
            <li>• Mantén tu perfil actualizado</li>
          </ul>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
