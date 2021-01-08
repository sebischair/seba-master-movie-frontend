import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";

import { getMovie, changeMovie, addMovie } from "../redux/actions";
import MovieDetailsComponent from "../components/MovieDetailsComponent";
import Loading from "../components/Loading";

/**
 * Manages the process of getting movie details data
 * @param {props} props
 */
function MovieDetailsView(props) {
    // from redux store
    const selectedMovie = useSelector((state) => state.selectedMovie);
    const user = useSelector((state) => state.user);

    // state variable of this functional component
    const [newMovie, setNewMovie] = React.useState(false);

    useEffect(() => {
        // get id of movie from URL
        let movieId = props.match.params.id;

        // check if a new movie is created
        if (movieId === "new") {
            // procedd with an empty element
            setNewMovie(true);
        } else {
            // trigger movie load from backend
            props.getMovie(movieId);
        }
    }, []);

    // for saving an existing movie
    const onSave = (movie) => {
        props.changeMovie(movie);
    };

    // for creating a new movie
    const onCreate = (movie) => {
        // trigger redux action add movie
        props.addMovie(movie);
        // navigate back to the movie list
        props.history.push("/");
    };

    return !selectedMovie.movie && !selectedMovie.error && !newMovie ? (
        <Loading />
    ) : selectedMovie.error ? (
        <div>error</div>
    ) : selectedMovie.movie ? (
        <MovieDetailsComponent
            movie={selectedMovie.movie}
            onSave={onSave}
            isLoggedIn={!!user.user}
            isAdmin={!!user.user ? user.user.role === "admin" : false}
        />
    ) : newMovie ? (
        <MovieDetailsComponent
            new={true}
            onCreate={onCreate}
            isLoggedIn={!!user.user}
        />
    ) : null;
}

// connect() establishes allows the usage of redux functionality
// here the function getMovie, changeMovie and addMovie are mentionend
// this is an alternative way of calling connecting them with redux
// another way is shown in MovieListView.js
export default connect(null, { getMovie, changeMovie, addMovie })(
    MovieDetailsView
);
