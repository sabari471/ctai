import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your procurement assistant. I can help you with vendor information, material costs, delivery timelines, and more. How can I assist you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputValue),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const generateBotResponse = (input: string) => {
    const lowercaseInput = input.toLowerCase();
    
    if (lowercaseInput.includes("vendor") || lowercaseInput.includes("supplier")) {
      return "I can help you find vendors! Currently, we have 45+ verified suppliers including TechCorp Industries for transformers, BuildMax Co. for construction materials, and ElectroPro for electrical components. Would you like specific vendor details?";
    }
    
    if (lowercaseInput.includes("cost") || lowercaseInput.includes("price")) {
      return "For cost analysis, our latest forecast shows: Cement ~₹450/bag, Steel ~₹65/kg, Cables ~₹180/m. Total project estimate is ₹2.8M. Need detailed cost breakdown for specific materials?";
    }
    
    if (lowercaseInput.includes("delivery") || lowercaseInput.includes("timeline")) {
      return "Current delivery timelines: Transformers (14-21 days), Cement (3-5 days), Steel (7-10 days). Critical path analysis shows project completion by Q2 2024. Need specific item delivery dates?";
    }
    
    if (lowercaseInput.includes("status") || lowercaseInput.includes("progress")) {
      return "Project Status: 68% materials ordered, 45% delivered, 23% installed. Next milestone: Transformer installation (Jan 15). 3 pending approvals need attention. Want detailed progress report?";
    }
    
    return "I understand you're asking about procurement. I can help with vendor selection, cost analysis, delivery tracking, or project schedules. Could you be more specific about what you'd like to know?";
  };

  return (
    <>
      {/* Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 300 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-gradient-primary shadow-floating hover-lift neon-glow"
          size="sm"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-50 w-96 h-[500px] glass rounded-xl border shadow-floating"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-primary rounded-lg">
                  <Bot className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">Procurement Assistant</h3>
                  <p className="text-xs text-muted-foreground">Always ready to help</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4 h-[340px]">
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.isBot
                          ? "bg-muted text-muted-foreground"
                          : "bg-gradient-primary text-primary-foreground"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-60 mt-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <Input
                  placeholder="Ask about vendors, costs, timelines..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1 glass border-0"
                />
                <Button
                  onClick={handleSend}
                  size="sm"
                  className="bg-gradient-primary hover-lift"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;