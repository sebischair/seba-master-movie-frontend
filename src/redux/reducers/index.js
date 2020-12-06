import { combineReducers } from "redux";
import user from "./userReducer";
import entities from "./entitiesReducer";
import selectedMovie from "./selectedMovieReducer";

export default combineReducers({
    user,
    entities,
    selectedMovie,
});
