import React,{useState, useEffect, useMemo, useCallback, useReducer}from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';
import useHttp from '../../hooks/http'

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


function Ingredients() {
  
  const [userIngredients, dispatch]=useReducer(ingredientReducer,[]);
  const {isLoaing, error,data, sendRequest, reqExtra, reqIdentifier} = useHttp()

  const filteredIngredientHandler = useCallback (filteredIngredients =>{
    dispatch({type:'SET',ingredients:filteredIngredients});
  },[]);

  const addIngredientHandler = useCallback((ingredient) =>{
    sendRequest(`https://react-hooks-example-19ae6.firebaseio.com/ingredeint.json`,
    'POST',JSON.stringify(ingredient), ingredient, 'ADD_ING');



  },[]);
  useEffect(()=>{
    if(!isLoaing && !error) {
      switch(reqIdentifier) {
        case 'DELETE_ING': 
          dispatch({type:'DELETE',id:reqExtra});
          return
        case 'ADD_ING':
          if(data!==null)
            dispatch({type:"ADD",ingredient:{...reqExtra, id:data.name}})
        return 
      }
    }

  },[data,reqExtra, reqIdentifier, isLoaing, error])
  const removeIngredientHanlder = useCallback((ingredientId)=>{
    sendRequest(`https://react-hooks-example-19ae6.firebaseio.com/ingredeint/${ingredientId}.json`,
    'DELETE',undefined,ingredientId, 'DELETE_ING')

  },[sendRequest])
  const ingredientList = useMemo(()=>{
    return(
    <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHanlder}>
    </IngredientList>
    )
  },[userIngredients, removeIngredientHanlder])
  const clearError = useCallback(()=>{
    // dispatchHttp({type:'CLEAR'})
  },[])

  return (
    <div className="App">
      {error? <ErrorModal onClose = {clearError}>{error}</ErrorModal>:null}
      <IngredientForm onAddIngredient = {addIngredientHandler} loading = {isLoaing}/>

      <section>
        <Search onLoadingIngredients ={filteredIngredientHandler} />
        {/* Need to add list here! */}
        {ingredientList}
      </section>
    </div>
  );
}

export default Ingredients;
