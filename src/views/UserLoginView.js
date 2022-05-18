import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import LoginComponent from "../components/UserLoginComponent";

import { login } from "../redux/actions";

/**
 * For user login
 * @param {props} props
 */
function UserLoginView(props) {
    const user = useSelector((state) => state.user);

    const navigate = useNavigate();

    useEffect(() => {
        if (user.user) {
            navigate("/");
        }
    }, [user]);

    const onLogin = (username, password) => {
        props.dispatch(login(username, password));
    };

    const onCancel = () => {
        navigate("/");
    };

    const onSignUp = () => {
        navigate("/register");
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

export default connect()(UserLoginView);
