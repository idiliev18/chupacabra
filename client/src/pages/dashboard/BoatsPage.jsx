import React, { useContext, useEffect, useRef, useState } from "react";
import { Notification, Tile, Icon } from "react-bulma-components";
import Loading from "../../components/Loading";
import { fetchAPI } from "../../api";
import { UserContext } from "../../App";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAnchor,
    faShip,
    faIdBadge,
    faAddressCard,
    faChair,
    faLifeRing,
} from "@fortawesome/free-solid-svg-icons";

export default function BoatsPage(props) {
    const [loading, setLoading] = useState(true);
    const [boats, setBoats] = useState({});
    const userContext = useContext(UserContext);

    // this reference is used for indication
    // when the component has been unmounted
    const mountedRef = useRef(true);

    // used to indicate that the
    // component has been unmounted
    // equivalent to componentWillUnmount
    useEffect(() => {
        return () => {
            mountedRef.current = false;
        };
    }, []);

    useEffect(() => {
        fetchAPI(
            "/boats",
            {},
            {
                Authorization: userContext.token,
            },
            "GET"
        ).then((data) => {
            if (mountedRef.current) {
                if (data.type === "boat-success") {
                    setBoats(data.data);
                    setLoading(false);
                }
            }
        });
    }, [userContext]);

    return loading ? (
        <Loading />
    ) : (
        <Tile className="is-parent">
            <Notification renderAs={Tile} className="is-child" color="primary">
                <Tile>
                    {boats.map((e) => (
                        <Tile className="is-parent">
                            <Notification
                                renderAs={Tile}
                                style={{ color: "black" }}
                                className="is-child"
                            >
                                <div className="title">{e.BoatName}</div>
                                <div className="subtitle">
                                    <div className="icon-text">
                                        <Icon>
                                            <FontAwesomeIcon icon={faShip} />
                                        </Icon>
                                        <p>{e.Engine}</p>
                                    </div>
                                    <div className="icon-text">
                                        <Icon>
                                            <FontAwesomeIcon
                                                icon={faAddressCard}
                                            />
                                        </Icon>
                                        <p>{e.RegistrationNumber}</p>
                                    </div>
                                    <div className="icon-text">
                                        <Icon>
                                            <FontAwesomeIcon icon={faIdBadge} />
                                        </Icon>
                                        <p>{e.BoatLicense}</p>
                                    </div>
                                    <div className="icon-text">
                                        <Icon>
                                            <FontAwesomeIcon icon={faChair} />
                                        </Icon>
                                        <p>{e.SeatsCount}</p>
                                    </div>
                                    <div className="icon-text">
                                        <Icon>
                                            <FontAwesomeIcon icon={faAnchor} />
                                        </Icon>
                                        <p>{e.AnchorLength}m</p>
                                    </div>
                                    <div className="icon-text">
                                        <Icon>
                                            <FontAwesomeIcon
                                                icon={faLifeRing}
                                            />
                                        </Icon>
                                        <p>{e.LifeJacketsCount}</p>
                                    </div>
                                </div>
                            </Notification>
                        </Tile>
                    ))}
                </Tile>
            </Notification>
        </Tile>
    );
}
