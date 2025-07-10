import { Textarea } from "@/components/ui/textarea";

interface QuestionFreeTextProps {
  value: string;
  onChange: (value: string) => void;
}

export default function QuestionFreeText({
  value,
  onChange,
}: QuestionFreeTextProps) {
  return (
    <Textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Escribe tu respuesta aquí..."
      className="min-h-[100px] resize-none"
    />
  );
}
