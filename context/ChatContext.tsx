"use client";

import React from "react";

export interface Message {
	id: string;
	content: string;
	role: "user" | "assistant";
	timestamp: Date;
}

interface ChatContextType {
	messages: Message[];
	addMessage: (content: string, role: Message["role"]) => void;
	clearMessages: () => void;
}

const ChatContext = React.createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
	const [messages, setMessages] = React.useState<Message[]>([]);

	const addMessage = (content: string, role: Message["role"]) => {
		const newMessage: Message = {
			id: Date.now().toString(),
			content,
			role,
			timestamp: new Date(),
		};
		setMessages((prev) => [...prev, newMessage]);
	};

	const clearMessages = () => setMessages([]);

	return (
		<ChatContext.Provider value={{ messages, addMessage, clearMessages }}>
			{children}
		</ChatContext.Provider>
	);
}

export function useChatContext() {
	const context = React.useContext(ChatContext);
	if (!context)
		throw new Error("useChatContext must be used within ChatProvider");
	return context;
}
