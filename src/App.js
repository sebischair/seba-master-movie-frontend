import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import {
    MuiThemeProvider,
    createMuiTheme,
    makeStyles,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import reducers from "./redux/reducers";
import routes from "./routes";
import Header from "./components/Header";
import Footer from "./components/Footer";

const useStyles = makeStyles((theme) => ({
    appRoot: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
    },
}));

function App() {
    const classes = useStyles();

    const theme = createMuiTheme({});
    const store = createStore(reducers, applyMiddleware(thunkMiddleware));

    useEffect(() => {
        document.title = "Movie Example App";
    }, []);

    return (
        <div className={classes.appRoot}>
            <MuiThemeProvider theme={theme}>
                <Provider store={store}>
                    <CssBaseline />
                    <React.Fragment>
                        <Header />
                        <Switch>
                            {routes.map((route, i) => (
                                <Route key={i} {...route} />
                            ))}
                        </Switch>
                        <Footer />
                    </React.Fragment>
                </Provider>
            </MuiThemeProvider>
        </div>
    );
}

export default App;
