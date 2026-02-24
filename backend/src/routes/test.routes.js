import express from "express";
import RateRule from "../models/RateRule.js";

const router = express.Router();

router.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

router.get("/checkToken", (req, res) => {
  res.json({ message: "toooooooooo" });
});

router.get("/rate-rule", async (req, res) => {
  const rule = await RateRule.create({
    target: "ip",
    scope: "endpoint",
    identifier: "/api/checkForSliding",
    limit: 2,
    timeWindow: 30,
    algorithm: "sliding_window",
    active: true,
  });
  res.json(rule);
});

import jwt from "jsonwebtoken";

router.get("/token/:id", (req, res) => {
  const token = jwt.sign(
    { id: req.params.id },
    "supersecret",
    { expiresIn: "1h" }
  );

  res.json({ token });
});

router.get("/checkForSliding",(req,res)=>{
    res.json({msg:"hiii"})
})
export default router;
