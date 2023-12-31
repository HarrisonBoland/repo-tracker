import { NextResponse } from "next/server";
import openai from "../openai/openai";

export async function POST(request: Request) {
  // todos in the body of the POST req
  const { todos } = await request.json();
  console.log(todos);

  // communicate with openAI GPT
  const reposnse = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0.8,
    n: 1,
    stream: false,
    messages: [
      {
        role: "system",
        content:
          "When responding, welcome the user as Harrison and say welcome to repo tracker! Limit the response to 200 characters",
      },
      {
        role: "user",
        content: `Hi there, provide a summary of the following todos. Count how many todos are in each category such as To do, In progress and Done, then tell the user to have a productive day! Here's the data: ${JSON.stringify(
          todos
        )}`,
      },
    ],
  });

  console.log("DATA IS: ", reposnse);
  console.log(reposnse.choices[0].message);

  return NextResponse.json(reposnse.choices[0].message);
}
