import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
	throw new Error("Missing OPENAI_API_KEY environment variable");
}

export const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export async function generateResponse(message: string) {
	try {
		const response = await openai.chat.completions.create({
			model: "gpt-3.5-turbo",
			messages: [{ role: "user", content: message }],
			temperature: 0.7,
		});

		return response.choices[0].message.content;
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
}
