import React, { useState } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngridientList from './IngredientList';
import IngredientList from './IngredientList';

const Ingredients = ()=> {
  const [ingridients, setIngridients] = useState([]);

  const itemRemoved = (itemId)=>{
    console.log('Item removed...', itemId);
    const newIngridientArray = ingridients.filter(
      arrayItem => arrayItem.id !== itemId    
    );
    setIngridients(newIngridientArray);
  }

  return (
    <div className="App">
      <IngredientForm submitted={(ingridient)=>{
        //console.log(ingridients, ingridient);
        setIngridients([...ingridients, ingridient]);
      }
    }/>
      <section>
        <Search />
        {
          ingridients.length === 0 ? null : <IngredientList ingredients={ingridients} onRemoveItem={itemRemoved}/>
        }        
      </section>
    </div>
  );
}

export default Ingredients;
