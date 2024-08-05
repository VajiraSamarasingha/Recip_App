import React from "react";
import { useEffect, useState } from "react";
import useGetUserId from "../../hooks/useGetUserId.jsx";
import { useCookies } from "react-cookie";
import Accordion from "react-bootstrap/Accordion";
import axios from "axios";

export default function Home() {
  const [recipes, setRecipes] = useState( [] );
  const [savedRecipes, setSavedRecipes] = useState( [] );
  const [cookies,_] = useCookies(["access_token"]);
  const userID = useGetUserId();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get("http://localhost:8000/recipies");
        setRecipes(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/recipies/savedRecipes/ids/${userID}`,
          {
            userID
          }
        );
        setSavedRecipes(response.data.savedRecipes);
        console.log(`Test 01 ${response.data.savedRecipes} at ${userID}`)
      } catch (err) {
        console.log(err);
      }
    };

    fetchRecipe();
    fetchSavedRecipe();
  }, []);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        "http://localhost:8000/recipies",
        {
          recipeID,
          userID,
        },
        {
          headers: { authorization: cookies.access_token },
        }
      );
      console.log(response);
      setSavedRecipes(response.data.savedRecipes);
    } catch (err) {
      console.log(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);
  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    {recipe.name}
                    <button
                      onClick={() => saveRecipe(recipe._id)}
                      disabled={isRecipeSaved(recipe._id)}
                    >
                      {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                    </button>
                  </Accordion.Header>

                  <Accordion.Body>
                    <div className="instructions">
                      <p>{recipe.instructions}</p>
                    </div>
                    <img src={recipe.imageUrl} alt={recipe.name} />
                    <p>Cooking Time: {recipe.cookingTime} (minuts)</p>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
