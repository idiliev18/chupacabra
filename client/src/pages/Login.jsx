import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import { Button } from "react-bulma-components";
import { SetupForm } from "../components/SetupForm";

import { UserContext } from "../App";

function Login(props) {
    const userContext = useContext(UserContext);
    const [invalidData, setInvalidData] = useState({
        email: null,
        password: null,
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        setInvalidData({ email: null, password: null });

        let success = userContext.authenticate({
            email: event.target.email.value,
            password: event.target.password.value,
            rememberMe: event.target.rememberMe.checked,
        });

        setInvalidData((prevState) => {
            return { ...prevState, ...success };
        });
    };

    return (
        <SetupForm onSubmit={handleSubmit}>
            {userContext.authenticated ? <Redirect to="/" /> : ""}
            <h1>Log In</h1>
            <br />

            <div className="field">
                <label htmlFor="email" className="label">
                    Email
                </label>
                <div className="control">
                    <input
                        className={`input${
                            !invalidData.email && invalidData.email !== null
                                ? " is-danger"
                                : ""
                        }`}
                        type="email"
                        placeholder="example@example.com"
                        name="email"
                    />
                </div>
                {!invalidData.email && invalidData.email !== null ? (
                    <p className="help is-danger">
                        this email did not match our records
                    </p>
                ) : null}
            </div>

            <div className="field">
                <label htmlFor="password" className="label">
                    Password
                </label>
                <div className="control">
                    <input
                        className={`input${
                            !invalidData.password &&
                            invalidData.password !== null
                                ? " is-danger"
                                : ""
                        }`}
                        type="password"
                        placeholder="********"
                        name="password"
                    />
                </div>
                {!invalidData.password && invalidData.password !== null ? (
                    <p className="help is-danger">
                        this password did not match our records
                    </p>
                ) : null}
            </div>

            <div className="field">
                <div className="control">
                    <label htmlFor="rememberMe" className="checkbox">
                        <input type="checkbox" name="rememberMe" /> Remember Me
                    </label>
                </div>
            </div>

            <div className="field">
                <div className="control">
                    <Button
                        color="primary"
                        renderAs="input"
                        type="submit"
                        value="Log In"
                    />
                </div>
            </div>
        </SetupForm>
    );
}

export { Login };
