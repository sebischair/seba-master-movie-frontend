import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({}));

/**
 * For presenting and changing movie details
 * @param {props} props
 */
function Ratings(props) {
    const classes = useStyles();

    return (
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell>Critics</TableCell>
                    <TableCell>
                        <Rating
                            value={props.criticsRating}
                            onChange={(e, value) =>
                                props.onChangeCriticsRating(value)
                            }
                            readOnly={!props.editMode}
                            name="critics-rating"
                        />
                    </TableCell>
                </TableRow>

                <TableRow>
                    <TableCell>Audience</TableCell>
                    <TableCell>
                        <Rating
                            value={props.avgAudienceRating}
                            onChange={(e, value) =>
                                props.onChangeOwnRating(value)
                            }
                            readOnly={props.isAdmin}
                            name="audience-rating"
                        />
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}

// attributes of props and their type
Ratings.propTypes = {
    criticsRating: PropTypes.number,
    avgAudienceRating: PropTypes.number,
    editMode: PropTypes.bool,
    onChangeCriticsRating: PropTypes.func,
    onChangeOwnRating: PropTypes.func,
};

export default Ratings;
