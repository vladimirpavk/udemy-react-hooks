import React, { useState } from 'react';

import Card from '../UI/Card';
import './IngredientForm.css';

import LoadingIndicator from '../UI/LoadingIndicator';

const IngredientForm = React.memo(props => {
  
  const [inputTitle, setInputTitle] = useState('');
  const [inputAmount, setInputAmount] = useState('');

  const submitHandler = event => {
    event.preventDefault();
    // ...
    //console.log(inputTitle, inputAmount);
    props.submitted({      
      title: inputTitle,
      amount: inputAmount
    });
  };

  const titleChangedHandler = (event)=>{   
    setInputTitle(
      event.target.value
    );    
  }

  const amountChangedHandler = (event)=>{   
    setInputAmount(
      event.target.value
    );
  }

  return (  
      <section className="ingredient-form">
        <Card>
          <form onSubmit={submitHandler}>
            <div className="form-control">
              <label htmlFor="title">Name</label>
              <input type="text" id="title" value={inputTitle} onChange={titleChangedHandler} />
            </div>
            <div className="form-control">
              <label htmlFor="amount">Amount</label>
              <input type="number" id="amount" value={inputAmount} onChange={amountChangedHandler} />
            </div>
            <div className="ingredient-form__actions">
              <button type="submit">Add Ingredient</button>
              { props.isLoading && <LoadingIndicator /> }
            </div>            
          </form>
        </Card>
      </section>
  );
});

export default IngredientForm;
