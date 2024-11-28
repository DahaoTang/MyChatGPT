import { generateResponse } from "@/lib/openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	try {
		const { message } = await req.json();
		const response = await generateResponse(message);
		return NextResponse.json({ response });
	} catch {
		return NextResponse.json(
			{ error: "Error processing your request" },
			{ status: 500 }
		);
	}
}
