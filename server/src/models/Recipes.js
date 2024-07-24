const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    description:{type:String,required:true},
    ingredient:[{type:String,required:true}],
    instructions:{type:String,required:true},
    imageUrl:{type:String,required:true},
    cookingTime:{type:Number,required:true},
    userOwner:{type:mongoose.Schema.Types.ObjectId,ref:"users",required:true},
})

const RecipeModel = mongoose.model('Recipe',RecipeSchema);
module.exports = RecipeModel;