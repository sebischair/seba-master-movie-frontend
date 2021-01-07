const getUser = () => {
    if (window.localStorage["jwtToken"]) {
        let token = window.localStorage["jwtToken"];
        let base64Url = token.split(".")[1];
        let base64 = base64Url.replace("-", "+").replace("_", "/");
        let userJson = JSON.parse(window.atob(base64));
        return {
            user: {
                _id: userJson._id,
                username: userJson.username,
                role: userJson.role,
            },
        };
    }
    return {};
};

export default function user(state = getUser(), action) {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return { user: action.user };
        case "LOGIN_FAILURE":
            return { error: "Password or username incorrect." };
        case "LOGIN_RESET":
            return {};
        case "LOGOUT":
            return {};
        default:
            console.log(state);
            return state;
    }
}
