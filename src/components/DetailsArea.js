import React from "react";
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
}));

/**
 * Container for presenting complex movie data
 * @param {props} props
 */
function DetailsArea(props) {
    const classes = useStyles();

    return (
        <Paper className={classes.flexCol + " " + classes.padding}>
            <Typography variant="h5">{props.title}</Typography>
            <div className={classes.padding}>{props.content}</div>
        </Paper>
    );
}

export default DetailsArea;
