import React, {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";
import { Button } from "react-bulma-components";
import { SetupForm } from "../components/SetupForm";

import styles from "./Signup.module.scss";

const PHONE_REGEX = /\+3598[789]\d{7}/;
const USERNAME_REGEX =
    /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function Signup(props) {
    const userContext = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [invalidValues, setInvalidValues] = useState({
        password: null,
        phone: null,
        username: null,
        email: null,
    });

    // this reference is used for indication
    // when the component has been unmounted
    const mountedRef = useRef(true);

    // used to indicate that the
    // component has been unmounted
    // equivalent to componentWillUnmount
    useEffect(() => {
        return () => {
            mountedRef.current = false;
        };
    }, []);

    const handleSubmit = useCallback(
        (event) => {
            event.preventDefault();

            let allValid = false;

            for (let key in invalidValues) {
                if (key === "phone" && invalidValues[key] === null)
                    allValid = true;
                else allValid = invalidValues[key];

                if (!allValid) break;
            }

            if (allValid) {
                let data = {
                    firstName: event.target.firstName.value,
                    lastName: event.target.lastName.value,
                    age: event.target.age.value,
                    username: event.target.username.value,
                    email: event.target.email.value,
                    city: event.target.city.value,
                    phone: event.target.phone.value,
                    password: event.target.password.value,
                };

                setLoading(true);
                userContext.registerUser(data).then((res) => {
                    if (mountedRef.current) setLoading(false);
                });
            }
        },
        [invalidValues, userContext]
    );

    const handleInputChange = useCallback((event) => {
        let updatedState = {};
        if (event.target.value !== "") {
            switch (event.target.name) {
                case "phone": {
                    updatedState["phone"] =
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
                case "email": {
                    updatedState["email"] =
                        !!event.target.value.match(EMAIL_REGEX);
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
    }, []);

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
                <div className={"control " + styles.control}>
                    <label className="label">Възраст</label>
                    <input
                        type="number"
                        name="age"
                        className="input"
                        placeholder="22"
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
                        className={`input ${
                            invalidValues.username === null
                                ? ""
                                : invalidValues.username
                                ? "is-success"
                                : "is-danger"
                        }`}
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
                        type="email"
                        name="email"
                        className={`input ${
                            invalidValues.email === null
                                ? ""
                                : invalidValues.email
                                ? "is-success"
                                : "is-danger"
                        }`}
                        onChange={handleInputChange}
                        placeholder="qnko_goshov@abv.bg"
                        required
                    />
                </div>
                {invalidValues.email ===
                null ? null : invalidValues.email ? null : (
                    <div className="help is-danger">имейлът е невалиден</div>
                )}
            </div>

            <div className="field">
                <label className="label">Град (по избор)</label>
                <div className="control">
                    <input
                        type="text"
                        name="city"
                        className="input"
                        placeholder="Бургас"
                    />
                </div>
            </div>

            <div className="field">
                <div className="label">Телефонен номер (по избор)</div>
                <div className="control">
                    <input
                        type="tel"
                        name="phone"
                        className={`input ${
                            invalidValues.phone === null
                                ? ""
                                : invalidValues.phone
                                ? "is-success"
                                : "is-danger"
                        }`}
                        onChange={handleInputChange}
                    />
                </div>
                {invalidValues.phone ===
                null ? null : invalidValues.phone ? null : (
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
                    value={loading ? "Моля изчакайте..." : "Регистрация"}
                    {...{ disabled: loading }}
                ></Button>
            </div>
        </SetupForm>
    );
}

export default Signup;
