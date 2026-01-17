const dns = require("dns");

dns.setServers([
    "8.8.8.8",
    "8.8.4.4",
    "1.1.1.1"
]);

require("dotenv").config();
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const connect = require("./db/db");

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    cors({
        origin: [
            "http://localhost:5173",      // local dev
            "https://YOUR_FRONTEND.vercel.app"
        ],
        credentials: true
    })
);

// routes
const UserRoutes = require("./routes/user.routes");
app.use("/api", UserRoutes);

// server start
(async () => {
    try {
        await connect();
        app.listen(3000, () => {
            console.log("APP is running on PORT 3000");
        });
    } catch (err) {
        console.error("Server failed to start:", err.message);
    }
})();
