import React, { useState } from "react";
import { ErrorableInput } from "../components/ErrorableInput";
import { SetupForm } from "../components/SetupForm";
import { Button, Notification, Tile, Box } from "react-bulma-components";
import { changeAvatar, fetchAPI } from "../api";

export function ProfilePage(props) {
    const [selectedAvatar, setSelectedAvatar] = useState();
    const [isAvatarSelected, setIsAvatarSelected] = useState(false);

    const avatarOnChange = (event) => {
        setSelectedAvatar(event.target.files[0]);
        setIsAvatarSelected(true);
    };

    const onProfileSettingsSubmit = (event) => {
        event.preventDefault();

        let data = {};

        if (event.target.email.value !== "")
            data.email = event.target.email.value;
        if (event.target.firstName.value !== "")
            data.firstName = event.target.firstName.value;
        if (event.target.lastName.value !== "")
            data.lastName = event.target.lastName.value;

        if (isAvatarSelected) {
            changeAvatar(selectedAvatar);
        }
    };

    return (
        <>
            <Tile>
                <Tile className="is-parent">
                    <Box className="is-child" renderAs={Tile} color="primary">
                        <form onSubmit={onProfileSettingsSubmit}>
                            <h1>Редактирай профил</h1>

                            <div className="field">
                                <label className="label">Профилна снимка</label>
                                <div className="control">
                                    <div className="file">
                                        <label className="file-label">
                                            <input
                                                className="file-input"
                                                type="file"
                                                name="avatar"
                                                accept="image/jpg, image/jpeg, image/png"
                                                onChange={avatarOnChange}
                                            />
                                            <span className="file-cta">
                                                <span className="file-label">
                                                    Избери файл
                                                </span>
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="field">
                                <div className="control">
                                    <ErrorableInput
                                        label="Имейл"
                                        name="email"
                                        placeholder="ssivanov19@codingburgas.bg"
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <div className="control">
                                    <ErrorableInput
                                        label="Първо име"
                                        name="firstName"
                                        placeholder="Стоян"
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <div className="control">
                                    <ErrorableInput
                                        label="Фамилия"
                                        name="lastName"
                                        placeholder="Иванов"
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <Button
                                    color="primary"
                                    renderAs="input"
                                    type="submit"
                                    value="Запази"
                                />
                            </div>
                        </form>
                    </Box>
                </Tile>
                <Tile className="is-parent">
                    <Box className="is-child" renderAs={Tile} color="primary">
                        <h1>Примерен изглед на профила</h1>
                    </Box>
                </Tile>
            </Tile>
            <Tile className="is-parent">
                <Box className="is-child" renderAs={Tile} color="primary">
                    <form>
                        <h1>Смяна на парола</h1>

                        <div className="field">
                            <div className="control">
                                <ErrorableInput
                                    label="Сегашна парола"
                                    name="currPassword"
                                />
                            </div>
                        </div>

                        <hr />

                        <div className="field">
                            <div className="control">
                                <ErrorableInput
                                    label="Нова парола"
                                    name="newPassword"
                                />
                            </div>
                        </div>

                        <div className="field">
                            <div className="control">
                                <ErrorableInput
                                    label="Повтори парола"
                                    name="repeatPassword"
                                />
                            </div>
                        </div>

                        <div className="field">
                            <Button
                                color="primary"
                                renderAs="input"
                                type="submit"
                                value="Запази"
                            />
                        </div>
                    </form>
                </Box>
            </Tile>
        </>
    );
}

export function BoatsPage(props) {
    return (
        <Tile className="is-parent">
            <Notification className="is-child" renderAs={Tile} color="primary">
                <div className="subtitle">boats page content</div>
            </Notification>
        </Tile>
    );
}

export function RegisterBoatPage(props) {
    const onSubmit = (event) => {
        event.preventDefault();

        let data = {
            boatName: event.target.boatName.value,
            Engine: event.target.engine.value,
            registrationNumber: event.target.registrationNumber.value,
            boatLicense: event.target.boatLicense.value,
            seatsCount: event.target.seatsCount.value,
            anchorLength: event.target.anchorLength.value,
            lifeJacketsCount: event.target.lifeJacketsCount.value,
        };

        console.log(data);
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
                    <Button
                        color="primary"
                        renderAs="input"
                        type="submit"
                        value="Изпращане"
                    />
                </div>
            </SetupForm>
        </Tile>
    );
}
