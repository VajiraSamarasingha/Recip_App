import axios from 'axios';
import {useEffect,useState} from 'react'
import useGetUserId from '../hooks/useGetUserId';

export default function Saved_recipy() {
  const [savedRecipes,setSavedRecipes] = useState( [] );
  const userID = useGetUserId();

  useEffect(() => {

    const fetchSavedRecipe = async () => {
      try{
        const response = await axios.get(`http://localhost:8000/recipies/savedRecipes/${userID}`);
        setSavedRecipes(response.data.savedRecipes);
      }
      catch(err){
        console.log("Pichcha pokuru")
      }
    }

    fetchSavedRecipe();

  },[]);


  return (
    <div>
      <h1>Saved Recipes</h1>
      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            
            <div>
              <h2>{recipe.name}</h2>
              </div>
            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <p>Cooking Time: {recipe.cookingTime} (minuts)</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
