import React, { useState } from 'react'
import axios from 'axios';
import useGetUserId from '../hooks/useGetUserId';
import {useNavigate} from 'react-router-dom';

export default function Create_recipt() {
  const userID = useGetUserId();
  const [recipt,setRecipe] = useState({
    name:"",
    description: "",
    ingredient:[],
    instructions:"",
    imageUrl:"",
    cookingTime:0,
    userOwner:userID,
  })

  const navigate = useNavigate();

  const handleChange = (event)=>{
    const {name,value} = event.target;
    setRecipe({...recipt,[name]:value});
  }

  const handleIngredientChange = (event,idx)=>{
    const {value} = event.target;
    const ingredients = recipt.ingredient;
    ingredients[idx] = value;
    setRecipe({...recipt,ingredients});
  }

  const addIngredient = ()=>{
    setRecipe({...recipt,ingredient:[...recipt.ingredient,""]});
  }
  
  const onSubmit = async(event)=>{
    event.preventDefault();

    try{
      console.log(userID);
      await axios.post('http://localhost:8000/recipies',recipt);
      alert("Recipe Created");
      navigate('/');
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className='create-recipe'>
      <h2>Create Recipy</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id='name' name='name' onChange={handleChange}/>
        <label htmlFor="description">Description</label>
        <textarea name="description" id="description" onChange={handleChange}></textarea>
        <label htmlFor="ingredients">Ingredints</label>
        {recipt.ingredient.map((ingredients,idx)=>(
          <input key={idx} type='text' name='ingredients' value={ingredients} onChange={(event)=>handleIngredientChange(event,idx)}/>
        ))}
        
        <button onClick={addIngredient} type='button'>Add Ingredient</button>
        <label htmlFor="Instruction">Instruction</label>
        <textarea name="instructions" id="instructions" onChange={handleChange}></textarea>
        <label htmlFor="imageUrl">Image URL:</label>
        <input type="text" id='imageURL' name='imageUrl' onChange={handleChange}/>
        <label htmlFor="cookingTime">Cooking Time (minutes)</label>
        <input type="number" id='cooking' onChange={handleChange}/>
        <button type='submit'>Create Recipy</button>
        
      </form>
    </div>
  )
}
