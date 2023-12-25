import {createStore} from 'redux';

const defaultState = { brushMode: "brush" };

const reducer = (state = defaultState, action) => {
    return { 
        ...state,
        [action.type]: action.value
    };
}

const store = createStore(reducer);

export default store;