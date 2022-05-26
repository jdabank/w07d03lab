import logo from './logo.svg'
import './App.css'
import {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {
  const [newName, setNewName] = useState('')
  const [newImage, setNewImage] = useState('')
  const [newCalories, setNewCalories] = useState('')
  const [newHad, setNewHad] = useState('false')
  const [newVeg, setNewVeg] = useState('false')
  const [newGood, setNewGood] = useState('false')

  const [breakfast, setBreakfast] = useState([])

  const addName = (event) => {
    setNewName(event.target.value)
  }

  const addImage = (event) => {
    setNewImage(event.target.value)
  }

  const addCalories = (event) => {
    setNewCalories(event.target.value)
  }

  const addHad = (event) => {
    setNewHad(event.target.checked)
  }

  const addVeg = (event) => {
    setNewVeg(event.target.checked)
  }

  const addGood = (event) => {
    setNewGood(event.target.checked)
  }

  const addBreakfast = (event) => {
    event.preventDefault()
    axios.post('http://localhost:3000/breakfast', {
      name: newName,
      image: newImage,
      calories: newCalories,
      hadThisWeek: newHad,
      vegetarian: newVeg,
      good: newGood,
    }).then(() => {
      axios.get('http://localhost:3000/breakfast').then((response) => {
        setBreakfast(response.data)
      })
    })
  }



  useEffect(() => {
    axios.get('http://localhost:3000/breakfast').then((response) => {
      setBreakfast(response.data)
    })
  }, [])

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
    <h3>All Breakfasts</h3>
    {breakfast.map((breakfast) => {
      return (
      <>
      <p>{breakfast.name}</p>
      <img src = {breakfast.image}/>
      <p>{breakfast.calories} Calories</p>
      </>
      )
    })}
    </section>
    </>
  )
}


export default App
