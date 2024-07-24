import axios from 'axios';
import {useEffect,useState} from 'react'
import useGetUserId from '../hooks/useGetUserId';
import {useCookies} from 'react-cookie';

export default function Home() {
  const [recipes,setRecipes] = useState( [] );
  const [savedRecipes,setSavedRecipes] = useState( [] );
  const [cookies,_] = useCookies(["access_token"]);
  const userID = useGetUserId();

  useEffect(() => {

    const fetchRecipe = async () => {
      try{
        const response = await axios.get('http://localhost:8000/recipies');
        setRecipes(response.data);
        console.log(response.data);
      }
      catch(err){
        console.log("Pichcha pokuru")
      }
    }

    const fetchSavedRecipe = async () => {
      try{
        const response = await axios.get(`http://localhost:8000/recipies/savedRecipes/ids/${userID}`,{
          userID
        });
        setSavedRecipes(response.data.savedRecipes);
      }
      catch(err){
        console.log("Pichcha pokuru")
      }
    }

    fetchRecipe();
    fetchSavedRecipe();

  },[]);

  const saveRecipe = async (recipeID) =>{
    try{
      const response = await axios.put('http://localhost:8000/recipies',{
        recipeID,
        userID,
      },
      {
        headers:{authorization:cookies.access_token}
      }
    );
      console.log(response);
      setSavedRecipes(response.data.savedRecipes);
    }
    catch(err){
      console.log("Pichcha pokuru")
    }
  }

  const isRecipeSaved = (id) => savedRecipes.includes(id);
  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            
            <div>
              <h2>{recipe.name}</h2>
              <button onClick={()=> saveRecipe(recipe._id)} disabled={isRecipeSaved(recipe._id)}>{isRecipeSaved(recipe._id) ? "Saved" : "Save"}</button>
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
