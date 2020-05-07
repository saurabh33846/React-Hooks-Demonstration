import React,{useState, useEffect, useCallback, useReducer}from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';

const ingredientReducer = (currentIngredients, action)=>{
  switch(action.type){
    case 'SET':
      return action.ingredients;
    case 'ADD':
      return [...currentIngredients, action.ingredient]
    case 'DELETE':
      return currentIngredients.filter((ing)=>{
        return ing.id!== action.id;
      })
    default:
      throw new Error("Should not come here");
  }
}
const httpReducer = (httpState, action)=>{
  switch(action.type){
    case 'SEND':
      return {loading:true, error:null};
    case 'RESPONSE':
      return {...httpState ,loading:false}
    case 'ERROR':
      return {loading:false, error:action.error};
    case 'CLEAR':
      return {...httpState, error:null}
    default:
      throw new Error('Should not reeached');
  }
}

function Ingredients() {
  const [userIngredients, dispatch]=useReducer(ingredientReducer,[]);
  const [httpState, dispatchHttp] = useReducer(httpReducer, {loading:false, error:null});

  const filteredIngredientHandler = useCallback (filteredIngredients =>{
    dispatch({type:'SET',ingredients:filteredIngredients});
  },[]);
  const addIngredientHandler = (ingredient) =>{
    dispatchHttp({type:'SEND'})
    fetch('https://react-hooks-example-19ae6.firebaseio.com/ingredeint.json',{
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
        
      },
      body: JSON.stringify(ingredient)
    }).then((response)=>{
      console.log(response);
      dispatchHttp({type:'RESPONSE'})
      dispatch({type:"ADD",ingredient:{...ingredient, id:response.name}})
    }).catch((err)=>{
      dispatchHttp({
        type:'ERROR',
        error:'something went wrong'
      })
    })

  }
  const removeIngredientHanlder = (ingredientId)=>{
    dispatchHttp({type:'SEND'});
    fetch(`https://react-hooks-example-19ae6.firebaseio.com/ingredeint/${ingredientId}.json`,{
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    }).then(()=>{
      dispatchHttp({type:'RESPONSE'});
      dispatch({type:"DELETE",id:ingredientId});
    }).catch((err)=>{
      dispatchHttp({
        type:'ERROR',
        error:'Something went wrong'
      })
      
    })

  }
  const clearError = ()=>{
    dispatchHttp({type:'CLEAR'})
  }

  return (
    <div className="App">
      {httpState.error? <ErrorModal onClose = {clearError}>{httpState.error}</ErrorModal>:null}
      <IngredientForm onAddIngredient = {addIngredientHandler} loading = {httpState.loading}/>

      <section>
        <Search onLoadingIngredients ={filteredIngredientHandler} />
        {/* Need to add list here! */}
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHanlder} ></IngredientList>
      </section>
    </div>
  );
}

export default Ingredients;
