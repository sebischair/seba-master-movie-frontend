import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
    Tooltip,
    Typography,
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import PropTypes from "prop-types";
import CustomTextField from "../components/CustomTextField";

const useStyles = makeStyles((theme) => ({
    flexCol: {
        display: "flex",
        flexDirection: "column",
    },
    flexRow: {
        display: "flex",
        flexDirection: "row",
    },
    justifySpaceBetween: {
        justifyContent: "space-between",
    },
    margin: {
        margin: theme.spacing(1),
    },
    image: {
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[2],
    },
}));

/**
 * For presenting and changing movie details
 * @param {props} props
 */
function Synopsis(props) {
    const classes = useStyles();

    return props.editMode ? (
        <div className={classes.flexCol}>
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <div
                                className={
                                    classes.flexRow +
                                    " " +
                                    classes.justifySpaceBetween
                                }
                            >
                                <Typography variant="body2">
                                    Thumbnail
                                </Typography>
                                <Tooltip
                                    title="Please enter the link to the image."
                                    interactive
                                >
                                    <InfoIcon />
                                </Tooltip>
                            </div>
                        </TableCell>
                        <TableCell>
                            <CustomTextField
                                value={props.moviethumbnail}
                                editMode={props.editMode}
                                furtherProps={{
                                    fullWidth: true,
                                }}
                                onChange={props.onChangeThumbnail}
                            />
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell>Synopsis</TableCell>
                        <TableCell>
                            <CustomTextField
                                value={props.movieSynopsis}
                                editMode={props.editMode}
                                furtherProps={{
                                    multiline: true,
                                    fullWidth: true,
                                }}
                                onChange={props.onChangeSynopsis}
                                isEmptyText="tba"
                            />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    ) : (
        <div className={classes.flexRow}>
            <div>
                <img
                    src={props.moviethumbnail}
                    className={classes.margin + " " + classes.image}
                />
            </div>
            <CustomTextField
                value={props.movieSynopsis}
                editMode={props.editMode}
                furtherProps={{
                    multiline: true,
                    fullWidth: true,
                }}
                onChange={props.onChangeSynopsis}
                isEmptyText="tba"
            />
        </div>
    );
}

// attributes of props and their type
Synopsis.propTypes = {
    moviethumbnail: PropTypes.string,
    movieSynopsis: PropTypes.string,
    editMode: PropTypes.bool,
    onChangeThumbnail: PropTypes.func,
    onChangeSynopsis: PropTypes.func,
};

export default Synopsis;
