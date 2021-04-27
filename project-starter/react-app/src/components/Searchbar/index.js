import { getSearch } from '../../store/search';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './search.css';


const SearchBar = () => {
    const [keyword, setKeyword] = useState("")
    const history = useHistory()
    const dispatch = useDispatch();

    const submit = (e) => {
      e.preventDefault();
      dispatch(getSearch(keyword));
      history.push("/coinDetail")
    }


    return (
      <div>
        <form
          method="get"
          action="/search/"
          onSubmit={(e) => submit(e)}>

          <input
            value={keyword}
            placeholder="Search By State"
            onChange={(e) => setKeyword(e.target.value)}>

          </input>

          <button onClick={(e) => submit(e)} type="submit">Find!</button>
        </form>
      </div>
    )
  }

  export default SearchBar
