const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const express = require("express");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");
const axios = require("axios");

const app = express();
const PORT = 3005;

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  limit: 5,
});
app.use(morgan("combined"));
app.use(limiter);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/home", (req, res) => {
  return res.json({
    success: true,
    message: "Welcome",
  });
});
app.use("/authservice", async (req, res, next) => {
  try {
    // console.log(req.headers["x-access-token"]);
    const response = await axios.get(
      "http://localhost:3001/authservice/api/v1/isAuthenticated",
      {
        headers: {
          "x-access-token": req.headers["x-access-token"],
        },
      }
    );
    console.log("Response:", response.data);
    if (response.data.success) {
      next();
    } else {
      return res.status(401).json({
        message: "Authentication failed",
      });
    }
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
});

app.use(
  "/bookingservice",
  createProxyMiddleware({
    target: "http://localhost:3002/",
    changeOrigin: true,
  })
);
app.use(
  "/authservice",
  createProxyMiddleware({
    target: "http://localhost:3001/",
    changeOrigin: true,
  })
);

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
