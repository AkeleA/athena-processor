"use client";

import { useState } from "react";
import { MessageBubble } from "@/components/chat/MessageBubble";
import { MessageActions } from "@/components/chat/MessageActions";
import { ChatInput } from "@/components/chat/ChatInput";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
  detectedLanguage?: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    // Here we'll later add the AI processing logic
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-900 to-purple-900">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div key={message.id}>
            <MessageBubble
              content={message.content}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
            {!message.isUser && message.detectedLanguage && (
              <MessageActions
                onSummarize={() => {}}
                onTranslate={() => {}}
                showSummarize={message.content.length > 150}
                detectedLanguage={message.detectedLanguage}
              />
            )}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <ChatInput onSend={handleSendMessage} />
    </div>
  );
}
