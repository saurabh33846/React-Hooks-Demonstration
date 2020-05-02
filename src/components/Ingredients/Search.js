import React, {useState, useEffect}from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const [enteredFilter, setEnteredFilter] = useState('');
  const {onLoadingIngredients} = props;
  useEffect(()=>{
    const query = enteredFilter.length=== 0? '':`?orderBy="title"&equalTo="${enteredFilter}"`;
    fetch('https://react-hooks-example-19ae6.firebaseio.com/ingredeint.json'+query).
    then((response)=>{
      return response.json()
    }).
    then((jsonData)=>{
      const aIngredeints = [];
      for(const key in jsonData){
        aIngredeints.push({
          id:key,
          title:jsonData[key].title,
          amount:jsonData[key].amount
        })
      }
      props.onLoadingIngredients(aIngredeints);
    })
  },[enteredFilter, onLoadingIngredients])
  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input type="text" value={enteredFilter} onChange={
            (event)=>{
            setEnteredFilter(event.target.value)}}/>
        </div>
      </Card>
    </section>
  );
});

export default Search;
