"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your Legal AI Assistant. How can I help you with your legal questions today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response (replace with actual AI integration)
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `I understand you're asking about "${userMessage.content}". This appears to be a legal matter that may involve contract law, employment rights, or regulatory compliance. Let me provide you with some preliminary guidance:\n\n• First, consider the jurisdiction and applicable laws\n• Review any relevant documentation or contracts\n• Consider consulting with a qualified attorney for complex matters\n\nWould you like me to elaborate on any specific aspect of this legal question?`,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      <SignedIn>
        <div className="flex h-screen bg-gray-50">
          {/* Sidebar */}
          <div className="w-64 bg-gray-900 text-white flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold">Legal AI Chat</h1>
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8",
                    },
                  }}
                />
              </div>
            </div>

            {/* New Chat Button */}
            <div className="p-4">
              <Button
                className="w-full bg-transparent border border-gray-600 hover:bg-gray-800 text-white"
                onClick={() => {
                  setMessages([
                    {
                      id: "1",
                      content:
                        "Hello! I'm your Legal AI Assistant. How can I help you with your legal questions today?",
                      sender: "ai",
                      timestamp: new Date(),
                    },
                  ]);
                }}
              >
                + New Chat
              </Button>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-4">
              <h3 className="text-sm font-medium text-gray-400 mb-3">
                Recent Chats
              </h3>
              <div className="space-y-2">
                <div className="p-3 rounded-lg bg-gray-800 cursor-pointer hover:bg-gray-700 transition-colors">
                  <p className="text-sm truncate">Contract Review Discussion</p>
                  <p className="text-xs text-gray-400">2 hours ago</p>
                </div>
                <div className="p-3 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors">
                  <p className="text-sm truncate">Employment Law Questions</p>
                  <p className="text-xs text-gray-400">Yesterday</p>
                </div>
                <div className="p-3 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors">
                  <p className="text-sm truncate">IP Rights Consultation</p>
                  <p className="text-xs text-gray-400">3 days ago</p>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="p-4 border-t border-gray-700">
              <div className="space-y-2">
                <a
                  href="/dashboard"
                  className="flex items-center text-sm hover:text-blue-300 transition-colors"
                >
                  <span className="mr-2">📊</span>
                  Dashboard
                </a>
                <a
                  href="/"
                  className="flex items-center text-sm hover:text-blue-300 transition-colors"
                >
                  <span className="mr-2">🏠</span>
                  Home
                </a>
              </div>
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Legal AI Assistant
                  </h2>
                  <p className="text-sm text-gray-500">
                    Your personal legal consultation chat
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="flex items-center text-sm text-green-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Online
                  </span>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-3xl ${
                      message.sender === "user" ? "order-2" : "order-1"
                    }`}
                  >
                    <div
                      className={`p-4 rounded-2xl ${
                        message.sender === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-white border border-gray-200 text-gray-900"
                      }`}
                    >
                      <div className="whitespace-pre-wrap">
                        {message.content}
                      </div>
                    </div>
                    <div
                      className={`text-xs text-gray-500 mt-1 ${
                        message.sender === "user" ? "text-right" : "text-left"
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                  <div
                    className={`flex items-end mb-6 ${
                      message.sender === "user"
                        ? "order-1 mr-3"
                        : "order-2 ml-3"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        message.sender === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {message.sender === "user" ? "U" : "AI"}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-3xl">
                    <div className="bg-white border border-gray-200 text-gray-900 p-4 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-end space-x-3">
                  <div className="flex-1">
                    <Textarea
                      ref={textareaRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask me anything about legal matters..."
                      className="min-h-[60px] max-h-32 resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      disabled={isLoading}
                    />
                  </div>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      "Send"
                    )}
                  </Button>
                </div>
                <div className="mt-2 text-xs text-gray-500 text-center">
                  Legal AI can make mistakes. Consider checking important
                  information with a qualified attorney.
                </div>
              </div>
            </div>
          </div>
        </div>
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
