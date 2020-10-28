/**
ALL function for /api/* routes.
USES: Database, cookies, login, etc.
*/

import User from "./../models/user.model";
import Category from "./../models/category.model";
import express from "express";
let router = express.Router();

router.get("/sasha", (req, res) => {
  res.send("hey sasha...");
});

router.get("/categories", (req, res) => {
  Category.find({}, (err, docs) => {
    if (err)
      throw new Error(
        "Couldn't find any categorical data. -- NOTE SUPPOSED TO HAPPEN"
      );
    res.json(docs);
  });
});

export default router;
