import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, TableCell, TableRow, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import ImageIcon from "@material-ui/icons/Image";
import DeleteIcon from "@material-ui/icons/Delete";
import { Rating } from "@material-ui/lab";

// a material ui function. With this way of styling you have the style classes of this component in one place
// and you can access the global theme of the application
const useStyles = makeStyles((theme) => ({
    image: {
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[2],
    },
}));

/**
 * For presenting and changing movies
 * @param {props} props
 */
function MovieListRow(props) {
    // with this you can access the above defiend style classes
    const classes = useStyles();

    return (
        <TableRow
            key={props.movie._id}
            onClick={() => props.onClickDisplayMovie(props.movie._id)}
            height="118px"
        >
            <TableCell>
                {props.movie.posters ? (
                    <img
                        src={props.movie.posters.thumbnail}
                        alt="Movie Thumbnail"
                        className={classes.image}
                    />
                ) : (
                    <ImageIcon />
                )}
            </TableCell>
            <TableCell>
                <Typography variant="h6">{props.movie.title}</Typography>
            </TableCell>
            <TableCell>
                <Typography>
                    {props.movie.year === -1
                        ? "No Release Year"
                        : props.movie.year}
                </Typography>
            </TableCell>
            <TableCell>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    {!props.movie.criticsRating ||
                    props.movie.criticsRating === 0 ? (
                        <Typography align="center">
                            No Critics Rating
                        </Typography>
                    ) : (
                        <React.Fragment>
                            <Rating
                                value={props.movie.criticsRating}
                                readOnly
                                name="critics-rating"
                            />
                            {props.movie.criticsRating.toFixed(1) + " / 5.0"}
                        </React.Fragment>
                    )}
                </div>
            </TableCell>
            <TableCell>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    {!props.movie.avgAudienceRating ||
                    props.movie.avgAudienceRating === 0 ? (
                        <Typography align="center">
                            No Audience Rating
                        </Typography>
                    ) : (
                        <React.Fragment>
                            <Rating
                                value={props.movie.avgAudienceRating}
                                readOnly
                                name="audience-rating"
                            />
                            {props.movie.avgAudienceRating.toFixed(1) +
                                " / 5.0"}
                        </React.Fragment>
                    )}
                </div>
            </TableCell>
            {props.isAdmin ? (
                <TableCell>
                    <IconButton
                        onClick={(e) => {
                            e.stopPropagation();
                            props.onClickDeleteMovie(props.movie._id);
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            ) : null}
        </TableRow>
    );
}

// attributes of props and their type
MovieListRow.propTypes = {
    movie: PropTypes.object,
    onClickDisplayMovie: PropTypes.func,
    onClickDeleteMovie: PropTypes.func,
    isAdmin: PropTypes.bool,
};

export default MovieListRow;
