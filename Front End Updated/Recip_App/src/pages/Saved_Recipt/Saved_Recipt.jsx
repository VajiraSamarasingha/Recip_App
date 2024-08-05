import React from "react";
import { useEffect, useState } from "react";
import useGetUserId from "../../hooks/useGetUserId.jsx";
import { useCookies } from "react-cookie";
import Accordion from "react-bootstrap/Accordion";
import axios from "axios";

export default function Saved_Recip() {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = useGetUserId();

  useEffect(() => {
    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/recipies/savedRecipes/${userID}`);
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipe();

  }, []);

  return (
    <div>
      <h1>Saved Recipes</h1>
      <ul>
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    {recipe.name}
                    
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
