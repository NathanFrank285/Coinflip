const LOAD = 'search/LOAD';

const load = arr => ({
  type: LOAD,
  arr,
});



// ********* THUNK ********** //

export const getSearch = (param) => async dispatch => {

  const response = await fetch(`/api/search/${param}`);

  if (response.ok) {
    const list = await response.json();
    let coinArr = Object.values(list)
    dispatch(load(coinArr))
    return;
  }
}

// ***** REDUCER ******* //

const searchReducer = (state = [], action) => {
  switch (action.type) {
    case LOAD:
      return { ...state, ...action.arr }
    default:
      return state;
  }
}


export default searchReducer;
