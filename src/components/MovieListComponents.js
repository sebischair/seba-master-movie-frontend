import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Button,
    Divider,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
import DeleteIcon from "@material-ui/icons/Delete";

// a material ui function. With this way of styling you have the style classes of this component in one place
// and you can access the global theme of the application
const useStyles = makeStyles((theme) => ({
    movieListRoot: {
        padding: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    movieListHeader: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        maxWidth: "1000px",
    },
    headerDivider: {
        margin: theme.spacing(2),
    },
    addMovieButton: {
        margin: theme.spacing(2),
    },
    movieListPaper: {
        width: "1000px",
    },
}));

/**
 * For presenting and changing movies
 * @param {props} props
 */
function MovieListComponent(props) {
    // with this you can access the above defiend style classes
    const classes = useStyles();

    return (
        <div className={classes.movieListRoot}>
            <div className={classes.movieListHeader}>
                <Typography variant="h4" align="center">
                    Welcome to the Movie Example App!
                </Typography>
                <Divider className={classes.headerDivider} />
                <Typography align="center">
                    Here is a list of movies in our database. If you are logged
                    in you can add, alter and delete the movies here. You can
                    register or log in by clicking on the icon in the top right.
                </Typography>
            </div>
            <Paper className={classes.movieListPaper}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Picture</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.movies.map((movie, index) => (
                                <TableRow
                                    key={index}
                                    onClick={() =>
                                        props.onClickDisplayMovie(movie.id)
                                    }
                                >
                                    <TableCell>
                                        {movie.thumbnail ? (
                                            <img
                                                src={movie.thumbnail}
                                                alt="Movie Thumbnail"
                                            />
                                        ) : (
                                            <ImageIcon />
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="h6">
                                            {movie.title}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                props.onClickDeleteMovie(
                                                    movie.id
                                                );
                                            }}
                                            disabled={!props.isLoggedIn}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            {props.isLoggedIn ? (
                <Button
                    onClick={props.onAddMovie}
                    variant="contained"
                    color="primary"
                    className={classes.addMovieButton}
                >
                    Add Movie
                </Button>
            ) : null}
        </div>
    );
}

export default MovieListComponent;
