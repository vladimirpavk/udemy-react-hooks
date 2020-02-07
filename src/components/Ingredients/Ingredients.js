import React, { useState, useEffect } from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';
import IngridientList from './IngredientList';
import IngredientList from './IngredientList';

const Ingredients = ()=> {
  const [ingridients, setIngridients] = useState([]);
  const [filteredArray, setFilteredArray] = useState([]);

  useEffect(() => {
    fetch('https://react-recipes-a3467.firebaseio.com/ingridients.json').then(firebaseDocuments => firebaseDocuments.json()).then(
      (documents)=>{
        //console.log(documents);
        let newArray = [];
        for(let key in documents){
          //console.log(key, documents[key]);
          newArray.push(
            {
              id: key,
              title: documents[key].title,
              amount: documents[key].amount
            }
          );
        }
        //console.log(newArray);
        setIngridients(newArray);
      }
    )
  }, []);

  const itemRemoved = (itemId)=>{
    console.log('Item removed...', itemId);
    const newIngridientArray = ingridients.filter(
      arrayItem => arrayItem.id !== itemId    
    );
    setIngridients(newIngridientArray);
  }

  const valueChanged = (ingridients)=>{
    setIngridients(ingridients);
  }

  const addIngridient = (newIngridient)=>{
    /* console.log(newIngridient);
    console.log(JSON.stringify(newIngridient)); */
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
      }
    )
    //
  }

  return (
    <div className="App">
      <IngredientForm
        submitted={addIngridient}
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
