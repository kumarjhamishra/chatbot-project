import User from "../models/User.js";
// import OpenAI from "openai";
//import { GoogleGenerativeAI } from "@google/generative-ai";
import { configureGemini } from "../config/gemini-config.js";
export const generateChatCompletion = async (req, res, next) => {
    const { message } = req.body;
    if (!message || typeof message !== "string" || !message.trim()) {
        return res.status(400).json({ message: "Invalid message input" });
    }
    try {
        // now verify the user
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res
                .status(401)
                .json({ message: "User not registered or Token malfunctioned" });
        }
        // grabs the previous chats to get the context
        // // storing the chats in the static array
        // // each chat will have role and content
        // const chats = user.chats.map(({ role, content }) => ({
        //   role,
        //   content,
        // })) as OpenAI.Chat.ChatCompletionMessageParam[];
        // // now push the new chat
        // chats.push({ content: message, role: "user" });
        // // now store it in user db
        // user.chats.push({ content: message, role: "user" });
        // // send all chats with new one to openAI API
        // //const config = configureOpenAI();
        // const openai = configureOpenAI();
        // const chatResponse = await openai.chat.completions.create({
        //   model: "gpt-3.5-turbo",
        //   messages: chats,
        // });
        // //now get the latest chat
        // user.chats.push(chatResponse.choices[0].message);
        // await user.save();
        // // get latest response
        // return res.status(200).json({ chats: user.chats });
        /*
        // get gimini model
        const model = configureGemini();
    
        // start a chat session
        const chat = model.startChat({
          history: user.chats.map(({ role, content }) => ({
            role,
            parts: [{ text: content }],
          })),
        });
    
        // generate response
        const result = await chat.sendMessage(message);
        const response = result.response.text();
        const geminiMessage = response;
    
        // store user message and Gemini reply
        user.chats.push({ role: "user", content: message });
        user.chats.push({ role: "assistant", content: geminiMessage });
        await user.save();
    
        return res.status(200).json({ chats: user.chats });
        */
        // prepares full chat history as a string
        const history = user.chats
            .map((chat) => `${chat.role}: ${chat.content}`)
            .join("\n");
        const fullPrompt = history + `\nuser: ${message}`;
        // const genAI = configureGemini();
        // const result = await genAI.models.generateContent({
        //   model: "gemini-2.5-flash",
        //   contents: fullPrompt,
        // })
        // const responseText = result.text;
        const model = configureGemini();
        const contents = [
            ...user.chats.map((chat) => ({
                role: chat.role,
                parts: [{ text: chat.content }],
            })),
            { role: "user", parts: [{ text: message }] },
        ];
        const result = await model.generateContent({ contents });
        const responseText = result.response.text();
        // save user query and AI response
        user.chats.push({ role: "user", content: message });
        user.chats.push({ role: "assistant", content: responseText });
        await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};
export const sendChatsToUser = async (req, res, next) => {
    try {
        // user login
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered or Token malfunctioned");
        }
        console.log(user._id.toString(), res.locals.jwtData.id);
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't matched");
        }
        return res.status(200).json({ message: "SUCCESS", chats: user.chats });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
export const deleteChats = async (req, res, next) => {
    try {
        // user login
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res.status(401).send("User not registered or Token malfunctioned");
        }
        console.log(user._id.toString(), res.locals.jwtData.id);
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't matched");
        }
        //@ts-ignore
        user.chats = []; // above line to avoid type error
        await user.save();
        return res.status(200).json({ message: "SUCCESS" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=chat-controllers.js.map