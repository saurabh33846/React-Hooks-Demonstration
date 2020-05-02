import React, {useState} from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {
  const submitHandler = event => {
    event.preventDefault();
    // ...
  };
  const inputState = useState({title:'',amount:''});
  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title" value={inputState[0].title} onChange={
              (event)=>{
                const sTitle = event.target.value;
              inputState[1]((prevState)=>{
                return {title:sTitle, amount:prevState.amount}})
                console.log(event.target.value);}
              }/>
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount"  value={inputState[0].amount} onChange={
              (event)=>{
                const sAmount = event.target.value;
                inputState[1](
                 (prevState)=>(
                   {amount:sAmount,title:prevState.title}
                   )
                )}}/>
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
