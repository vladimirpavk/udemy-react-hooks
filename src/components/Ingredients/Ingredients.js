import React, { useState, useReducer } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngredientList from './IngredientList';

import ErrorModal from '../UI/ErrorModal';

const ingridientsReducer = (ingridients, action) =>{
  switch(action.type){
    case "SET":{
      return [...action.ingridients];
    }
    case "ADD":{
      return [...ingridients, action.newIngridient];
    }
    case "REMOVE":{
      return ingridients.filter(ingridient => ingridient.id !== action.itemId)
    }
    default:{
      throw new Error('Something unpredictible happened !!!');
    }
  }
}

const httpReducer = (httpState, action)=>{
  switch(action.type){
    case "SEND":{
      return {loading: true, error: ''}
    }
    case "RESPONSE":{
      return {loading: false, error: ''}
    }
    case "ERROR":{
      return {loading:false, error: action.error}
    }
    default:
      throw new Error('Something bad happened !!!');
  }  
}

const Ingredients = ()=> {
  const [ingridients, dispatch] = useReducer(ingridientsReducer, []);
  const [httpState, httpDispatch] = useReducer(httpReducer, {loading: false, error: ''});

  //const [ingridients, setIngridients] = useState([]); 
  /* const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); */

  const itemRemoved = (itemId)=>{
    //setLoading(true);
    httpDispatch({type:'SEND'});
    fetch(`https://react-recipes-a3467.firebaseio.com/ingridients/${itemId}.json`, {
      method: 'DELETE'     
    }).then(
      (firebaseDocument)=>{
       /*  const newIngridientArray = ingridients.filter(
          arrayItem => arrayItem.id !== itemId    
        );
        setIngridients(newIngridientArray); */
        dispatch({
          type: 'REMOVE',
          itemId: itemId
        });
        //setLoading(false);
        httpDispatch({type:'RESPONSE'});
      }
    ).catch(
      (error)=>{
       /*  setLoading(false);
        setError('Something went wrong !!!'); */
        httpDispatch({
          type: 'ERROR',
          error: 'Something went wrong !!!'
        });
      }
    )   
  }

  const valueChanged = (ingridients)=>{
    //setIngridients(ingridients);
    dispatch({
      type: 'SET',
      ingridients: ingridients
    })
  }

  const addIngridient = (newIngridient)=>{
    /* setLoading(true); */
    httpDispatch({type:'SEND'});
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
        //setIngridients([...ingridients, { id:document.name, ...newIngridient }]);
        dispatch({
          type: 'ADD',
          newIngridient: {
            id: document.name,
            ...newIngridient
          }
        });
        /* setLoading(false); */
        httpDispatch({type: 'RESPONSE'});
      }      
    ).catch(
      (error)=>{
        /* setLoading(false);
        setError('Something went wrong !!!'); */
        httpDispatch({
          type: 'ERROR',
          error: 'Something went wrong !!!'
        });
      }
    )
    //
  }

  const errorOnClose = () =>{
    //setError(null);
    httpDispatch({type:'SEND'});
  }

  return (
    <div className="App">
      {httpState.error && <ErrorModal onClose={errorOnClose}>{httpState.error}</ErrorModal>}
      <IngredientForm
        submitted={addIngridient}
        isLoading={httpState.loading}
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
