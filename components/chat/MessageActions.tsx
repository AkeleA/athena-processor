import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MessageActionsProps {
  onSummarize: () => void;
  onTranslate: (language: string) => void;
  showSummarize: boolean;
  detectedLanguage: string;
}

export const MessageActions: React.FC<MessageActionsProps> = ({
  onSummarize,
  onTranslate,
  showSummarize,
  detectedLanguage,
}) => {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      <span className="text-sm text-white/70">
        Detected: {detectedLanguage}
      </span>
      <div className="flex gap-2 mt-1">
        {showSummarize && (
          <Button
            variant="outline"
            size="sm"
            className="text-white border-white/20 hover:bg-white/10"
            onClick={onSummarize}
          >
            Summarize
          </Button>
        )}
        <Select onValueChange={onTranslate}>
          <SelectTrigger className="w-[140px] text-white border-white/20 bg-transparent">
            <SelectValue placeholder="Translate to..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="pt">Portuguese</SelectItem>
            <SelectItem value="es">Spanish</SelectItem>
            <SelectItem value="ru">Russian</SelectItem>
            <SelectItem value="tr">Turkish</SelectItem>
            <SelectItem value="fr">French</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
