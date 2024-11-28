"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatContext } from "@/context/ChatContext";
import { Message } from "./Message";

export function ChatInterface() {
	const { messages, addMessage } = useChatContext();
	const [input, setInput] = React.useState("");
	const [isLoading, setIsLoading] = React.useState(false);
	const messagesEndRef = React.useRef<HTMLDivElement>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!input.trim() || isLoading) return;

		setIsLoading(true);
		const message = input.trim();
		addMessage(message, "user");
		setInput("");

		try {
			const response = await fetch("/api/chat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ message }),
			});
			if (!response.ok) throw new Error();
			const { response: assistantResponse } = await response.json();
			addMessage(assistantResponse, "assistant");
		} catch {
			addMessage(
				"Sorry, I encountered an error. Please try again.",
				"assistant"
			);
		} finally {
			setIsLoading(false);
		}
	};

	React.useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const hasMessages = messages.length > 0;
	const headerClasses = `
    font-bold text-center transition-all duration-500 ease-in-out py-4 sticky top-0 z-10
    ${
			hasMessages
				? "text-2xl translate-y-0 bg-background"
				: "text-4xl translate-y-[30vh]"
		}
  `;
	const scrollAreaClasses = `
    h-[calc(100vh-13rem)] px-4 transition-opacity duration-500
    ${hasMessages ? "opacity-100 delay-300" : "opacity-0"}
  `;

	return (
		<div className="h-screen flex flex-col p-4">
			<Card className="flex-1 flex flex-col shadow-none border-none">
				<div className="flex flex-col h-full">
					<h1 className={headerClasses}>
						{hasMessages ? (
							"MyGPT"
						) : (
							<span className="bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 text-transparent bg-clip-text">
								Welcome to MyGPT, JuJu
							</span>
						)}
					</h1>
					<div className="flex-1 overflow-hidden">
						<ScrollArea className={scrollAreaClasses}>
							<div className="space-y-4">
								{messages.map((message) => (
									<Message key={message.id} message={message} />
								))}
								{isLoading && (
									<div className="text-gray-500 ml-4">
										Assistant is typing...
									</div>
								)}
								<div ref={messagesEndRef} />
							</div>
						</ScrollArea>
					</div>
					<div className="p-4 bg-background">
						<form onSubmit={handleSubmit} className="flex gap-2">
							<Input
								value={input}
								onChange={(e) => setInput(e.target.value)}
								placeholder="Type a message..."
								className="flex-1"
								disabled={isLoading}
							/>
							<Button type="submit" disabled={isLoading}>
								Send
							</Button>
						</form>
						<div className="mt-6 flex items-center justify-center text-sm text-gray-500">
							Developed by
							<a
								className="hover:text-rose-300 mx-1"
								href="https://dahaotang.com/"
								target="_blank"
								rel="noopener noreferrer"
							>
								Dahao Tang
							</a>
							| 2024
						</div>
					</div>
				</div>
			</Card>
		</div>
	);
}
