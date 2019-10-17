import {combineReducers,createStore} from 'redux';
import baseData from './reducer/baseData/index.js';
export default createStore(combineReducers({
    baseData,
}));