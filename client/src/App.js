import React, { Suspense, lazy, createContext, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { readStorage, writeStorage } from "./localStorage";

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

    const authenticate = (userData) => {
        console.log(userData);
        if (userData.email !== VALID_EMAIL.email) return { email: false };
        else if (userData.password !== VALID_EMAIL.password)
            return { password: false };
        else {
            var updatedState = {
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

            // writeStorage("auth", updatedState.userData.token);

            return { email: true, password: true };
        }
    };

    const createAccount = (userData) => {
        console.log(userData);
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
        <Suspense fallback={<Loading />}>
            <BrowserRouter>
                <UserContext.Provider
                    value={{
                        authenticated: state.authenticated,
                        user: state.userData,
                        authenticate,
                        createAccount,
                        invalidateAuthentication,
                    }}
                >
                    <RoleNavbar />
                    <Content>
                        <Switch>
                            <Route exact path="/" component={Index} />
                            <Route exact path="/news" component={News} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/signup" component={Signup} />
                            <Route component={NotFound} />
                        </Switch>
                    </Content>
                </UserContext.Provider>
            </BrowserRouter>
        </Suspense>
    );
}

export { App, UserContext };
