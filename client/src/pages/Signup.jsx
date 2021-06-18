import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";
import { Button } from "react-bulma-components";
import { SetupForm } from "../components/SetupForm";

import styles from "./Signup.module.scss";

const PHONE_REGEX = /\+3598[789]\d{7}/;
const USERNAME_REGEX =
    /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

function Signup() {
    const userContext = useContext(UserContext);
    const [invalidValues, setInvalidValues] = useState({
        password: null,
        telephoneNumber: null,
        username: null,
    });

    const handleSubmit = (event) => {
        event.preventDefault();

        let allValid = false;
        invalidValues.forEach((val, idx) => {
            if (idx === "telephoneNumber" && val === null) allValid = true;
            else allValid = val;
        });

        if (allValid) {
            let data = {
                firstName: event.target.firstName.value,
                lastName: event.target.lastName.value,
                email: event.target.email.value,
                telephoneNumber: event.target.telephoneNumber.value,
                password: event.target.password.value,
            };
            userContext.registerUser(data);
        }
    };

    const handleInputChange = (event) => {
        console.log(event.target.name);
        let updatedState = {};
        if (event.target.value !== "") {
            switch (event.target.name) {
                case "telephoneNumber": {
                    updatedState["telephoneNumber"] =
                        !!event.target.value.match(PHONE_REGEX);
                    break;
                }
                case "password":
                case "confirmPassword": {
                    updatedState["password"] =
                        event.target.form.password.value ===
                        event.target.form.confirmPassword.value;
                    break;
                }
                case "username": {
                    updatedState["username"] =
                        !!event.target.value.match(USERNAME_REGEX);
                    break;
                }
                default: {
                    break;
                }
            }
        } else {
            if (event.target.name === "confirmPassword")
                updatedState["password"] = null;
            else updatedState[event.target.name] = null;
        }

        setInvalidValues((prevState) => {
            return { ...prevState, ...updatedState };
        });
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
                        placeholder="Янко"
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
                        placeholder="qnko0123"
                        onChange={handleInputChange}
                        required
                    />
                </div>
                {invalidValues.username ===
                null ? null : invalidValues.username ? null : (
                    <div className="help is-danger">
                        невалидно потребителско име
                    </div>
                )}
            </div>

            <div className="field">
                <label className="label">Имейл</label>
                <div className="control">
                    <input
                        type="text"
                        name="email"
                        className="input"
                        placeholder="qnko_goshov@abv.bg"
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
                            invalidValues.telephoneNumber === null
                                ? ""
                                : invalidValues.telephoneNumber
                                ? "is-success"
                                : "is-danger"
                        }`}
                        onChange={handleInputChange}
                    />
                </div>
                {invalidValues.telephoneNumber ===
                null ? null : invalidValues.telephoneNumber ? null : (
                    <div className="help is-danger">
                        телефонният номер е невалиден (пробвайте с +359)
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
                        onChange={handleInputChange}
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
                            invalidValues.password === null
                                ? ""
                                : invalidValues.password
                                ? "is-success"
                                : "is-danger"
                        }`}
                        placeholder="********"
                        onChange={handleInputChange}
                        required
                    />
                </div>
                {invalidValues.password ===
                null ? null : invalidValues.password ? null : (
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

export default Signup;
