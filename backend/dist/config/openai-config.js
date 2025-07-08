import OpenAI from "openai";
export const configureOpenAI = () => {
    return new OpenAI({
        apiKey: process.env.OPEN_AI_FREE_SECRET,
        organization: process.env.OPENAI_ORGANIZATION_ID,
    });
};
//# sourceMappingURL=openai-config.js.map