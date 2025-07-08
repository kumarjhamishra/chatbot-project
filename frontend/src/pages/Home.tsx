import { Box, useMediaQuery, useTheme } from "@mui/material";
import { TypingAnimation } from "../components/typer/TypingAnimation";
import { Footer } from "../components/footer/Footer";

const Home = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box width={"100%"} height={"100%"}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          mx: "auto",
          mt: 3,
        }}
      >
        <Box>
          <TypingAnimation></TypingAnimation>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { md: "row", xs: "column", sm: "column" },
            gap: 5,
            my: 10,
          }}
        >
          <img
            src="robot-without-bg.png"
            alt="robot-image"
            style={{ height: "200px", width: "200px", margin: "auto" }}
          ></img>

          <img
            src="chatbot-logo.png"
            alt="chatbot-logo-image"
            style={{
              height: "200px",
              width: "200px",
              margin: "auto",
              backgroundColor: "rgba(104, 149, 182, 0.8)",
              borderRadius: "50%",
            }}
          ></img>
        </Box>

        <Box
          sx={{
            display: "flex",
            width: "100%",
            mx: "auto",
          }}
        >
          <img
            src="chats.png"
            alt="chatbot"
            style={{
              display: "flex",
              margin: "auto",
              width: isBelowMd ? "80%" : "60%",
              borderRadius: 20,
              boxShadow: "-5px -5px 105px  #64f3d5",
              marginTop: 20,
              marginBottom: 20,
            }}
          />
        </Box>

        <Footer></Footer>
      </Box>
    </Box>
  );
};

export default Home;
