import React, { useContext } from "react";
import { Navbar, Button } from "react-bulma-components";
import { Link } from "react-router-dom";

import { UserContext } from "../App";

function RoleNavbar(props) {
    let userContext = useContext(UserContext);

    return (
        <Navbar renderAs="nav" className="has-shadow">
            <Navbar.Menu>
                <Navbar.Container>
                    <Navbar.Item renderAs={Link} to="/">
                        Начало
                    </Navbar.Item>
                    <Navbar.Item renderAs={Link} to="/news">
                        Новини
                    </Navbar.Item>
                    {userContext.authenticated ? (
                        <>
                            <Navbar.Item renderAs={Link} to="/dash">
                                Контролен Панел
                            </Navbar.Item>
                        </>
                    ) : null}
                </Navbar.Container>
                <Navbar.Container align="right">
                    <div className="buttons">
                        {userContext.authenticated ? (
                            <Button
                                onClick={userContext.invalidateAuthentication}
                            >
                                Излизане
                            </Button>
                        ) : (
                            <>
                                <Button
                                    renderAs={Link}
                                    to="/signup"
                                    color="primary"
                                >
                                    Регистрация
                                </Button>
                                <Button renderAs={Link} to="/login">
                                    Влизане
                                </Button>
                            </>
                        )}
                    </div>
                </Navbar.Container>
            </Navbar.Menu>
        </Navbar>
    );
}

export { RoleNavbar };
