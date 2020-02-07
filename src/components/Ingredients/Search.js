import React, {useState, useEffect} from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const [searchText, setSearchText] = useState('');

  useEffect(
    ()=>{
      const queryParams = 
        searchText.length === 0 ?
        '' :
        `?orderBy="title"&equalTo="${searchText}"`;     

      fetch(`https://react-recipes-a3467.firebaseio.com/ingridients.json${queryParams}`).then(firebaseDocuments => firebaseDocuments.json()).then(
        (documents)=>{         
          let newArray = [];
          for(let key in documents){           
            newArray.push(
              {
                id: key,
                title: documents[key].title,
                amount: documents[key].amount
              }
            );
          }          
          console.log(newArray);
          props.onIngridientsChanged(newArray);
        }
      )
    }, [searchText]
  )

  const inputChanged = (event)=>{
    setSearchText(event.target.value);
  }

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" onChange={props.changed} onChange={inputChanged} value={searchText} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
