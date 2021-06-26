import React, {
    Suspense,
    lazy,
    createContext,
    useState,
    useEffect,
} from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";

import { deleteStorage, readStorage, writeStorage } from "./localStorage";
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
const Dashboard = lazy(() => import("./pages/Dashboard"));
const NotFound = lazy(() => import("./pages/NotFound"));
const NeedsAuthentication = lazy(() => import("./pages/NeedsAuthentication"));

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

    useEffect(() => {
        let token = readStorage("auth");

        if (!token) deleteStorage("auth");
        else {
            let isValid = true;

            // TODO: implement token validation

            if (isValid) {
                let updatedState = {
                    userData: {
                        username: "example",
                        email: VALID_EMAIL.email,
                        token,
                    },
                    authenticated: true,
                };

                setState((prevState) => {
                    return { ...prevState, ...updatedState };
                });
            } else {
                deleteStorage("auth");
            }
        }
    }, []);

    const authenticate = async (userData) => {
        console.log("Submitted for authenticating!", userData);
        let responseData = await fetchAPI("/login", userData, "POST");

        if (responseData.type === "login-success") {
            let updatedState = {
                userData: {
                    username: "example",
                    email: VALID_EMAIL.email,
                    token: responseData.data.Token,
                },
                authenticated: true,
            };

            setState((prevState) => {
                return { ...prevState, ...updatedState };
            });

            writeStorage("auth", updatedState.userData.token);

            return { email: true, password: true };
        } else if (responseData.type === "login-failure") {
            return { email: "неправилна имейл или парола" };
        }
    };

    const registerUser = async (userData) => {
        console.log("Submitted for registering!", userData);
        let responseData = await fetchAPI("/register", userData, "POST");

        if (responseData.type === "register-success") {
            let updatedState = {
                userData: {
                    username: "example",
                    email: VALID_EMAIL.email,
                    token: responseData.data.Token,
                },
                authenticated: true,
            };

            setState((prevState) => {
                return { ...prevState, ...updatedState };
            });

            writeStorage("auth", updatedState.userData.token);

            return {};
        } else if (responseData.type === "register-failure") {
            return responseData.fields;
        }
    };

    const invalidateAuthentication = () => {
        if (!state.authenticated) return true;
        else {
            deleteStorage("auth");

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
                        <Content>
                            <Switch>
                                <Route exact path="/dashboard">
                                    {state.authenticated ? (
                                        <Dashboard />
                                    ) : (
                                        <NeedsAuthentication />
                                    )}
                                </Route>

                                <Route path="/">
                                    <RoleNavbar />
                                    <Route exact path="/" component={Index} />
                                    <Route
                                        exact
                                        path="/news"
                                        component={News}
                                    />
                                    {state.authenticated ? (
                                        <Redirect to="/" />
                                    ) : (
                                        <>
                                            <Route
                                                exact
                                                path="/login"
                                                component={Login}
                                            />
                                            <Route
                                                exact
                                                path="/signup"
                                                component={Signup}
                                            />
                                        </>
                                    )}
                                </Route>
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
