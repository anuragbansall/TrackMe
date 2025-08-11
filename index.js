import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Socket.io connection
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");

    io.emit("userDisconnected", { id: socket.id });
  });

  socket.on("locationUpdate", (data) => {
    console.log("Location update received:", data);

    const { latitude, longitude } = data;

    io.emit("locationUpdate", { id: socket.id, latitude, longitude });
  });
});

// Routes
app.get("/", (req, res) => {
  res.render("index"); // Looks for views/index.ejs
});

// Start server
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
