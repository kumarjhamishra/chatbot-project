import { Router } from "express";
import { verifyToken } from "../utils/tokens.js";
import { chatCompletionValidator, validate } from "../utils/validators.js";
import { deleteChats, generateChatCompletion, sendChatsToUser } from "../controllers/chat-controllers.js";

// protected API - only user with valid token can access
const chatRoutes = Router();
chatRoutes.post(
  "/new",
  validate(chatCompletionValidator),
  verifyToken,
  generateChatCompletion
);

// route so that when the user refresh the page, he gets all his chats
chatRoutes.get(
  "/all-chats",
  verifyToken,
  sendChatsToUser
);

// route to delete user chats
chatRoutes.delete(
  "/delete",
  verifyToken,
  deleteChats
);

export default chatRoutes;
