import React, {useState, useEffect, useRef} from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const [searchText, setSearchText] = useState('');
  const inputRef = useRef();

  useEffect(
    ()=>{
      const timeout = setTimeout(
        ()=>{
          if(searchText === inputRef.current.value)
          {
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
              props.onIngridientsChanged(newArray);
            }
        );
          }         
      }, 1000);
      return ()=>{
        clearTimeout(timeout);
      }
    }, 
    [searchText]
  )

  const inputChanged = (event)=>{
    setSearchText(event.target.value);
  }

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" onChange={props.changed} onChange={inputChanged} value={searchText} ref={inputRef} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
