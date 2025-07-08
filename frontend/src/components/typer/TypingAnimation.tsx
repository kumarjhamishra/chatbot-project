import { TypeAnimation } from "react-type-animation";

export const TypingAnimation = () => {
  return (
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed once, initially
        "Chat with Clarity-AI",
        5000,
        "Built using Gemini",
        5000,
        "Your personal Chatbot",
        5000,
      ]}
      speed={50}
      style={{
        fontSize: "60px",
        color: "white",
        display: "inline-block",
        textShadow: "1px 1px 20px #000",
      }}
      repeat={Infinity}
    />
  );
};
