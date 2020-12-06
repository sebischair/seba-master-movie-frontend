import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import CustomTextField from "../components/CustomTextField";

const useStyles = makeStyles((theme) => ({
    flexCol: {
        display: "flex",
        flexDirection: "column",
    },
    customChip: {
        background: theme.palette.primary.main,
        borderRadius: theme.shape.borderRadius,
        color: theme.palette.primary.contrastText,
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
}));

/**
 * for presenting simple data of the movie
 * @param {props} props
 */
function CustomChip(props) {
    const classes = useStyles();

    return (
        <div className={classes.flexCol + " " + classes.customChip}>
            {Array.isArray(props.content) ? (
                props.content.map((elem) => (
                    <CustomTextField
                        value={elem.value}
                        suffix={props.suffix}
                        editMode={props.editMode}
                        align="center"
                        onChange={(value) => props.onChange(value, elem.type)}
                        variant="h6"
                    />
                ))
            ) : (
                <CustomTextField
                    value={props.content}
                    suffix={props.suffix}
                    editMode={props.editMode}
                    align="center"
                    onChange={props.onChange}
                    variant="h6"
                />
            )}
            <Typography variant="caption" align="center">
                {props.caption}
            </Typography>
        </div>
    );
}

export default CustomChip;
