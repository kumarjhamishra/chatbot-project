// import OpenAI from "openai";
// export const configureOpenAI = () => {
//   return new OpenAI({
//     apiKey: process.env.OPEN_AI_FREE_SECRET,
//     organization: process.env.OPENAI_ORGANIZATION_ID,
//   });
// };
// import { GoogleGenerativeAI } from "@google/generative-ai";
// export const configureGemini = () => {
//   const genAI = new GoogleGenerativeAI(process.env.GEMINI_AI_SECRET);
//   // Try using just 'gemini-pro' as the model name
//   return genAI.getGenerativeModel({ model: "gemini-pro" });
// };
// import { GoogleGenAI } from "@google/genai";
import { GoogleGenerativeAI } from "@google/generative-ai";
export const configureGemini = () => {
    // const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_AI_SECRET || "" });
    // // Try using just 'gemini-pro' as the model name
    // return genAI;
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_AI_SECRET || "");
    return genAI.getGenerativeModel({ model: "gemini-pro" });
};
//# sourceMappingURL=gemini-config.js.map