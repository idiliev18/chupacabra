import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";
import { Button } from "react-bulma-components";
import { SetupForm } from "../components/SetupForm";

import styles from "./Signup.module.scss";

const PHONE_REGEX = /\+3598[789]\d{7}/;

function Signup() {
    const userContext = useContext(UserContext);
    const [passwordsMatch, setPasswordsMatch] = useState(null);
    const [showPasswordText, setShowPasswordText] = useState(false);
    const [invalidValues, setInvalidValues] = useState({
        passwordMatchText: null,
        phoneNumberText: null,
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        {
            console.log({
                firstName: event.target.firstName.value,
                lastName: event.target.lastName.value,
                email: event.target.email.value,
                telephoneNumber: event.target.telephoneNumber.value,
                password: event.target.password.value,
            });
        }
    };

    const handlePasswordChange = (event) => {
        if (event.target.form.password.value !== "") {
            setInvalidValues((prevState) => {
                return {
                    ...prevState,
                    passwordMatchText:
                        event.target.form.password.value ===
                        event.target.form.confirmPassword.value,
                };
            });
        } else {
            setInvalidValues((prevState) => {
                return {
                    ...prevState,
                    passwordMatchText: null,
                };
            });
        }
    };

    const handleTelephoneNumberChange = (event) => {
        if (event.target.value !== "") {
            setInvalidValues((prevState) => {
                return {
                    ...prevState,
                    phoneNumberText: !!event.target.value.match(PHONE_REGEX),
                };
            });
        } else {
            setInvalidValues((prevState) => {
                return {
                    ...prevState,
                    phoneNumberText: null,
                };
            });
        }
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
                <div className="label">Телефонен номер (по избор)</div>
                <div className="control">
                    <input
                        type="tel"
                        name="telephoneNumber"
                        className={`input ${
                            invalidValues.phoneNumberText === null
                                ? ""
                                : invalidValues.phoneNumberText
                                ? "is-success"
                                : "is-danger"
                        }`}
                        onChange={handleTelephoneNumberChange}
                    />
                </div>
                {invalidValues.phoneNumberText ===
                null ? null : invalidValues.phoneNumberText ? null : (
                    <div className="help is-danger">
                        телефонният номер е невалиден
                    </div>
                )}
            </div>

            <div className="field">
                <label className="label">Парола</label>
                <div className="control">
                    <input
                        type="password"
                        name="password"
                        className="input"
                        placeholder="********"
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
            </div>

            <div className="field">
                <label className="label">Повтори Парола</label>
                <div className="control">
                    <input
                        type="password"
                        name="confirmPassword"
                        className={`input ${
                            invalidValues.passwordMatchText === null
                                ? null
                                : invalidValues.passwordMatchText
                                ? "is-success"
                                : "is-danger"
                        }`}
                        placeholder="********"
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                {invalidValues.passwordMatchText ===
                null ? null : invalidValues.passwordMatchText ? null : (
                    <div className="help is-danger">паролите не съвпадат</div>
                )}
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
