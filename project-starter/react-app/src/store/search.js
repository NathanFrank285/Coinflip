const LOAD = 'search/LOAD';

const load = list => ({
  type: LOAD,
  list,
});



// ********* THUNK ********** //

export const getSearch = (param) => async dispatch => {

  const response = await fetch(`/api/search/${param}`);

  if (response.ok) {
    const list = await response.json();
    dispatch(load(list))
    console.log(list, '===============')
    return list;
  }
}

// ***** REDUCER ******* //

const searchReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD:
      const newState = {}
      action.list.forEach((search) => {
        newState[search.name] = search;
      })

      return newState;
    default:
      return state;
  }
}


export default searchReducer;
