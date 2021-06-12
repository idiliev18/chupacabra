import React from 'react';
import { Navbar, Box, Button } from 'react-bulma-components';
import { Link } from 'react-router-dom';

function RoleNavbar(props) {
    var role = props.role;

    return <Navbar renderAs='nav' className="has-shadow">
        <Navbar.Menu>
            <Navbar.Container>
                <Navbar.Item renderAs={Link} to="/">Home</Navbar.Item>
                <Navbar.Item renderAs={Link} to="/dash">Dash</Navbar.Item>
            </Navbar.Container>
            <Navbar.Container align="right">
                <div className="buttons">
                    <Button renderAs={Link} to="/signup" color="primary">Sign Up</Button>
                    <Button renderAs={Link} to="/login">Log In</Button>
                </div>
            </Navbar.Container>
        </Navbar.Menu>
    </Navbar>;
}

export { RoleNavbar };