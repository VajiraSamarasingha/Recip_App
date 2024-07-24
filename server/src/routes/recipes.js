const express = require("express");
const mongoose = require("mongoose");
const RecipeModel = require("../models/Recipes");
const UserModel = require("../models/Users");
const {verifyToken}  = require("./users");

const Reciperouter = express.Router();

Reciperouter.get("/", async (req, res) => {
  try {
    const response = await RecipeModel.find({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

Reciperouter.post("/",verifyToken, async (req, res) => {
  const recipe = new RecipeModel(req.body);
  try {
    const response = await recipe.save();
    console.log(recipe);
    res.json(response);
  } catch (err) {
    res.json(err);
    console.log(err);
  }
});

Reciperouter.put("/",verifyToken, async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);
    user.savedRecipes.push(recipe);
    await user.save();
    res.json({ savedRecipes: user.savedRecipes });

    
  } catch (err) {
    res.json(err);
  }
});

Reciperouter.get("/savedRecipes/ids/:userID", async(req,res)=>{
  try{
    const user = await UserModel.findById(req.params.userID);
    res.json({savedRecipes: user?.savedRecipes});
  }catch(err){
    res.json(err);
  }
});

Reciperouter.get("/savedRecipes/:userID",async(req,res)=>{
  try{
    const user = await UserModel.findById(req.params.userID);
    const savedRecipes = await RecipeModel.find({
      _id:{$in:user.savedRecipes}
    });
    res.json({savedRecipes});
  }catch(err){
    res.json(err);
  }
})

module.exports = { Reciperouter };
