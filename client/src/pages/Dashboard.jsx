import React, { createElement, useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";

import { Tile, Notification, Icon } from "react-bulma-components";
import { Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faAnchor,
    faHome,
    faFish,
    faShip,
} from "@fortawesome/free-solid-svg-icons";
import { RegisterBoatPage, BoatsPage, ProfilePage } from "./DashboardPages.jsx";

import styles from "./Dashboard.module.scss";

import { UserContext } from "../App.js";

export default function Dashboard(props) {
    const [pageIdx, setPageIdx] = useState(0);
    const userContext = useContext(UserContext);

    const pages = [
        {
            icon: faUser,
            text: "Настройки на акаунт",
            page: ProfilePage,
        },
        {
            icon: faAnchor,
            text:
                userContext.user.roles.includes("Operator") ||
                userContext.user.roles.includes("Admin")
                    ? "Лодки за одобряване"
                    : "Моите лодки",
            page: BoatsPage,
        },
        {
            icon: faShip,
            text: "Регистрация на лодка",
            page: RegisterBoatPage,
        },
        {
            icon: faHome,
            text: "Начална страница",
            page: () => <Redirect to="/" />,
        },
    ];

    const isTablet = useMediaQuery({ query: "(max-width: 1216px)" });
    const isPhone = useMediaQuery({ query: "(max-width: 769px)" });

    return (
        <Tile style={{ width: "100%" }}>
            <Tile
                className={`is-parent is-vertical ${
                    isTablet ? "is-1" : "is-3"
                }`}
            >
                <Notification
                    className="is-child"
                    renderAs={Tile}
                    color="primary"
                    id={styles.sidebar}
                    style={{ padding: "0" }}
                >
                    <div id={styles["nav-header"]}>
                        {isTablet ? (
                            isPhone ? (
                                <h1 className="title">Dashboard</h1>
                            ) : (
                                <Icon>
                                    <FontAwesomeIcon size="lg" icon={faFish} />
                                </Icon>
                            )
                        ) : (
                            <h1 className="title">Dashboard</h1>
                        )}
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
                                {isTablet
                                    ? isPhone
                                        ? item.text
                                        : null
                                    : item.text}
                            </li>
                        ))}
                    </ul>
                    <div id={styles["nav-user"]}>
                        {isTablet ? (
                            isPhone ? (
                                <h3 className="title">User</h3>
                            ) : (
                                <Icon>
                                    <FontAwesomeIcon size="lg" icon={faUser} />
                                </Icon>
                            )
                        ) : (
                            <h3 className="title">
                                {userContext.user.Username}
                            </h3>
                        )}
                    </div>
                </Notification>
            </Tile>
            <Tile
                className={`is-vertical ${isTablet ? "is-11" : "is-9"}`}
                id={styles.content}
            >
                {createElement(pages[pageIdx].page)}
            </Tile>
        </Tile>
    );
}
