import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [newName, setNewName] = useState("");
  const [newImage, setNewImage] = useState("");
  const [newCalories, setNewCalories] = useState("");
  const [newHad, setNewHad] = useState("false");
  const [newVeg, setNewVeg] = useState("false");
  const [newGood, setNewGood] = useState("false");

  const [breakfast, setBreakfast] = useState([]);

  const handleDelete = (breakfastDelete) => {
    axios
      .delete("http://localhost:3000/breakfast/${breakfastData._id}")
      .then(() => {
        axios.get("http://localhost:3000/breakfast").then((response) => {
          setBreakfast(response.data);
        });
      });
  };

  useEffect(() => {
    axios.get("http://localhost:3000/breakfast").then((response) => {
      setBreakfast(response.data);
      console.log(response.data[0].name);
    });
  }, []);

  return (
    <>
      {breakfast.map((breakfast) => {
        return (
          <>
            <p>{breakfast.name}</p>
            <button
              onClick={(event) => {
                handleDelete(breakfast.name);
              }}
            >
              Delete
            </button>
          </>
        );
      })}
    </>
  );
};

export default App;
