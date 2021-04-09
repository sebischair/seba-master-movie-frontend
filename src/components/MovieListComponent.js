import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Button,
    Divider,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    TableSortLabel,
    TablePagination,
} from "@material-ui/core";
import PropTypes from "prop-types";
import MovieListRow from "./MovieListRow";

// a material ui function. With this way of styling you have the style classes of this component in one place
// and you can access the global theme of the application
const useStyles = makeStyles((theme) => ({
    movieListRoot: {
        padding: theme.spacing(2),
        flex: 1,
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
    image: {
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[2],
    },
}));

/**
 * header cells for sortable table columns
 * @param {props} props
 */
function SortableTableHeadCell(props) {
    const { headCell, order, orderBy, onRequestSort } = props;

    return (
        <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
            align="center"
            width={props.width}
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

// data for sortable table columns
const sortableHeadCells = [
    {
        id: "title",
        label: "Titel",
        width: "40%",
    },
    {
        id: "year",
        label: "Year",
        width: "10%",
    },
    {
        id: "criticsRating",
        label: "Critics Rating",
        width: "15%",
    },
    {
        id: "avgAudienceRating",
        label: "Audience Rating",
        width: "15%",
    },
];

/**
 * Comparator for two objects on a generic property
 * @param {compare object a} a
 * @param {compare object b} b
 * @param {order by property name} orderBy
 * @returns 1 when b > a, -1 when a < b
 */
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

/**
 * Get comparator for sorting table
 * @param {asc or desc} order
 * @param {order by propoerty name} orderBy
 * @returns function that compares two objects
 */
function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

/**
 * Sort array with respect to the initial order of the objects
 * @param {to sort array} array
 * @param {comparator for sorting} comparator
 * @returns sorted array
 */
function stableSort(array, comparator) {
    // include index into the to sortable array objects
    const stabilizedThis = array.map((el, index) => [el, index]);
    // sort the array
    stabilizedThis.sort((a, b) => {
        // compare two array objects a[0] or b[0] refer to the original element of the list a[1] or b[1] would be the initial index
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        // if both objects have the same property value in the order by property, their initial order in the array is maintained
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

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const onRequestSort = (cellId, event) => {
        // if the current orderBy is also the clicked property then the direction of the sorting should be changed
        // otherwise the fist order direction is always ascending
        const isAsc = orderBy === cellId && order === "asc";
        setOrder(isAsc ? "desc" : "asc");

        // setting the called cell id as order by
        setOrderBy(cellId);
    };

    const onChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const onChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div className={classes.movieListRoot}>
            <div className={classes.movieListHeader}>
                <Typography variant="h4" align="center">
                    Welcome to the Movie Database App!
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
                                <TableCell width="10%">Picture</TableCell>
                                {sortableHeadCells.map((headCell, index) => (
                                    <SortableTableHeadCell
                                        key={index}
                                        order={order}
                                        orderBy={orderBy}
                                        headCell={headCell}
                                        onRequestSort={() =>
                                            onRequestSort(headCell.id)
                                        }
                                        width={headCell.width}
                                    />
                                ))}
                                {props.isAdmin ? (
                                    <TableCell align="center">Delete</TableCell>
                                ) : null}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {stableSort(
                                props.movies,
                                getComparator(order, orderBy)
                            )
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((movie, index) => {
                                    return (
                                        <MovieListRow
                                            key={index}
                                            movie={movie}
                                            onClickDisplayMovie={
                                                props.onClickDisplayMovie
                                            }
                                            onClickDeleteMovie={
                                                props.onClickDeleteMovie
                                            }
                                            isAdmin={props.isAdmin}
                                        />
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={props.movies.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={onChangePage}
                    onChangeRowsPerPage={onChangeRowsPerPage}
                />
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
