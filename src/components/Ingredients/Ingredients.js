import React,{useState, useEffect, useCallback}from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);

  // useEffect(()=>{
  //   fetch('https://react-hooks-example-19ae6.firebaseio.com/ingredeint.json').
  //   then((response)=>{
  //     return response.json()
  //   }).
  //   then((jsonData)=>{
  //     const aIngredeints = [];
  //     for(const key in jsonData){
  //       aIngredeints.push({
  //         id:key,
  //         title:jsonData[key].title,
  //         amount:jsonData[key].amount
  //       })
  //     }
  //     setUserIngredients(aIngredeints);
  //   })
  // },[]);
  const filteredIngredientHandler = useCallback (filteredIngredients =>{
    setUserIngredients(filteredIngredients)
  },[]);
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
  const removeIngredientHanlder = (ingredientId)=>{
    fetch(`https://react-hooks-example-19ae6.firebaseio.com/ingredeint/${ingredientId}.json`,{
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
        
      }
    }).then(()=>{
      setUserIngredients((prevIngredients)=>{
        return prevIngredients.filter((pervIng)=>{
          return ingredientId!== pervIng.id
        })
      })
    })
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient = {addIngredientHandler}/>

      <section>
        <Search onLoadingIngredients ={filteredIngredientHandler} />
        {/* Need to add list here! */}
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHanlder}></IngredientList>
      </section>
    </div>
  );
}

export default Ingredients;
