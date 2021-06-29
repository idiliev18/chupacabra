import React, { useContext, useState } from "react";
import { ErrorableInput } from "../../components/ErrorableInput";
import { SetupForm } from "../../components/SetupForm";
import { Button, Tile } from "react-bulma-components";
import { fetchAPI } from "../../api";

import { UserContext } from "../../App";

export default function RegisterBoatPage(props) {
    const [successValues, setSuccessValues] = useState(null);
    const [failureValues, setFailureValues] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const userContext = useContext(UserContext);

    const onSubmit = (event) => {
        event.preventDefault();
        setSuccessValues(null);
        setFailureValues(null);
        setLoading(true);

        let data = {
            boatName: event.target.boatName.value,
            Engine: event.target.engine.value,
            registrationNumber: event.target.registrationNumber.value,
            boatLicense: event.target.boatLicense.value,
            seatsCount: event.target.seatsCount.value,
            anchorLength: event.target.anchorLength.value,
            lifeJacktsCount: event.target.lifeJacketsCount.value,
        };

        fetchAPI(
            "/registerBoat",
            data,
            {
                Authorization: userContext.token,
            },
            "POST"
        )
            .then((res) => {
                if (res.type === "registerBoat-success") {
                    event.target.boatName.value = "";
                    event.target.engine.value = "";
                    event.target.registrationNumber.value = "";
                    event.target.boatLicense.value = "";
                    event.target.seatsCount.value = "";
                    event.target.anchorLength.value = "";
                    event.target.lifeJacketsCount.value = "";
                    setSuccessValues("successful registration");
                    setLoading(false);
                } else if (res.type === "registerBoat-failure") {
                    setFailureValues(
                        "unsuccessful registration. " + res.fields.name
                    );
                    setLoading(false);
                }
            })
            .catch((e) => {
                setFailureValues("internal server error, try again");
                setLoading(false);
            });
    };

    const onNumericInputChange = (e) => {
        if (!e.target.value.match(/[0-9]*/)[0]) e.target.value = "";
    };

    return (
        <Tile className="is-parent">
            <SetupForm
                onSubmit={onSubmit}
                style={{ width: "100%", height: "100%" }}
            >
                <h1>Регистрация на лодка</h1>
                <br />

                <div className="field">
                    <div className="control">
                        <ErrorableInput
                            label="Име на лодката"
                            name="boatName"
                            required
                        />
                    </div>
                </div>

                <div className="field">
                    <div className="control">
                        <ErrorableInput
                            label="Двигател"
                            name="engine"
                            required
                        />
                    </div>
                </div>

                <div className="field">
                    <div className="control">
                        <ErrorableInput
                            label="Регистрационен номер"
                            name="registrationNumber"
                            required
                        />
                    </div>
                </div>

                <div className="field">
                    <div className="control">
                        <ErrorableInput
                            label="Свидетелство за управление на лодка"
                            name="boatLicense"
                            required
                        />
                    </div>
                </div>

                <div className="field">
                    <div className="control">
                        <ErrorableInput
                            label="Брой места"
                            type="number"
                            name="seatsCount"
                            onChange={onNumericInputChange}
                            required
                        />
                    </div>
                </div>

                <div className="field">
                    <div className="control">
                        <ErrorableInput
                            label="Дължина на котва"
                            type="number"
                            name="anchorLength"
                            onChange={onNumericInputChange}
                            placeholder="в метри"
                            required
                        />
                    </div>
                </div>

                <div className="field">
                    <div className="control">
                        <ErrorableInput
                            label="Брой спасителни жилетки"
                            type="number"
                            name="lifeJacketsCount"
                            onChange={onNumericInputChange}
                            required
                        />
                    </div>
                </div>

                <div className="field">
                    {!!failureValues ? (
                        <div className="help is-danger">{failureValues}</div>
                    ) : null}
                </div>

                <div className="field">
                    {!!successValues ? (
                        <div className="help is-success">{successValues}</div>
                    ) : null}
                </div>

                <div className="field">
                    <Button
                        color="primary"
                        renderAs="input"
                        type="submit"
                        value={isLoading ? "Моля изчакайте..." : "Запази"}
                        {...{ disabled: isLoading }}
                    />
                </div>
            </SetupForm>
        </Tile>
    );
}
