import React, { useState, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

import LoadingIndicator from '../UI/LoadingIndicator';
import ErrorModal from '../UI/ErrorModal';

const Ingredients = ()=> {
  const [ingridients, setIngridients] = useState([]);
  const [filteredArray, setFilteredArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const itemRemoved = (itemId)=>{
    //console.log('Item removed...', itemId);
    setLoading(true);
    fetch(`https://react-recipes-a3467.firebaseio.com/ingridients/${itemId}.json`, {
      method: 'DELETE'     
    }).then(
      (firebaseDocument)=>{
        const newIngridientArray = ingridients.filter(
          arrayItem => arrayItem.id !== itemId    
        );
        setIngridients(newIngridientArray);
        setLoading(false);
      }
    ).catch(
      (error)=>{
        setError('Something went wrong !!!');
      }
    )   
  }

  const valueChanged = (ingridients)=>{
    setIngridients(ingridients);
  }

  const addIngridient = (newIngridient)=>{
    setLoading(true);
    fetch('https://react-recipes-a3467.firebaseio.com/ingridients.json', {
      method: 'POST',
      body: JSON.stringify(newIngridient),
      headers: { 'Content-Type': 'application/json' },      
    }).then(
      (firebaseDocument)=>{
        return firebaseDocument.json();
      }
    ).then(
      (document)=>{
        //console.log(document);
        setIngridients([...ingridients, { id:document.name, ...newIngridient }]);
        setLoading(false);
      }      
    ).catch(
      (error)=>{
        setLoading(false);
        setError('Something went wrong !!!');
      }
    )
    //
  }

  const errorOnClose = () =>{
    setError(null);
  }

  return (
    <div className="App">
      {error && <ErrorModal onClose={errorOnClose}>{error}</ErrorModal>}
      <IngredientForm
        submitted={addIngridient}
        isLoading={loading}
      />
      <section>
        <Search onIngridientsChanged={valueChanged}/>
        {
          ingridients.length === 0 ? null : <IngredientList ingredients={ingridients} onRemoveItem={itemRemoved}/>
        }        
      </section>
    </div>
  );
}

export default Ingredients;
