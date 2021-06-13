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
                        Home
                    </Navbar.Item>
                    <Navbar.Item renderAs={Link} to="/news">
                        News
                    </Navbar.Item>
                    <Navbar.Item renderAs={Link} to="/dash">
                        Dash
                    </Navbar.Item>
                </Navbar.Container>
                <Navbar.Container align="right">
                    <div className="buttons">
                        {userContext.authenticated ? (
                            <Button
                                onClick={userContext.invalidateAuthentication}
                            >
                                Log Out
                            </Button>
                        ) : (
                            <>
                                <Button
                                    renderAs={Link}
                                    to="/signup"
                                    color="primary"
                                >
                                    Sign Up
                                </Button>
                                <Button renderAs={Link} to="/login">
                                    Log In
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
