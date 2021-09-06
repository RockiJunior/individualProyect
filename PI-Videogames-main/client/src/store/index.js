import { createStore, applyMiddleWare } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { rootReducer } from '../reducer/index.js';


export const store = createStore(rootReducer, composeWithDevTools(applyMiddleWare(thunk)));