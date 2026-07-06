import "dotenv/config"
import { generateText, type ModelMessage } from "ai";
import {openai} from "@ai-sdk/openai"
import { SYSTEM_PROMPT } from "./system/prompt";
import type { AgentCallbacks } from "../types";
import { getTracer, Laminar } from "@lmnr-ai/lmnr";


import { anthropic } from "@ai-sdk/anthropic";
import { tools } from "./tools";
import { executeTool } from "./executeTools";

const MODEL_NAME = "gpt-5-mini"

Laminar.initialize({
    projectApiKey: process.env.LMNR_PROJECT_API_KEY
});

export const runAgent = async (
    userMessage: string, 
    conversationHistory: ModelMessage[], 
    callbacks: AgentCallbacks
): Promise<any> => {

    const {text, toolCalls} = await generateText({
        model: openai(MODEL_NAME),
        prompt: userMessage,
        system: SYSTEM_PROMPT,
        tools,
        experimental_telemetry: {
          isEnabled:true,
          tracer: getTracer()  
        }
    });

    // console.log(text, toolCalls);

    // toolCalls.forEach(async (tc) => {
    //     console.log(await executeTool(tc.toolName, tc.input))
    // })

    await Laminar.flush();
    console.log("done")
}


runAgent('what is the current time now ?',[],)