import React,{useState}from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);
  const addIngredientHandler = (ingredient) =>{
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
