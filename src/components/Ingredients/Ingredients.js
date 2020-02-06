import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngridientList from './IngredientList';
import IngredientList from './IngredientList';

const Ingredients = ()=> {
  const [ingridients, setIngridients] = useState([]);
  const [filteredArray, setFilteredArray] = useState([]);

  const itemRemoved = (itemId)=>{
    console.log('Item removed...', itemId);
    const newIngridientArray = ingridients.filter(
      arrayItem => arrayItem.id !== itemId    
    );
    setIngridients(newIngridientArray);
  }

  const valueChanged = (event)=>{
    //console.log(event.target.value);
    const newValue = event.target.value;
    if(newValue.length !== 0){
      console.log(event.target.value);
      setFilteredArray(
        ingridients.filter(
          (item)=> item.title.startsWith(newValue)
        )
      );      
    }
    else{
      setFilteredArray(ingridients);
    }
  }

  const addIngridient = (newIngridient)=>{
    fetch('https://react-recipes-6002a.firebaseio.com', {
      method: 'POST',
      mode: 'same-origin',
      body: newIngridient,
      headers: { 'Content-Type': 'application/json' },      
    }).then(
      (object)=>{
        console.log(object);
      }
    )

    //setIngridients([...ingridients, newIngridient]);
  }

  return (
    <div className="App">
      <IngredientForm
        submitted={addIngridient}
      />
      <section>
        <Search changed={valueChanged}/>
        {
          ingridients.length === 0 ? null : <IngredientList ingredients={ingridients} onRemoveItem={itemRemoved}/>
        }        
      </section>
    </div>
  );
}

export default Ingredients;
