import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    flexCol: {
        display: "flex",
        flexDirection: "column",
    },
    padding: {
        padding: theme.spacing(2),
    },
    border: {
        borderStyle: "solid",
        borderColor: theme.palette.primary.main,
    },
}));

/**
 * Container for presenting complex movie data
 * @param {props} props
 */
function DetailsArea(props) {
    const classes = useStyles();

    return (
        <Paper
            className={
                classes.flexCol + " " + classes.padding + " " + classes.border
            }
        >
            <Typography variant="h5">{props.title}</Typography>
            <div className={classes.padding}>{props.content}</div>
        </Paper>
    );
}

// attributes of props and their type
DetailsArea.propTypes = {
    content: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
};

export default DetailsArea;
