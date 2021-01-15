import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import PropTypes from "prop-types";
import CustomTextField from "../components/CustomTextField";

const useStyles = makeStyles((theme) => ({}));

/**
 * For presenting and changing movie details
 * @param {props} props
 */
function ReleaseDates(props) {
    const classes = useStyles();

    return (
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell>Theater</TableCell>
                    <TableCell>
                        <CustomTextField
                            type="date"
                            isEmptyText="No Theater Release"
                            value={
                                props.theaterRelease ? props.theaterRelease : ""
                            }
                            editMode={props.editMode}
                            onChange={(value) =>
                                props.onChangeTheaterRelease(value)
                            }
                        />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Blu-Ray</TableCell>
                    <TableCell>
                        <CustomTextField
                            type="date"
                            isEmptyText="No Bluray Release"
                            value={props.blurayRelase ? props.blurayRelase : ""}
                            editMode={props.editMode}
                            onChange={(value) =>
                                props.onChangeBlurayRelease(value)
                            }
                        />
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
}

// attributes of props and their type
ReleaseDates.propTypes = {
    theaterRelease: PropTypes.any,
    blurayRelase: PropTypes.any,
    editMode: PropTypes.bool,
    onChangeTheaterRelease: PropTypes.func,
    onChangeBlurayRelease: PropTypes.func,
};

export default ReleaseDates;
