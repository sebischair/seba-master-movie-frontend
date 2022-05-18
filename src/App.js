import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import {
  MuiThemeProvider,
  createTheme,
  makeStyles,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import ScrollContainer from "./components/ScrollContainer";

import reducers from "./redux/reducers";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AppTheme from "./theming/themetypes";
import AppThemeOptions from "./theming/themes";
import MovieListView from "./views/MovieListView";
import UserLoginView from "./views/UserLoginView";
import SignUpView from "./views/SignUpView";
import MovieDetailsView from "./views/MovieDetailsView";

const useStyles = makeStyles((theme) => ({
  appRoot: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
}));

function App() {
  const classes = useStyles();

  // set document title
  useEffect(() => {
    document.title = "Movie Database App";
  }, []);

  // create store for redux
  const store = createStore(reducers, applyMiddleware(thunkMiddleware));

  // theme for app
  const [theme, setTheme] = React.useState(AppTheme.LIGHT);

  // toggle theme
  const toggleTheme = () => {
    setTheme(theme === AppTheme.LIGHT ? AppTheme.DARK : AppTheme.LIGHT);
  };

  return (
    <div className={classes.appRoot}>
      <MuiThemeProvider theme={createTheme(AppThemeOptions[theme])}>
        <Provider store={store}>
          <CssBaseline />
          <React.Fragment>
            <Header
              darkmode={theme === AppTheme.DARK}
              toggletheme={toggleTheme}
            />
            <ScrollContainer>
              <Routes>
                <Route path="/" element={<MovieListView />} />
                <Route path="/movie/:id" element={<MovieDetailsView />} />
                <Route path="/login" element={<UserLoginView />} />
                <Route path="/register" element={<SignUpView />} />
              </Routes>
              <Footer />
            </ScrollContainer>
          </React.Fragment>
        </Provider>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
