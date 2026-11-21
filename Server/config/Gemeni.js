import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config({ path: "../.env" });

const apiKey = process.env.GEMENI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing. Check your .env file.");
}

const ai = new GoogleGenAI({ apiKey });

async function main(prompt) {
  const interaction = await ai.interactions.create({
    model: "gemini-3.1-flash-lite",
    input: prompt,
  });

  console.log(interaction);

  return interaction.output_text;
}

export default main;
