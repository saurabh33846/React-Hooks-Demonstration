import React,{useState, useEffect, useCallback}from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';
import ErrorModal from '../UI/ErrorModal';

function Ingredients() {
  const [userIngredients, setUserIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

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
    setIsLoading(true);
    fetch('https://react-hooks-example-19ae6.firebaseio.com/ingredeint.json',{
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
        
      },
      body: JSON.stringify(ingredient)
    }).then((response)=>{
      console.log(response);
      setUserIngredients((prevIngredients)=>{
        setIsLoading(false);
        return [...prevIngredients, {...ingredient, id:Math.random().toString()}]
      })
    }).catch((err)=>{
      setError('Something went wrong');
    })

  }
  const removeIngredientHanlder = (ingredientId)=>{
    setIsLoading(true);
    fetch(`https://react-hooks-example-19ae6.firebaseio.com/ingredeint/${ingredientId}.json`,{
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    }).then(()=>{
      setIsLoading(false);
      setUserIngredients((prevIngredients)=>{
        return prevIngredients.filter((pervIng)=>{
          return ingredientId!== pervIng.id
        })
      })
    }).catch((err)=>{
      setError('Something went wrong');
    })

  }
  const clearError = ()=>{
    /** React batches sync setState, means if below we are setting 2 stataes sync then react 
     * will group them together and update state and only 1 rerender cycle will happe not 2.
     */
    setError(null);
    setIsLoading(false);
  }

  return (
    <div className="App">
      {error? <ErrorModal onClose = {clearError}>{error}</ErrorModal>:null}
      <IngredientForm onAddIngredient = {addIngredientHandler} loading = {isLoading}/>

      <section>
        <Search onLoadingIngredients ={filteredIngredientHandler} />
        {/* Need to add list here! */}
        <IngredientList ingredients={userIngredients} onRemoveItem={removeIngredientHanlder} ></IngredientList>
      </section>
    </div>
  );
}

export default Ingredients;
