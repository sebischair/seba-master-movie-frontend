import MovieService from "../../services/MovieService";

export function getMovies() {
    // when the backend call was successfull and the movies are retrieved
    // in the dispatcher the movies will be added to the global state
    function onSuccess(movies) {
        return { type: "GETMOVIES_SUCCESS", movies: movies };
    }
    // when the backend call was failed
    function onFailure(error) {
        // error handling
        console.log("failed to get the movies", error);
    }

    return async (dispatch) => {
        try {
            // ask for the movies in the backend
            let movies = await MovieService.getMovies();
            // call onSuccess in context of redux
            dispatch(onSuccess(movies));
        } catch (e) {
            onFailure(e);
        }
    };
}

export function deleteMovie(id) {
    function onSuccess(movies) {
        return { type: "DELETEMOVIE_SUCCESS", movies: movies };
    }
    function onFailure(error) {
        console.log("delete movie failure", error);
    }

    return async (dispatch) => {
        try {
            await MovieService.deleteMovie(id);
            let movies = await MovieService.getMovies();
            dispatch(onSuccess(movies));
        } catch (e) {
            onFailure(e);
        }
    };
}

export function addMovie(movie) {
    function onSuccess() {
        return { type: "ADDMOVIE_SUCCESS" };
    }
    function onFailure(error) {
        console.log("add movie failure", error);
    }

    return async (dispatch) => {
        try {
            await MovieService.createMovie(movie);
            dispatch(onSuccess());
        } catch (e) {
            onFailure(e);
        }
    };
}

export function changeMovie(changedMovie) {
    function onSuccess(movie) {
        return { type: "UPDATEMOVIE_SUCCESS", movie: movie };
    }

    function onFailure(error) {
        console.log("change movie failure", error);
    }

    return async (dispatch) => {
        try {
            let movie = await MovieService.updateMovie(changedMovie);
            dispatch(onSuccess(movie));
        } catch (e) {
            onFailure(e);
        }
    };
}

export const getMovie = (id) => {
    function onSuccess(movie) {
        return { type: "GETMOVIE_SUCCESS", movie: movie };
    }
    function onFailure(error) {
        console.log("failed to load a movie", error);
    }

    return async (dispatch, getState) => {
        try {
            let movie = await MovieService.getMovie(id);
            dispatch(onSuccess(movie));
        } catch (e) {
            onFailure(e);
        }
    };
};
