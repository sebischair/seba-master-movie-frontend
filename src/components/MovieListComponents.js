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
    TableSortLabel,
} from "@material-ui/core";
import PropTypes from "prop-types";
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

function SortableTableHeadCell(props) {
    const classes = useStyles();

    const { headCell, order, orderBy, onRequestSort } = props;

    return (
        <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
        >
            <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={onRequestSort}
            >
                {headCell.label}
            </TableSortLabel>
        </TableCell>
    );
}

const sortableHeadCells = [
    {
        id: "title",
        label: "Titel",
    },
    {
        id: "year",
        label: "Year",
    },
    {
        id: "criticsRating",
        label: "Critics Rating",
    },
    {
        id: "avgAudienceRating",
        label: "Audience Rating",
    },
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

/**
 * For presenting and changing movies
 * @param {props} props
 */
function MovieListComponent(props) {
    // with this you can access the above defiend style classes
    const classes = useStyles();

    const [orderBy, setOrderBy] = React.useState();
    const [order, setOrder] = React.useState();

    const onRequestSort = (cellId, event) => {
        // if the current orderBy is also the clicked property then the direction of the sorting should be changed
        // otherwise the fist order direction is always ascending
        const isAsc = orderBy === cellId && order === "asc";
        setOrder(isAsc ? "desc" : "asc");

        // setting the called cell id as order by
        setOrderBy(cellId);
    };

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
                                {sortableHeadCells.map((headCell, index) => (
                                    <SortableTableHeadCell
                                        key={index}
                                        order={order}
                                        orderBy={orderBy}
                                        headCell={headCell}
                                        onRequestSort={() =>
                                            onRequestSort(headCell.id)
                                        }
                                    />
                                ))}
                                {props.isAdmin ? (
                                    <TableCell>Delete</TableCell>
                                ) : null}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {stableSort(
                                props.movies,
                                getComparator(order, orderBy)
                            ).map((movie, index) => {
                                return (
                                    <TableRow
                                        key={index}
                                        onClick={() =>
                                            props.onClickDisplayMovie(movie._id)
                                        }
                                    >
                                        <TableCell>
                                            {movie.posters ? (
                                                <img
                                                    src={
                                                        movie.posters.thumbnail
                                                    }
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
                                            <Typography>
                                                {movie.year === -1
                                                    ? "No Release Year"
                                                    : movie.year}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>
                                                {movie.criticsRating === 0
                                                    ? "No Critics Rating"
                                                    : movie.criticsRating +
                                                      " / 5"}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>
                                                {movie.avgAudienceRating === 0
                                                    ? "No Audience Rating"
                                                    : movie.avgAudienceRating.toFixed(
                                                          1
                                                      ) + " / 5.0"}
                                            </Typography>
                                        </TableCell>
                                        {props.isAdmin ? (
                                            <TableCell>
                                                <IconButton
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        props.onClickDeleteMovie(
                                                            movie._id
                                                        );
                                                    }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        ) : null}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            {props.isAdmin ? (
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

// attributes of props and their type
MovieListComponent.propTypes = {
    onAddMovie: PropTypes.func.isRequired,
    onClickDeleteMovie: PropTypes.func.isRequired,
    onClickDisplayMovie: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool,
    movies: PropTypes.array,
};

export default MovieListComponent;
