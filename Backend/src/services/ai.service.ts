import { OpenAI } from "openai";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const client = new OpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

export const createOutreachMessage = async (name, jobTitle, company, location, summary) => {
  const systemPrompt = `
    You are an expert marketing assistant.
    Always write personalized, friendly, and human sounding outreach messages.
    Be warm, conversational, and positive.
    Avoid generic ad like language. No extra explanations, only final text output.

    example of outreach message : Hey John, I see you are working as a Software Engineer at TechCorp. Outflo
    can help automate your outreach to increase meetings & sales. Let's connect!
  `;

  const userPrompt = `
    Create a personalized outreach message for:

    Name: ${name}
    Job Title: ${jobTitle}
    Company: ${company}
    Location: ${location}
    Summary: ${summary}

    Message should be 2–4 short sentences.
  `;

  const response = await client.chat.completions.create({
    model: "llama3-70b-8192",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
  });

  return response.choices[0].message.content.trim();
};
