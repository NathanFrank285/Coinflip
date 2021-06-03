import { getSearch } from '../../store/search';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './Searchbar.css';


const SearchBar = () => {
    const [keyword, setKeyword] = useState("")
    const history = useHistory()
    const dispatch = useDispatch();

    const submit = (e) => {
      e.preventDefault();
      dispatch(getSearch(keyword));
      history.push("/searchList")
      setKeyword("")
    }


    return (
        <form
          method="get"
          action="/search/"
          onSubmit={(e) => submit(e)}>
            <div className='search-container'>
              <div>
                <input
                  value={keyword}
                  className='search-input'
                  placeholder="Search coins"
                  onChange={(e) => setKeyword(e.target.value)}>

                </input>
              </div>
              <div>
                <button className='search-button' onClick={(e) => submit(e)} type="submit">Search</button>
              </div>
            </div>
        </form>

    )
  }

  export default SearchBar
