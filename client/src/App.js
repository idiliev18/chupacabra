import React, { Suspense, lazy, createContext, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";

import { readStorage, writeStorage } from "./localStorage";
import { fetchAPI } from "./api";

import Loading from "./components/Loading";

const Content = lazy(() =>
    import("react-bulma-components/esm/components/content/content")
);
const RoleNavbar = lazy(() => import("./components/RoleNavbar"));

const Index = lazy(() => import("./pages/Index"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const News = lazy(() => import("./pages/News"));
const NotFound = lazy(() => import("./pages/NotFound"));

const UserContext = createContext();

const VALID_EMAIL = {
    email: "example@example.com",
    password: "12341234",
};

const VALID_TOKEN = "40eeff8a-88b6-42dd-995c-a25ee81fc874";

function App() {
    const [state, setState] = useState({
        authenticated: false,
        userData: null,
    });

    // TODO: Implement backend communication
    const authenticate = async (userData) => {
        return new Promise((res, rej) => {
            console.log("Submitted for authenticating!", userData);
            if (userData.email !== VALID_EMAIL.email)
                setTimeout(() => res({ email: false }), 1000);
            else if (userData.password !== VALID_EMAIL.password)
                setTimeout(() => res({ password: false }), 1000);
            else {
                // writeStorage("auth", updatedState.userData.token);

                setTimeout(() => {
                    res({ email: true, password: true });
                    let updatedState = {
                        userData: {
                            username: "example",
                            email: "example@example.com",
                            token: VALID_TOKEN,
                        },
                        authenticated: true,
                    };

                    setState((prevState) => {
                        return { ...prevState, ...updatedState };
                    });
                }, 1000);
            }
        });
    };

    const registerUser = async (userData) => {
        console.log("Submitted for registering!", userData);
        let responseData = await fetchAPI("/register", userData, "POST");
        console.log(responseData);

        return;
    };

    const invalidateAuthentication = () => {
        console.log(localStorage);
        if (!state.authenticated) return true;
        else {
            setState({
                userData: null,
                authenticated: false,
            });
        }
    };

    return (
        <ErrorBoundary>
            <Suspense fallback={<Loading />}>
                <BrowserRouter>
                    <UserContext.Provider
                        value={{
                            authenticated: state.authenticated,
                            user: state.userData,
                            authenticate,
                            registerUser,
                            invalidateAuthentication,
                        }}
                    >
                        <RoleNavbar />
                        <Content>
                            <Switch>
                                <Route exact path="/" component={Index} />
                                <Route exact path="/news" component={News} />
                                <Route exact path="/login" component={Login} />
                                <Route
                                    exact
                                    path="/signup"
                                    component={Signup}
                                />
                                <Route component={NotFound} />
                            </Switch>
                        </Content>
                    </UserContext.Provider>
                </BrowserRouter>
            </Suspense>
        </ErrorBoundary>
    );
}

export { App, UserContext };
