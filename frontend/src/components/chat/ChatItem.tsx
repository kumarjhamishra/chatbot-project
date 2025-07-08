import { Avatar, Box, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

// defining a function to extract code blocks and their language
function extractCodeBlocks(message: string) {
  if (!message.includes("```")) return null;
  const regex = /```(\w+)?\n([\s\S]*?)```/g;
  let match;
  const blocks: { code: string; lang: string }[] = [];
  let lastIndex = 0;
  while ((match = regex.exec(message)) !== null) {
    // Add any text before the code block as a text block
    if (match.index > lastIndex) {
      blocks.push({
        code: message.slice(lastIndex, match.index),
        lang: "text",
      });
    }
    blocks.push({ code: match[2], lang: match[1] || "text" });
    lastIndex = regex.lastIndex;
  }
  // Add any remaining text after the last code block
  if (lastIndex < message.length) {
    blocks.push({ code: message.slice(lastIndex), lang: "text" });
  }
  return blocks;
}

// function to check that whether a response contains code or not
function doesContainCode(str: string) {
  if (
    str.includes("=") ||
    str.includes(";") ||
    str.includes("[") ||
    str.includes("]") ||
    str.includes("{") ||
    str.includes("}") ||
    str.includes("#") ||
    str.includes("//")
  ) {
    return true;
  } else return false;
}

const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  // extract code blocks and language
  const messageBlocks = extractCodeBlocks(content);
  const auth = useAuth();
  return role === "assistant" ? (
    <Box sx={{ display: "flex", p: 2, bgcolor: "#004d5612", my: 1, gap: 2, borderRadius: 2, }}>
      <Avatar sx={{ ml: "0" }}>
        <img src="logo_without_bg.png" alt="clarity-ai" width={"30px"} />
      </Avatar>
      <Box>
        {!messageBlocks && (
          <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
        )}
        {messageBlocks &&
          messageBlocks.length > 0 &&
          messageBlocks.map((block, idx) =>
            block.lang !== "text" ? (
              <SyntaxHighlighter
                key={idx}
                style={coldarkDark}
                language={block.lang.toLowerCase()}
              >
                {block.code}
              </SyntaxHighlighter>
            ) : (
              <Typography key={idx} sx={{ fontSize: "20px" }}>
                {block.code}
              </Typography>
            )
          )}
      </Box>
    </Box>
  ) : (
    <Box sx={{ display: "flex", p: 2, bgcolor: "#004d56", gap: 2, borderRadius: 2 }}>
      <Avatar sx={{ ml: "0", bgcolor: "black", color: "white" }}>
        {auth?.user?.name[0]}
        {auth?.user?.name.split("")[1][0]}
      </Avatar>
      <Box>
        {!messageBlocks && (
          <Typography sx={{ fontSize: "20px" }}>{content}</Typography>
        )}
        {messageBlocks &&
          messageBlocks.length > 0 &&
          messageBlocks.map((block, idx) =>
            block.lang !== "text" ? (
              <SyntaxHighlighter
                key={idx}
                style={coldarkDark}
                language={block.lang.toLowerCase()}
              >
                {block.code}
              </SyntaxHighlighter>
            ) : (
              <Typography key={idx} sx={{ fontSize: "20px" }}>
                {block.code}
              </Typography>
            )
          )}
      </Box>
    </Box>
  );
};

export default ChatItem;
