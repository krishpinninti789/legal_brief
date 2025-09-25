import React from "react";

interface ChatLayoutProps {
  children: React.ReactNode;
}

const ChatLayout = ({ children }: ChatLayoutProps) => {
  return <div className="h-screen overflow-hidden">{children}</div>;
};

export default ChatLayout;
