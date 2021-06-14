import React, { createContext, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Content } from "react-bulma-components";
import { RoleNavbar } from "./components/RoleNavbar";

import { Index } from "./pages/Index";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";

import { NotFound } from "./pages/NotFound";

import { readStorage, writeStorage } from "./localStorage";

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
        theme: "light",
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
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/signup" component={Signup} />
                        <Route component={NotFound} />
                    </Switch>
                </Content>
            </UserContext.Provider>
        </BrowserRouter>
    );
}

export { App, UserContext };
