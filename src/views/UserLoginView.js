import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import LoginComponent from "../components/UserLoginComponent";

import { login } from "../redux/actions";

/**
 * For user login
 * @param {props} props
 */
function UserLoginView(props) {
    const user = useSelector((state) => state.user);

    useEffect(() => {
        if (user.user) {
            props.history.push("/");
        }
    }, [user, props.history]);

    const onLogin = (username, password) => {
        props.dispatch(login(username, password));
    };

    const onCancel = () => {
        props.history.push("/");
    };

    const onSignUp = () => {
        props.history.push("/register");
    };

    return (
        <LoginComponent
            user={user}
            onCancel={onCancel}
            onLogin={onLogin}
            onSignUp={onSignUp}
        />
    );
}

export default connect()(withRouter(UserLoginView));
