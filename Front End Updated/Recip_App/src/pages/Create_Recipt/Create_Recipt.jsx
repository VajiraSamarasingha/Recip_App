import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import './Create_Recipt.css';
import useGetUserId from "../../hooks/useGetUserId.jsx";
import axios from 'axios';

function Create_Recipt() {
  const userID = useGetUserId();
  const [recip, setRecip] = useState({
    name: "",
    description: "",
    ingredient: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecip({ ...recip, [name]:value});
  }

  const handleIngredientChange = (event, idx) => {
    const { value } = event.target;
    const ingredients = recip.ingredient;
    ingredients[idx] = value;
    setRecip({ ...recip, ingredients });
  }

  const addIngredient = () => {
    setRecip({ ...recip, ingredient: [...recip.ingredient, ""] });
  }

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log(userID);
      await axios.post("http://localhost:8000/recipies", recip);
      alert("Recipe Created");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    <h2>Create Recipy</h2>
    <Form className="recipForm" onSubmit={onSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" id="name" name="name" placeholder="Enter Name" onChange={handleChange}/>
        </Form.Group>

        <Form.Group as={Col} >
          <Form.Label>Description</Form.Label>
          <Form.Control id="description" name="description" as="textarea" rows={3} placeholder="Description" onChange={handleChange}/>
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" >
        <Form.Label>Ingredients</Form.Label>
        {recip.ingredient.map((ingredient, idx) => (
          <Form.Control key={idx} type="text" name="ingredients" value={ingredient} onChange={(event)=>handleIngredientChange(event,idx)}/>
        ))}

        <button onClick={addIngredient} type="button">
          Add Ingredients
        </button>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Instruction</Form.Label>
        <Form.Control as="textarea" name="instructions" id="instructions" rows={3} placeholder="Instruction" onChange={handleChange}/>
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} >
          <Form.Label>Image URL</Form.Label>
          <Form.Control type="text" id="imageURL" name="imageUrl" onChange={handleChange}/>
        </Form.Group>

        <Form.Group as={Col} >
          <Form.Label>Cooking Time (minutes)</Form.Label>
          <Form.Control type="number" name="cookingTime" id="cooking" onChange={handleChange}/>
        </Form.Group>
      </Row>

      <Button variant="primary" type="submit">
        Create Recipy
      </Button>
    </Form>
    </>
  );
}

export default Create_Recipt;
