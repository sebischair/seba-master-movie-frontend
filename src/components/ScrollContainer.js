import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    scrollContainerRoot: {
        height: "100%",
        width: "100%",
        position: "relative",
    },
    wrapper: {
        height: "100%",
        width: "100%",
        flexWrap: "nowrap",
        flex: "1 1 auto",
        position: "absolute",
        overflowY: "scroll",
        display: "flex",
        flexDirection: "column",
    },
}));

/**
 * For having an internal scroll container
 * @param {props} props
 */
function ScrollContainer(props) {
    const classes = useStyles();

    return (
        <div className={classes.scrollContainerRoot}>
            <div className={classes.wrapper}>{props.children}</div>
        </div>
    );
}

export default ScrollContainer;
