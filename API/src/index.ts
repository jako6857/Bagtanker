import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { userRoutes } from "./routes/userRoutes.js";
import { productRoutes } from "./routes/productRoutes.js";
import { authRoutes } from "./routes/authRoutes.js";
import path from "path";
import { reviewRoutes } from "./routes/reviewRoutes.js";
import { categoryRoutes } from "./routes/categoryRoutes.js";
import { favoriteRoutes } from "./routes/favoriteRoutes.js";
import { newsRoutes } from "./routes/newsRoutes.js";
import { messageRoutes } from "./routes/messageRoutes.js";
import { newsletterRoutes } from "./routes/newsletterRoutes.js";
import { slideRoutes } from "./routes/slideRoutes.js";

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();
app.use("/images", express.static(path.join(process.cwd(), "images")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/newsletters", newsletterRoutes);
app.use("/api/slides", slideRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
