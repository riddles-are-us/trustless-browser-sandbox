import { combineReducers } from "redux";
import resourcesReducer from "./resources"
import propertiesReducer from "./properties"
import creaturesReducer from "./creatures"

export default combineReducers({
    resources: resourcesReducer,
    properties: propertiesReducer,
    creatures: creaturesReducer,
})