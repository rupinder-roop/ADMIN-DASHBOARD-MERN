import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";
import jwt from "jsonwebtoken";

// data imports
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js";
import AffiliateStat from "./models/AffiliateStat.js";
import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} from "./data/index.js";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/* USER AUTHENTICATE USING JWT */
app.post("/login", (req, res) => {
  const user = {
    id: 1,
    name: "Roop",
    email: "roop@adminhere.com",
  };

  jwt.sign(
    { user },
    process.env.JWTPRIVATEKEY,
    { expiresIn: "2d" },
    (err, token) => {
      res.json({
        token,
      });
    }
  );
});

app.post("/dashboard", verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.JWTPRIVATEKEY, (err, authData) => {
    if (err) {
      res.send({
        result: "Invalid Token",
      });
    } else {
      res.json({
        message: "Profile Accessed",
        authData,
      });
    }
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== undefined) {
    if(bearerHeader){
      const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    next();
    }else{
      res.send({
        message:"Nhi mila"
      })
    }
    
  } else {
    res.send({
      result: "Token Invalid",
    });
  }
}

// localStorage.setItem("token",process.env.JWTPRIVATEKEY);
// localStorage.setItem("token",JSON.stringify(process.env.JWTPRIVATEKEY))

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Mongo Connected at Server Port: ${PORT}`)
    );

    /* ONLY ADD DATA ONE TIME */
    // AffiliateStat.insertMany(dataAffiliateStat);
    // OverallStat.insertMany(dataOverallStat);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // User.insertMany(dataUser);
  })
  .catch((error) => console.log(`${error} did not connect`));
