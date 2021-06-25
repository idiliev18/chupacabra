import React, { createElement, useState } from "react";

import { Tile, Notification, Icon } from "react-bulma-components";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faAnchor, faHome } from "@fortawesome/free-solid-svg-icons";

import styles from "./Dashboard.module.scss";

function ProfilePage(props) {
    return (
        <Notification className="is-child" renderAs={Tile} color="primary">
            <div className="subtitle">profile page content</div>
        </Notification>
    );
}

function BoatsPage(props) {
    return (
        <Notification className="is-child" renderAs={Tile} color="primary">
            <div className="subtitle">boats page content</div>
        </Notification>
    );
}

export default function Dashboard(props) {
    const [pageIdx, setPageIdx] = useState(0);
    const pages = [
        {
            icon: faUser,
            text: "Настройки на акаунт",
            page: ProfilePage,
        },
        {
            icon: faAnchor,
            text: "Лодки за одобряване",
            page: BoatsPage,
        },
        {
            icon: faHome,
            text: "Начална страница",
            page: () => <Redirect to="/" />,
        },
    ];

    return (
        <Tile style={{ width: "100%" }}>
            <Tile className="is-parent is-vertical is-3">
                <Notification
                    className="is-child"
                    renderAs={Tile}
                    color="primary"
                    id={styles.sidebar}
                    style={{ padding: "0" }}
                >
                    <div id={styles["nav-header"]}>
                        <h1 className="title">Dashboard</h1>
                    </div>
                    <ul className="subtitle" id={styles["nav-items"]}>
                        {pages.map((item, idx) => (
                            <li
                                onClick={() => setPageIdx(idx)}
                                key={idx}
                                className="icon-text"
                            >
                                <Icon>
                                    <FontAwesomeIcon
                                        size="lg"
                                        icon={item.icon}
                                    />
                                </Icon>
                                {item.text}
                            </li>
                        ))}
                    </ul>
                    <div id={styles["nav-user"]}>
                        <h3 className="title">User</h3>
                    </div>
                </Notification>
            </Tile>
            <Tile className="is-parent is-vertical is-9" id={styles.content}>
                {createElement(pages[pageIdx].page)}
            </Tile>
        </Tile>
    );
}
