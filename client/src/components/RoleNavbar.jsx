import React, { useContext, useState } from "react";
import { Navbar, Button } from "react-bulma-components";
import { Link } from "react-router-dom";

import { UserContext } from "../App";

function RoleNavbar(props) {
    const userContext = useContext(UserContext);
    const [showNav, setShowNav] = useState(false);

    const toggleNav = () => {
        setShowNav(!showNav);
    };

    return (
        <Navbar renderAs="nav" className="has-shadow">
            <Navbar.Brand>
                <Navbar.Burger
                    className={showNav ? "is-active" : ""}
                    onClick={toggleNav}
                ></Navbar.Burger>
            </Navbar.Brand>
            <Navbar.Menu className={showNav ? "is-active" : ""}>
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

export default RoleNavbar;
