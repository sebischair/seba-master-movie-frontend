import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";

import { getMovies, deleteMovie } from "../redux/actions";
import MovieListComponent from "../components/MovieListComponent";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

/**
 * Manages the process of getting movie list data
 * @param {props} props
 */
function MovieListView(props) {
    // state from the redux store
    const movies = useSelector((state) => state.entities.movies);
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        // load movies when the page is loaded or the movies have changed.
        if (!movies) {
            loadMovies();
        }
    }, [movies]);

    const loadMovies = async () => {
        // trigger the redux action getMovies
        props.dispatch(getMovies());
    };

    const onClickDeleteMovie = (id) => {
        // trigger the redux action delete Movies
        props.dispatch(deleteMovie(id));
    };

    const onClickDisplayMovie = (id) => {
        // navigate to details of the selected movie
        navigate("/movie/" + id);
    };

    const onAddMovie = () => {
        // navigate to an empty mask for entering details of the new movie
        navigate("/movie/new");
    };

    return !movies ? (
        // if no movies are loaded, the above useEffect should be triggered
        <Loading />
    ) : !Array.isArray(movies) ? (
        // apperantly something went wrong, usually there should be some kind of error handling
        <div>error</div>
    ) : (
        // everyhing is fine an the movie list can be displayed
        <MovieListComponent
            movies={movies}
            onClickDisplayMovie={onClickDisplayMovie}
            onClickDeleteMovie={onClickDeleteMovie}
            onAddMovie={onAddMovie}
            isLoggedIn={!!user.user}
            isAdmin={!!user.user ? user.user.role === "admin" : false}
        />
    );
}

// connect() establishes the connection to the redux functionalities
export default connect()(MovieListView);
