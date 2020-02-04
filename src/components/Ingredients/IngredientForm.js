import React, { useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

const IngredientForm = React.memo(props => {
  const [inputState, setInputState] = useState(
    {
      title: '',
      amount: ''
    }
  );

  const submitHandler = event => {
    event.preventDefault();
    // ...
    console.log(inputState.title, inputState.amount);
  };

  const titleChangedHandler = (event)=>{
    event.persist();
    setInputState(
      (previousState)=>{
        return  {
          title: event.target.value,
          amount: previousState.amount
        }
      }     
    );    
  }

  const amountChangedHandler = (event)=>{
    event.persist();
    setInputState(
      (previousState)=>{
        return {
          title: previousState.title,
          amount: event.target.value
        }
      }
    );
  }

  return (
    <section className="ingredient-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className="form-control">
            <label htmlFor="title">Name</label>
            <input type="text" id="title" value={inputState.title} onChange={titleChangedHandler} />
          </div>
          <div className="form-control">
            <label htmlFor="amount">Amount</label>
            <input type="number" id="amount" value={inputState.amount} onChange={amountChangedHandler} />
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
