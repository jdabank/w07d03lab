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

  const addName = (event) => {
    setNewName(event.target.value);
  };

  const addImage = (event) => {
    setNewImage(event.target.value);
  };

  const addCalories = (event) => {
    setNewCalories(event.target.value);
  };

  const addHad = (event) => {
    setNewHad(event.target.checked);
  };

  const addVeg = (event) => {
    setNewVeg(event.target.checked);
  };

  const addGood = (event) => {
    setNewGood(event.target.checked);
  };

  const addBreakfast = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/breakfast", {
        name: newName,
        image: newImage,
        calories: newCalories,
        hadThisWeek: newHad,
        vegetarian: newVeg,
        good: newGood,
      })
      .then(() => {
        axios.get("http://localhost:3000/breakfast").then((response) => {
          setBreakfast(response.data);
        });
      });
  };

  const toggleHad = (breakfast) => {
    axios
      .put(`http://localhost:3000/breakfast/${breakfast._id}`, {
        name: breakfast.name,
        image: breakfast.image,
        calories: breakfast.calories,
        hadThisWeek: !breakfast.hadThisWeek,
        vegetarian: breakfast.vegetarian,
        good: breakfast.good,
      }).then(() => {
        axios.get('http://localhost:3000/breakfast').then((response) => {
          setBreakfast(response.data)
        })
      })
  }

  const toggleNameCalories = (breakfast) => {
    axios.put(`http://localhost:3000/breakfast/${breakfast._id}`,
      {
        name: newName,
        image: breakfast.image,
        calories: newCalories,
        hadThisWeek: breakfast.hadThisWeek,
        vegetarian: breakfast.vegetarian,
        good: breakfast.good,
      }).then(() => {
        axios.get('http://localhost:3000/breakfast').then((response) => {
          setBreakfast(response.data)
        })
      })
  }

  // const edit = () => {
  //   axios.get('http://localhost:3000/breakfast').then((response) => {
  //     {breakfast !== null ? setBreakfast(response.data) : setBreakfast([])}
  //     })
  //   }
  //
  //   const edit2 = () => {
  //     axios.get('http://localhost:3000/breakfast').then((response) => {
  //       {breakfast !== null ? setBreakfast(response.data) : setBreakfast([])}
  //       })
  //     }

    const handleDelete = (breakfastData) => {
    axios
      .delete(`http://localhost:3000/breakfast/${breakfastData._id}`)
      .then(() => {
        axios.get("http://localhost:3000/breakfast").then((response) => {
          setBreakfast(response.data);
        });
      });
  };

  useEffect(() => {
    axios.get("http://localhost:3000/breakfast").then((response) => {
      setBreakfast(response.data);
    });
  }, []);

  return (
    <>
    <h1>Breakfast Bar</h1>
      <section>
        <h3>Add a New Meal</h3>
        <form onSubmit = {addBreakfast}>
        <input type = 'text' placeholder = 'Name' onChange = {addName}/><br/>
        <input type = 'text' placeholder = 'Image' onChange = {addImage}/><br/>
        <input type = 'text' placeholder = 'Calories' onChange = {addCalories}/><br/>
        Did you already have it this week? <input type = 'checkbox' onChange = {addHad}/><br/>
        Is it Vegetarian? <input type = 'checkbox' onChange = {addVeg}/><br/>
        Was it good? <input type = 'checkbox' onChange = {addGood}/><br/>
        <input type = 'submit' value = 'Submit'/>
        </form>
      </section>
      <section>
      {breakfast.map((breakfast) => {
        return (
        <>
        <div className = 'container'>
          <div className = 'card'>
            {breakfast.hadThisWeek ? <strike><h4>{breakfast.name}</h4></strike> : <h4>{breakfast.name}</h4>}
            <img src = {breakfast.image}/><br/>
            <p>{breakfast.calories} Calories</p>
            <button onClick={(event) => {handleDelete(breakfast)}}>Delete</button>
            {breakfast.vegetarian ? <p className = 'veg'>Vegetarian</p> : <p></p>}
            <button onClick = {(event) => {toggleHad(breakfast)}}>I Had This Meal This Week</button><br/>
            <p>Edit Meal</p>
            <form onSubmit={(event) => {toggleNameCalories(breakfast)}}>
            <input type = 'text' placeholder = {breakfast.name} onChange = {addName}/><br/>
            <input type = 'text' placeholder = {breakfast.calories} onChange = {addCalories}/><br/>
            <input className = 'submit' type = 'submit'/><br/>
            </form>
          </div>
        </div>
        </>
        )
      })}
      </section>
      </>
  )
}

export default App;
