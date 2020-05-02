import React,{useState, useEffect}from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);
  useEffect();
  const addIngredientHandler = (ingredient) =>{
    fetch('https://react-hooks-example-19ae6.firebaseio.com/ingredeint.json',{
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
        
      },
      body: JSON.stringify(ingredient)
    }).then((response)=>{
      console.log(response);
    })
    setUserIngredients((prevIngredients)=>{
      return [...prevIngredients, {...ingredient, id:Math.random().toString()}]
    })
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient = {addIngredientHandler}/>

      <section>
        <Search />
        {/* Need to add list here! */}
        <IngredientList ingredients={userIngredients} onRemoveItem={()=>{}}></IngredientList>
      </section>
    </div>
  );
}

export default Ingredients;
