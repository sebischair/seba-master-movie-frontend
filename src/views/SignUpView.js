import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect, useSelector } from "react-redux";

import SignUpComponent from "../components/SignUpComponent";

import { register } from "../redux/actions";

/**
 * For register new users
 * @param {props} props
 */
function SignUpView(props) {
    const user = useSelector((state) => state.user);

    const navigate = useNavigate();

    useEffect(() => {
        if (user.user) {
            navigate("/");
        }
    }, [user, props.history]);

    const onRegister = (username, password, isAdmin) => {
        props.dispatch(register(username, password, isAdmin));
    };

    const onCancel = () => {
        navigate("/");
    };

    return (
        <SignUpComponent
            user={user}
            onRegister={onRegister}
            onCancel={onCancel}
        />
    );
}

export default connect()(SignUpView);
