import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Button, TextField, Typography } from "@material-ui/core";
import { connect, useSelector } from "react-redux";

import { login } from "../redux/actions";

const useStyles = makeStyles((theme) => ({
    userLoginRoot: {
        margin: "auto",
    },
    loginPaper: {
        width: "500px",
        padding: theme.spacing(2),
    },
    loginRow: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        "&:last-child": {
            paddingBottom: theme.spacing(0),
        },
        "&:first-child": {
            paddingTop: theme.spacing(0),
        },
    },
    loginButtons: {
        display: "flex",
        justifyContent: "space-between",
    },
    loginButton: {
        marginLeft: theme.spacing(1),
    },
}));

/**
 * For user login
 * @param {props} props
 */
function UserLoginView(props) {
    const classes = useStyles();

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const [loginError, setLoginError] = React.useState("");

    const user = useSelector((state) => state.user);

    useEffect(() => {
        if (user.user) {
            props.history.push("/");
        }
        if (user.error) {
            setLoginError(user.error);
        } else {
            setLoginError("");
        }
    }, [user]);

    const onLogin = (e) => {
        e.preventDefault();
        props.dispatch(login(username, password));
    };

    const onCancel = () => {
        props.history.push("/");
    };

    const onSignUp = () => {
        props.history.push("/register");
    };

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
        setLoginError("");
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
        setLoginError("");
    };

    return (
        <div className={classes.userLoginRoot}>
            <Paper className={classes.loginPaper} component="form">
                <div className={classes.loginRow}>
                    <TextField
                        label="Username"
                        fullWidth
                        value={username}
                        onChange={onChangeUsername}
                        error={loginError !== ""}
                    />
                </div>
                <div className={classes.loginRow}>
                    <TextField
                        label="Password"
                        fullWidth
                        value={password}
                        onChange={onChangePassword}
                        error={loginError !== ""}
                        type="password"
                    />
                </div>
                {loginError !== "" ? (
                    <div className={classes.loginRow}>
                        <Typography color="error">{loginError}</Typography>
                    </div>
                ) : null}
                <div className={classes.loginRow + " " + classes.loginButtons}>
                    <Button onClick={onSignUp}>Not Registered yet?</Button>
                    <div>
                        <Button
                            className={classes.loginButton}
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            className={classes.loginButton}
                            variant="contained"
                            color="primary"
                            onClick={onLogin}
                            disabled={username === "" || password === ""}
                            type="submit"
                        >
                            Login
                        </Button>
                    </div>
                </div>
            </Paper>
        </div>
    );
}

export default connect()(withRouter(UserLoginView));
