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
	const scrollRef = React.useRef<HTMLDivElement>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!input.trim() || isLoading) return;

		setIsLoading(true);
		addMessage(input.trim(), "user");
		setInput("");

		try {
			const response = await fetch("/api/chat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ message: input.trim() }),
			});

			const data = await response.json();
			if (data.error) throw new Error(data.error);

			addMessage(data.response, "assistant");
		} catch (error) {
			addMessage(
				"Sorry, there was an error processing your request.",
				"assistant"
			);
		} finally {
			setIsLoading(false);
		}
	};

	React.useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
		}
	}, [messages]);

	return (
		<div className="h-screen flex flex-col">
			<Card className="flex-1 flex flex-col m-2 p-4">
				<ScrollArea className="flex-1 pr-4" ref={scrollRef}>
					{messages.map((message) => (
						<Message key={message.id} message={message} />
					))}
					{isLoading && (
						<div className="text-gray-500 ml-4">Assistant is typing...</div>
					)}
				</ScrollArea>

				<form onSubmit={handleSubmit} className="mt-4 flex gap-2">
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
			</Card>
		</div>
	);
}
