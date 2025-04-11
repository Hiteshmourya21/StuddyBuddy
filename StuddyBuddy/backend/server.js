import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import http from "http";
import { Server } from "socket.io";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import connectionRoutes from "./routes/connection.route.js";
import chatRoutes from "./routes/chat.route.js";
import groupRoutes from "./routes/studyGroup.route.js";
import forumRoutes from "./routes/forum.route.js";
import quizRoutes from "./routes/quiz.route.js";

import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// Create an HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join_chat", (chatId) => {
    socket.join(chatId);
  });

  socket.on("send_message", ({ chatId, senderId, message }) => {
    io.to(chatId).emit("receive_message", { senderId, message });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// CORS configuration
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(express.json({ limit: "5mb" })); // Parse JSON request body
app.use(cookieParser());

// API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/connections", connectionRoutes);   
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/study-groups", groupRoutes);
app.use("/api/v1/forum",forumRoutes);
app.use("/api/v1/quiz",quizRoutes);


// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
