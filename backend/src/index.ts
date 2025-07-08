import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";

/// connections and listeners
const PORT = process.env.PORT || 5000
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => console.log("server has started and connceted to database"));
  })
  .catch((error) => console.log(error));
