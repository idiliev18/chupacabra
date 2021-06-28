import React, { useContext, useState } from "react";
import { ErrorableInput } from "../../components/ErrorableInput";
import { Button, Tile, Box } from "react-bulma-components";

import { UserContext } from "../../App";

export default function ProfilePage(props) {
    const userContext = useContext(UserContext);

    const [invalidValues, setInvalidValues] = useState({});
    const [successValues, setSuccessValues] = useState({});
    const [loadingValues, setLoadingValues] = useState({});
    const [selectedAvatar, setSelectedAvatar] = useState();
    const [isAvatarSelected, setIsAvatarSelected] = useState(false);

    const avatarOnChange = (event) => {
        setSelectedAvatar(event.target.files[0]);
        setIsAvatarSelected(true);
    };

    const onProfileSettingsSubmit = (event) => {
        event.preventDefault();
        setLoadingValues({ settingsGlobal: true });
        setInvalidValues({ ...invalidValues, settingsGlobal: null });
        setSuccessValues({ ...successValues, settingsGlobal: null });

        if (
            event.target.email.value !== "" ||
            event.target.firstName.value !== "" ||
            event.target.lastName.value !== ""
        ) {
            let data = {};

            if (event.target.email.value !== "")
                data.email = event.target.email.value;
            if (event.target.firstName.value !== "")
                data.firstName = event.target.firstName.value;
            if (event.target.lastName.value !== "")
                data.lastName = event.target.lastName.value;

            userContext
                .updateUserSettings(data)
                .then((res) => {
                    if (res)
                        setSuccessValues({
                            settingsGlobal: true,
                        });
                    else
                        setSuccessValues({
                            settingsGlobal: false,
                        });
                })
                .catch((e) => {
                    setInvalidValues({
                        settingsGlobal: false,
                    });
                });
        } else {
        }
    };

    // const onResetPasswordSubmit = event => {
    //     event.preventDefault();

    //     setLoadingValues({passwordGlobal: true});
    //     setInvalidValues({...invalidValues, passwordGlobal: null});

    //     let data = {
    //         currPassword: event.target.currPassword,
    //         newPassword: event.target.newPassword
    //     };

    //     if (data.newPassword === )
    // }

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
                                        placeholder={userContext.user.Email}
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <div className="control">
                                    <ErrorableInput
                                        label="Първо име"
                                        name="firstName"
                                        placeholder={userContext.user.FirstName}
                                    />
                                </div>
                            </div>

                            <div className="field">
                                <div className="control">
                                    <ErrorableInput
                                        label="Фамилия"
                                        name="lastName"
                                        placeholder={userContext.user.LastName}
                                    />
                                </div>
                            </div>

                            <div className="field">
                                {!!invalidValues.settingsGlobal ? (
                                    <div className="help is-danger">
                                        грешка!
                                    </div>
                                ) : null}
                            </div>

                            <div className="field">
                                {!!successValues.settingsGlobal ? (
                                    <div className="help is-success">
                                        успешно запазихте!
                                    </div>
                                ) : null}
                            </div>

                            <div className="field">
                                <Button
                                    color="primary"
                                    renderAs="input"
                                    type="submit"
                                    value={
                                        loadingValues.settingsGlobal
                                            ? "Моля изчакайте..."
                                            : "Запази"
                                    }
                                    {...{
                                        disabled: loadingValues.settingsGlobal,
                                    }}
                                />
                            </div>
                        </form>
                    </Box>
                </Tile>
                <Tile className="is-parent">
                    <Box className="is-child" renderAs={Tile} color="primary">
                        <h1>Примерен изглед на профила</h1>
                        <div
                            style={{ marginTop: "4.6vh", textAlign: "center" }}
                        >
                            <div
                                className="is-user-avatar has-max-width"
                                style={{
                                    width: "150px",
                                    height: "150px",
                                    margin: "0 auto",
                                    position: "relative",
                                    borderRadius: "50%",
                                    backgroundColor: "#aaaaaa",
                                }}
                            ></div>

                            <hr />

                            <h1>
                                {userContext.user.FirstName}{" "}
                                {userContext.user.LastName}
                            </h1>
                            <h4>{userContext.user.Email}</h4>
                            <h4>{userContext.user.Username}</h4>
                        </div>
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
                            {!!invalidValues.passwordGlobal ? (
                                <div className="help is-danger">грешка!</div>
                            ) : null}
                        </div>

                        <div className="field">
                            {!!successValues.passwordGlobal ? (
                                <div className="help is-success">
                                    успешно запазихте!
                                </div>
                            ) : null}
                        </div>

                        <div className="field">
                            <Button
                                color="primary"
                                renderAs="input"
                                type="submit"
                                value={
                                    loadingValues.passwordGlobal
                                        ? "Моля изчакайте..."
                                        : "Запази"
                                }
                                {...{ disabled: loadingValues.passwordGlobal }}
                            />
                        </div>
                    </form>
                </Box>
            </Tile>
        </>
    );
}
