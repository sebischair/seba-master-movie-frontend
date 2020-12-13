import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Button,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@material-ui/core";
import PropTypes from "prop-types";
import CustomTextField from "../components/CustomTextField";
import CustomChip from "../components/CustomChip";
import DetailsArea from "../components/DetailsArea";
import MovieCast from "./MovieCast";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    flexCol: {
        display: "flex",
        flexDirection: "column",
    },
    flexRow: {
        display: "flex",
        flexDirection: "row",
    },
    flex: {
        flex: 1,
    },
    flexEnd: {
        justifyContent: "flex-end",
    },
    marginSides: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    center: {
        margin: "auto",
    },
    padding: {
        padding: theme.spacing(2),
    },
    pageArea: {
        paddingBottom: theme.spacing(2),
        "&:last-child": {
            paddingBottom: 0,
        },
    },
    title: {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(2),
    },
    barMinHeight: {
        minHeight: theme.spacing(5),
    },
}));

/**
 * For presenting and changing movie details
 * @param {props} props
 */
function MovieDetailsComponent(props) {
    const classes = useStyles();

    const [movieTitle, setMovieTitle] = React.useState("");
    const [movieSynopsis, setMovieSynopsis] = React.useState("");
    const [movieCast, setMovieCast] = React.useState([]);
    const [movieAgeRating, setMovieAgeRating] = React.useState("");
    const [movieRuntime, setMovieRuntime] = React.useState("");
    const [movieYear, setMovieYear] = React.useState("");
    const [criticsRating, setCriticsRating] = React.useState("");
    const [criticsScore, setCriticsScore] = React.useState("");
    const [audienceRating, setAudienceRating] = React.useState("");
    const [audienceScore, setAudienceScore] = React.useState("");
    const [theaterRelease, setTheaterRelease] = React.useState("");
    const [dvdRelease, setDvdRelease] = React.useState("");

    // for extracting the attributes of the given movie to the approriate state variables
    const extractMovie = () => {
        if (!props.movie) {
            return;
        }
        setMovieTitle(props.movie.title);
        setMovieSynopsis(props.movie.synopsis);
        setMovieCast(JSON.parse(JSON.stringify(props.movie.actors)));
        setMovieAgeRating(props.movie.mpaa_rating);
        setMovieRuntime(props.movie.runtime);
        setMovieYear(props.movie.year);
        setCriticsRating(props.movie.ratings.critics_rating);
        setCriticsScore(props.movie.ratings.critics_score);
        setAudienceRating(props.movie.ratings.audience_rating);
        setAudienceScore(props.movie.ratings.audience_score);
        setTheaterRelease(props.movie.release_dates.theater);
        setDvdRelease(props.movie.release_dates.dvd);
    };

    // creating a object with all relevant data to update or create a changed movie
    const packMovie = () => {
        let back = { ratings: {}, release_dates: {}, ...props.movie };

        back.title = movieTitle;
        back.synopsis = movieSynopsis;
        back.actors = movieCast;
        back.mpaa_rating = movieAgeRating;
        back.runtime = movieRuntime;
        back.year = movieYear;
        back.ratings.critics_rating = criticsRating;
        back.ratings.critics_score = criticsScore;
        back.ratings.audience_rating = audienceRating;
        back.ratings.audience_score = audienceScore;
        back.release_dates.theater = theaterRelease;
        back.release_dates.dvd = dvdRelease;
        return back;
    };

    // triggers when a new movie is given to this component or the new parameter is changed
    useEffect(() => {
        if (!props.new) {
            extractMovie();
        }
    }, [props.movie, props.new]);

    // triggers when the new parameter is changed and setts the edit mode to true
    useEffect(() => {
        if (props.new) {
            setEditMode(true);
        }
    }, [props.new]);

    // indicates whether the movie can be changed
    const [editMode, setEditMode] = React.useState(null);

    // props for all grid items used below in the JSX
    const girdItemProps = {
        item: true,
        className: classes.padding,
    };

    // ----------------------------------------------------------------------------------------------------
    // on change functions

    const onChangeTitle = (value) => {
        setMovieTitle(value);
    };

    const onChangeSynopsis = (value) => {
        setMovieSynopsis(value);
    };

    const onChangeRuntime = (value) => {
        setMovieRuntime(value);
    };

    const onChangeAgeRating = (value) => {
        setMovieAgeRating(value);
    };

    const onChangeYear = (value) => {
        setMovieYear(value);
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };
    // ----------------------------------------------------------------------------------------------------

    // for cast
    const onAddCastMember = (castMember) => {
        movieCast.push(castMember);
        setMovieCast([...movieCast]);
    };

    // for cast
    const onRemoveCastMember = (index) => {
        movieCast.splice(index, 1);
        setMovieCast([...movieCast]);
    };

    // cancel is called, functionality differs whether it is a new movie or not
    const onCancel = () => {
        if (props.new) {
            props.history.push("/");
        } else {
            setEditMode(false);
            extractMovie();
        }
    };

    // save is called, functionality differs whether it is a new movie or not
    const onSave = () => {
        if (props.new) {
            props.onCreate(packMovie());
        } else {
            setEditMode(false);
            props.onSave(packMovie());
        }
    };

    return (
        <div
            className={
                classes.flexCol +
                " " +
                classes.padding +
                " " +
                classes.center +
                " " +
                classes.flex
            }
        >
            {/* Admin Buttons */}
            <div
                className={
                    classes.flexRow +
                    " " +
                    classes.flexEnd +
                    " " +
                    classes.barMinHeight
                }
            >
                {editMode ? (
                    <React.Fragment>
                        <Button
                            onClick={onCancel}
                            variant="contained"
                            color="primary"
                            className={classes.marginSides}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={onSave}
                            variant="contained"
                            color="primary"
                            className={classes.marginSides}
                            disabled={props.new && movieTitle === ""}
                        >
                            {props.new ? "Create" : "Save"}
                        </Button>
                    </React.Fragment>
                ) : (
                    <Button
                        onClick={(e) => setEditMode(true)}
                        variant="contained"
                        color="primary"
                        className={classes.marginSides}
                        disabled={!props.isLoggedIn}
                    >
                        Edit
                    </Button>
                )}
            </div>

            {/* Movie Title */}
            <div className={classes.pageArea + " " + classes.title}>
                <CustomTextField
                    value={movieTitle}
                    editMode={editMode}
                    furtherProps={{
                        fullWidth: true,
                    }}
                    align="center"
                    variant="h4"
                    onChange={onChangeTitle}
                />
            </div>

            {/* Runtime, Year and MPAA as Chips */}
            <Grid container justify="center" className={classes.pageArea}>
                <Grid {...girdItemProps}>
                    <CustomChip
                        content={movieRuntime}
                        caption="Runtime"
                        suffix="Minutes"
                        editMode={editMode}
                        onChange={onChangeRuntime}
                    />
                </Grid>
                <Grid {...girdItemProps}>
                    <CustomChip
                        content={movieYear}
                        caption="Year"
                        editMode={editMode}
                        onChange={onChangeYear}
                    />
                </Grid>
                <Grid {...girdItemProps}>
                    <CustomChip
                        content={movieAgeRating}
                        caption="MPAA"
                        editMode={editMode}
                        onChange={onChangeAgeRating}
                    />
                </Grid>
            </Grid>

            {/* More detail data of the movie, grouped in DetailsArea.js for a consistent look */}
            <Grid container>
                {/* Synopsis */}
                <Grid xl={6} lg={6} md={6} ms={12} xs={12} {...girdItemProps}>
                    <DetailsArea
                        title="Synopsis"
                        content={
                            <CustomTextField
                                value={movieSynopsis}
                                editMode={editMode}
                                furtherProps={{
                                    multiline: true,
                                    fullWidth: true,
                                }}
                                onChange={onChangeSynopsis}
                            />
                        }
                    />
                </Grid>

                {/* Ratings */}
                <Grid xl={6} lg={6} md={6} ms={12} xs={12} {...girdItemProps}>
                    <DetailsArea
                        title="Ratings"
                        content={
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Audience</TableCell>
                                        <TableCell>
                                            <CustomTextField
                                                value={
                                                    audienceRating
                                                        ? audienceRating
                                                        : ""
                                                }
                                                suffix={
                                                    !audienceRating ||
                                                    audienceRating === ""
                                                        ? "No Audience Rating"
                                                        : ""
                                                }
                                                editMode={editMode}
                                                onChange={(value) =>
                                                    setAudienceRating(value)
                                                }
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <CustomTextField
                                                value={
                                                    audienceScore
                                                        ? audienceScore
                                                        : ""
                                                }
                                                suffix={
                                                    !audienceScore ||
                                                    audienceScore === ""
                                                        ? "No Audience Score"
                                                        : ""
                                                }
                                                editMode={editMode}
                                                onChange={(value) =>
                                                    setAudienceScore(value)
                                                }
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Critics</TableCell>
                                        <TableCell>
                                            <CustomTextField
                                                value={
                                                    criticsRating
                                                        ? criticsRating
                                                        : ""
                                                }
                                                suffix={
                                                    !criticsRating ||
                                                    criticsRating === ""
                                                        ? "No Critics Rating"
                                                        : ""
                                                }
                                                editMode={editMode}
                                                onChange={(value) =>
                                                    setCriticsRating(value)
                                                }
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <CustomTextField
                                                value={
                                                    criticsScore
                                                        ? criticsScore
                                                        : ""
                                                }
                                                suffix={
                                                    !criticsScore ||
                                                    criticsScore === ""
                                                        ? "No Critics Score"
                                                        : ""
                                                }
                                                editMode={editMode}
                                                onChange={(value) =>
                                                    setCriticsScore(value)
                                                }
                                            />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        }
                    />
                </Grid>

                {/* Release Dates */}
                <Grid xl={6} lg={6} md={6} ms={12} xs={12} {...girdItemProps}>
                    <DetailsArea
                        title="Release Dates"
                        content={
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Theater</TableCell>
                                        <TableCell>
                                            <CustomTextField
                                                value={
                                                    theaterRelease
                                                        ? theaterRelease
                                                        : ""
                                                }
                                                suffix={
                                                    !theaterRelease ||
                                                    theaterRelease === ""
                                                        ? "No Theater Release"
                                                        : ""
                                                }
                                                editMode={editMode}
                                                onChange={(value) =>
                                                    setTheaterRelease(value)
                                                }
                                            />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>DVD</TableCell>
                                        <TableCell>
                                            <CustomTextField
                                                value={
                                                    dvdRelease ? dvdRelease : ""
                                                }
                                                suffix={
                                                    !dvdRelease ||
                                                    dvdRelease === ""
                                                        ? "No DVD Release"
                                                        : ""
                                                }
                                                editMode={editMode}
                                                onChange={(value) =>
                                                    setDvdRelease(value)
                                                }
                                            />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        }
                    />
                </Grid>

                {/* Cast */}
                <Grid xl={6} lg={6} md={6} ms={12} xs={12} {...girdItemProps}>
                    <DetailsArea
                        title="Starring"
                        content={
                            <MovieCast
                                movieCast={movieCast}
                                editMode={editMode}
                                toggleEditMode={toggleEditMode}
                                onAddCastMember={onAddCastMember}
                                onRemoveCastMember={onRemoveCastMember}
                                isLoggedIn={props.isLoggedIn}
                            />
                        }
                    />
                </Grid>
            </Grid>
        </div>
    );
}

// attributes of props and their type
MovieDetailsComponent.propTypes = {
    movie: PropTypes.object,
    new: PropTypes.bool,
    onCreate: PropTypes.func,
    onSave: PropTypes.func,
};

// withRouter() allows accsing the necessary functionality to navigate from this component
export default withRouter(MovieDetailsComponent);
