import { combineReducers } from "redux";
import resourcesReducer from "./resources"
import propertiesReducer from "./properties"
import creaturesReducer from "./creatures"
import programsReducer from "./programs"
import creatureProgramsReducer from "./creaturePrograms"

export default combineReducers({
    resources: resourcesReducer,
    properties: propertiesReducer,
    creatures: creaturesReducer,
    programs: programsReducer,
    creaturePrograms: creatureProgramsReducer,
})