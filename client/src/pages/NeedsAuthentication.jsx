import React from "react";
import { Button } from "react-bulma-components";
import { Link } from "react-router-dom";

function NeedsAuthentication(props) {
    return (
        <div className="center">
            <div style={{ textAlign: "center" }}>
                <h1 style={{ fontSize: "10vh" }}>Моля влезте</h1>
                <Button
                    renderAs={Link}
                    to="/login"
                    size="large"
                    color="primary"
                >
                    Влизане
                </Button>
            </div>
        </div>
    );
}

export default NeedsAuthentication;
