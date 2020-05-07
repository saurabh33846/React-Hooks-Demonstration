import React, {useState} from 'react';

import Card from '../UI/Card';
import LoadingIndicator from '../UI/LoadingIndicator';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {
  console.log("I M ");
  const submitHandler = event => {
    props.onAddIngredient({title:enteredTitle, amount:enteredAmount});
    event.preventDefault();
    // ...
  };
  // const [inputState, setInputState] = useState({title:'',amount:''});
  const [enteredTitle, setTitleState] = useState('');
  const [enteredAmount, setAmountState] = useState('');
  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title" value={enteredTitle} onChange={
              (event)=>{
                const sTitle = event.target.value;
                setTitleState((prevState)=>{
                return sTitle})
                console.log(event.target.value);}
              }/>
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount"  value={enteredAmount} onChange={
              (event)=>{
                const sAmount = event.target.value;
                setAmountState(
                 (prevState)=>
                 sAmount
                )}}/>
          </div>
          <div className="ingredient-form__actions">
            <button type="submit">Add Ingredient</button>
            {props.loading ? <LoadingIndicator/>:null}
          </div>
        </form>
      </Card>
    </section>
  );
});

export default IngredientForm;
