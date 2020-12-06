import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    loadingRoot: {
        display: "flex",
        width: "100%",
        height: "100%",
    },
    loadingContent: {
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
}));

/**
 * Loading screen
 * @param {props} props
 */
function Loading(props) {
    const classes = useStyles();

    return (
        <div className={classes.loadingRoot}>
            <div className={classes.loadingContent}>
                <CircularProgress />
                <Typography align="center">Loading ... </Typography>
            </div>
        </div>
    );
}

export default Loading;
