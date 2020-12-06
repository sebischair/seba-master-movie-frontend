import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

/**
 * component for changing movie attributes at the same place where they are displayed
 * @param {props} props
 */
function CustomTextField(props) {
    // by moving the styles inside the functional component the props can influence the style
    const useStyles = makeStyles((theme) => ({
        inputBase: {
            padding: theme.spacing(1),
            color: "inherit !important",
        },
        input: {
            padding: theme.spacing(0),
            textAlign: props.align ? props.align : "left",
            fontSize: props.variant
                ? theme.typography[props.variant].fontSize
                : theme.typography.fontSize,
            color: "inherit",
        },
    }));

    const classes = useStyles();

    return (
        <TextField
            value={
                props.editMode
                    ? props.value
                    : props.value + (props.suffix ? " " + props.suffix : "")
            }
            onChange={(e) => props.onChange(e.target.value)}
            disabled={!props.editMode}
            variant={props.editMode ? "outlined" : "standard"}
            InputProps={{
                className: classes.inputBase,
                disableUnderline: true,
            }}
            inputProps={{
                className: classes.input,
            }}
            {...props.furtherProps}
        />
    );
}

export default CustomTextField;
