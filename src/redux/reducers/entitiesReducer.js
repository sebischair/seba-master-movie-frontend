export default function entities(state = {}, action) {
    switch (action.type) {
        case "GETMOVIES_SUCCESS":
            return { movies: action.movies };
        case "DELETEMOVIE_SUCCESS":
            return { movies: action.movies };
        case "ADDMOVIE_SUCCESS":
            return { ...state };
        default:
            return state;
    }
}
