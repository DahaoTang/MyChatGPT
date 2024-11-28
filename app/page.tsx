"use client";

import { ChatInterface } from "@/components/chat/ChatInterface";
import { ChatProvider } from "@/context/ChatContext";

export default function Home() {
	return (
		<ChatProvider>
			<ChatInterface />
		</ChatProvider>
	);
}
