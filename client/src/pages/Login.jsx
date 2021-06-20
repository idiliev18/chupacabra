import React, {
    useCallback,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";
import { Redirect, Link } from "react-router-dom";
import { Button } from "react-bulma-components";
import { SetupForm } from "../components/SetupForm";

import { UserContext } from "../App";

function Login(props) {
    const userContext = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [invalidData, setInvalidData] = useState({
        email: null,
        password: null,
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

            setInvalidData({ email: null, password: null });
            setLoading(true);

            userContext
                .authenticate({
                    email: event.target.email.value,
                    password: event.target.password.value,
                    rememberMe: event.target.rememberMe.checked,
                })
                .then((success) => {
                    if (mountedRef.current) {
                        setInvalidData((prevState) => {
                            return { ...prevState, ...success };
                        });

                        setLoading(false);
                    }
                });
        },
        [userContext]
    );

    return (
        <SetupForm onSubmit={handleSubmit}>
            {userContext.authenticated ? <Redirect to="/" /> : ""}
            <h1>Влизане</h1>
            <br />

            <div className="field">
                <label htmlFor="email" className="label">
                    Имейл
                </label>
                <div className="control">
                    <input
                        className={`input${
                            !invalidData.email && invalidData.email !== null
                                ? " is-danger"
                                : ""
                        }`}
                        type="email"
                        placeholder="gosho_qnko@abv.bg"
                        name="email"
                        required
                    />
                </div>
                {!invalidData.email && invalidData.email !== null ? (
                    <p className="help is-danger">
                        този имейл не е част от нашите записи
                    </p>
                ) : null}
            </div>

            <div className="field">
                <label htmlFor="password" className="label">
                    Парола
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
                        required
                    />
                </div>
                {!invalidData.password && invalidData.password !== null ? (
                    <p className="help is-danger">
                        тази парола не е част от нашите записи
                    </p>
                ) : null}
            </div>

            <div className="field">
                <p>
                    Нямате регистрирация? <Link to="/signup">Регистрация</Link>
                </p>
            </div>

            <div className="field">
                <div className="control">
                    <label htmlFor="rememberMe" className="checkbox">
                        <input type="checkbox" name="rememberMe" /> Запомни ме
                    </label>
                </div>
            </div>

            <div className="field">
                <Button
                    color="primary"
                    renderAs="input"
                    type="submit"
                    value={loading ? "Моля изчакайте..." : "Влизане"}
                    {...{ disabled: loading }}
                ></Button>
            </div>
        </SetupForm>
    );
}

export default Login;
