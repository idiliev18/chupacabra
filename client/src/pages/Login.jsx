import React, {
    useCallback,
    useContext,
    useState,
    useRef,
    useEffect,
} from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bulma-components";
import { SetupForm } from "../components/SetupForm";
import { ErrorableInput } from "../components/ErrorableInput";

import { UserContext } from "../App";

function Login(props) {
    const userContext = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [invalidData, setInvalidData] = useState({});

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

            setInvalidData({});
            setLoading(true);

            userContext
                .authenticate({
                    email: event.target.email.value,
                    password: event.target.password.value,
                    rememberMe: event.target.rememberMe.checked,
                })
                .then((success) => {
                    if (mountedRef.current) {
                        console.log(success);
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
            <h1>Влизане</h1>
            <br />

            <div className="field">
                <div className="control">
                    <ErrorableInput
                        label="Имейл"
                        type="email"
                        name="email"
                        placeholder="qnko_goshov@abv.bg"
                        errText={invalidData.email}
                        required
                    />
                </div>
            </div>

            <div className="field">
                <div className="control">
                    <ErrorableInput
                        label="Парола"
                        type="password"
                        placeholder="********"
                        name="password"
                        errText={invalidData.password}
                        required
                    />
                </div>
            </div>

            <div className="field">
                <p>
                    Нямате регистрирация? <Link to="/signup">Регистрация</Link>
                </p>
            </div>

            <div className="field">
                <div className="control">
                    <label htmlFor="rememberMe" className="checkbox">
                        <input type="checkbox" name="rememberMe" id="rememberMe"/> 
                        <label for="rememberMe"> Запомни ме</label>
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
