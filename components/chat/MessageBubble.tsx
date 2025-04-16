import { Card } from "@/components/ui/card";

interface MessageBubbleProps {
  content: string;
  isUser: boolean;
  timestamp?: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  content,
  isUser,
  timestamp,
}) => {
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <Card
        className={`max-w-[80%] p-4 ${
          isUser
            ? "bg-white text-blue-900"
            : "bg-blue-900/10 text-white border-white/20"
        }`}
      >
        <p className="break-words">{content}</p>
        {timestamp && (
          <span className="text-xs opacity-70 mt-2 block">{timestamp}</span>
        )}
      </Card>
    </div>
  );
};
