import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Typography } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from "@material-ui/pickers";
import TodayIcon from "@material-ui/icons/Today";

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

    return (props.value === "" || !props.value || props.value === null) &&
        !props.editMode ? (
        // if no value is given return the given text
        <TextField
            value={props.isEmptyText}
            disabled={true}
            variant="standard"
            InputProps={{
                className: classes.inputBase,
                disableUnderline: true,
            }}
            inputProps={{
                className: classes.input,
            }}
            {...props.furtherProps}
        />
    ) : props.type !== "date" ? (
        // return a standard textfield
        <TextField
            value={
                props.editMode
                    ? props.value
                    : props.value + (props.suffix ? " " + props.suffix : "")
            }
            onChange={(e) =>
                props.onChange ? props.onChange(e.target.value) : null
            }
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
    ) : (
        // if the field has a value and the type is date return a datepicker
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                format="dd.MM.yyyy"
                value={props.value}
                readOnly={!props.editMode}
                keyboardIcon={props.editMode ? <TodayIcon /> : null}
                variant={props.editMode ? "outlined" : "standard"}
                InputProps={{
                    className: classes.inputBase,
                    disableUnderline: true,
                }}
                inputProps={{
                    className: classes.input,
                }}
                {...props.furtherProps}
                onChange={(date) =>
                    props.onChange ? props.onChange(date) : null
                }
                invalidDateMessage=""
                //onChange={onChangeDate}
                KeyboardButtonProps={{
                    "aria-label": "change date",
                }}
            />
        </MuiPickersUtilsProvider>
    );
}

// attributes of props and their type
CustomTextField.propTypes = {
    align: PropTypes.string,
    variant: PropTypes.string,
    editMode: PropTypes.bool,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    furtherProps: PropTypes.any,
};

export default CustomTextField;
