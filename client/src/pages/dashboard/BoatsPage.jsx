import React, { useContext, useState } from "react";
import { Notification, Tile } from "react-bulma-components";

export default function BoatsPage(props) {
    return (
        <Tile className="is-parent">
            <Notification className="is-child" renderAs={Tile} color="primary">
                <div className="subtitle">boats page content</div>
            </Notification>
        </Tile>
    );
}