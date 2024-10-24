import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.js";
import userRoutes from "./routes/userRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";
import characterRoutes from "./routes/characterRoutes.js";
import coordinateRoutes from "./routes/coordinateRoutes.js";
import scoreRoutes from "./routes/scoreRoutes.js";
import validationRoutes from "./routes/validationRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/characters", characterRoutes);
app.use("/api/coordinates", coordinateRoutes);
app.use("/api/scores", scoreRoutes);
app.use("/api/validate", validationRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
