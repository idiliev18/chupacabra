import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";
import { Button } from "react-bulma-components";
import { SetupForm } from "../components/SetupForm";

import styles from "./Signup.module.scss";

function Signup() {
    const userContext = useContext(UserContext);
    const [invalidText, setInvalidText] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <SetupForm onSubmit={handleSubmit}>
            <h1>Регистрация</h1>
            <br />

            <div className="field is-flex">
                <div className={"control " + styles.control}>
                    <label className="label">Първо име</label>
                    <input
                        type="text"
                        name="firstName"
                        className="input"
                        placeholder="Георги"
                        required
                    />
                </div>
                <div className={"control " + styles.control}>
                    <label className="label">Фамилия</label>
                    <input
                        type="text"
                        name="lastName"
                        className="input"
                        placeholder="Георгиев"
                        required
                    />
                </div>
            </div>

            <div className="field">
                <label className="label">Потребителско име</label>
                <div className="control">
                    <input
                        type="text"
                        name="username"
                        className="input"
                        placeholder="qnko01_"
                        required
                    />
                </div>
            </div>

            <div className="field">
                <label className="label">Имейл</label>
                <div className="control">
                    <input
                        type="text"
                        name="email"
                        className="input"
                        placeholder="gosho_qnko@abv.bg"
                        required
                    />
                </div>
            </div>

            <div className="field">
                <label className="label">Парола</label>
                <div className="control">
                    <input
                        type="text"
                        name="password"
                        className="input"
                        placeholder="********"
                        required
                    />
                </div>
            </div>

            <div className="field">
                <label className="label">Повтори Парола</label>
                <div className="control">
                    <input
                        type="text"
                        name="password"
                        className="input"
                        placeholder="********"
                        required
                    />
                </div>
            </div>

            <div className="field">
                <p>
                    Имате регистрация? <Link to="/login">Влизане</Link>
                </p>
            </div>

            <div className="field">
                <Button
                    color="primary"
                    renderAs="input"
                    type="submit"
                    value="Регистрация"
                ></Button>
            </div>
        </SetupForm>
    );
}

export { Signup };
