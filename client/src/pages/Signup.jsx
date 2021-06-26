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
import { ErrorableInput } from "../components/ErrorableInput";

import styles from "./Signup.module.scss";

const PHONE_REGEX = /\+3598[789]\d{7}/;
const USERNAME_REGEX =
    /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;
const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function Signup(props) {
    const userContext = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [invalidValues, setInvalidValues] = useState({});

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

            setInvalidValues({});
            let updatedState = {};

            if (!event.target.phone.value.match(PHONE_REGEX))
                updatedState["phone"] = "невалиден телефонен номер";

            if (
                event.target.password.value !==
                event.target.confirmPassword.value
            )
                updatedState["password"] = "паролите не съвпадат";

            if (!event.target.username.value.match(USERNAME_REGEX))
                updatedState["username"] = "невалидно потребителско име";

            if (!event.target.email.value.match(EMAIL_REGEX))
                updatedState["email"] = "невалиден имейл";

            setInvalidValues((prevState) => {
                return { ...prevState, ...updatedState };
            });

            if (Object.keys(updatedState).length === 0) {
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
                userContext.registerUser(data).then((fields) => {
                    // checks if component is still mounted
                    if (mountedRef.current) {
                        updatedState = fields;

                        setInvalidValues((prevState) => {
                            return { ...prevState, ...updatedState };
                        });

                        setLoading(false);
                    }
                });
            } else {
                return;
            }
        },
        [userContext]
    );

    const handleInputChange = useCallback((event) => {}, []);

    return (
        <SetupForm onSubmit={handleSubmit}>
            <h1>Регистрация</h1>
            <br />

            <div className="field is-flex">
                <div className={"control " + styles.control}>
                    <ErrorableInput
                        label="Първо име"
                        name="firstName"
                        placeholder="Янко"
                        errText={invalidValues.firstName}
                        required
                    />
                </div>
                <div className={"control " + styles.control}>
                    <ErrorableInput
                        label="Фамилия"
                        name="lastName"
                        placeholder="Георгиев"
                        errText={invalidValues.lastName}
                        required
                    />
                </div>
                <div className={"control " + styles.control}>
                    <ErrorableInput
                        type="number"
                        label="Възраст"
                        name="age"
                        placeholder="22"
                        errText={invalidValues.age}
                        required
                    />
                </div>
            </div>

            <div className="field">
                <div className="control">
                    <ErrorableInput
                        label="Потребителско име"
                        name="username"
                        placeholder="qnko0123"
                        errText={invalidValues.username}
                        required
                    />
                </div>
            </div>

            <div className="field">
                <div className="control">
                    <ErrorableInput
                        label="Имейл"
                        type="email"
                        name="email"
                        placeholder="qnko_goshov@abv.bg"
                        errText={invalidValues.email}
                        required
                    />
                </div>
            </div>

            <div className="field">
                <div className="control">
                    <ErrorableInput
                        label="Град (по избор)"
                        name="city"
                        placeholder="Бургас"
                        errText={invalidValues.city}
                    />
                </div>
            </div>

            <div className="field">
                <div className="control">
                    <ErrorableInput
                        label="Телефонен номер (по избор)"
                        type="tel"
                        name="phone"
                        errText={invalidValues.phone}
                    />
                </div>
            </div>

            <div className="field">
                <div className="control">
                    <ErrorableInput
                        label="Парола"
                        type="password"
                        name="password"
                        placeholder="********"
                        errText={invalidValues.password}
                        required
                    />
                </div>
            </div>

            <div className="field">
                <div className="control">
                    <ErrorableInput
                        label="Повтори Парола"
                        type="password"
                        name="confirmPassword"
                        placeholder="********"
                        errText={invalidValues.confirmPassword}
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
                    value={loading ? "Моля изчакайте..." : "Регистрация"}
                    {...{ disabled: loading }}
                ></Button>
            </div>
        </SetupForm>
    );
}

export default Signup;
