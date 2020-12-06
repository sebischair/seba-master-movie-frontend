export default function selectedMovie(state = {}, action) {
    switch (action.type) {
        case "GETMOVIE_SUCCESS":
            return { movie: action.movie };
        case "GETMVOVIE_ERROR":
            return { error: action.error };
        case "CHANGE_SELECTED_MOVIE":
            return {
                movie: {
                    ...state.movie,
                    ...action.updates,
                },
            };
        default:
            return { movie: action.movie };
    }
}
