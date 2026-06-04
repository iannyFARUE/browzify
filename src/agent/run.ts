import "dotenv/config"
import { generateText, type ModelMessage } from "ai";
import {openai} from "@ai-sdk/openai"
import { SYSTEM_PROMPT } from "./system/prompt";
import type { AgentCallbacks } from "../types";

import { anthropic } from "@ai-sdk/anthropic";
import { tools } from "./tools";
import { executeTool } from "./executeTools";

const MODEL_NAME = "gpt-5-mini"

export const runAgent = async (
    userMessage: string, 
    conversationHistory: ModelMessage[], 
    callbacks: AgentCallbacks
) => {

    const {text, toolCalls} = await generateText({
        model: openai(MODEL_NAME),
        prompt: userMessage,
        system: SYSTEM_PROMPT,
        tools,
        toolChoice:'auto',
    });

    console.log(text, toolCalls);
}


runAgent('what is the current time now ?')