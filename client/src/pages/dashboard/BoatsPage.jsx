import React, { useContext, useEffect, useRef, useState } from "react";
import { Notification, Tile } from "react-bulma-components";
import Loading from "../../components/Loading";
import { fetchAPI } from "../../api";
import { UserContext } from "../../App";

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
                console.log(data);
                setLoading(false);
                setBoats(data);
            }
        });
    }, [userContext]);

    return loading ? (
        <Loading />
    ) : (
        <Tile className="is-parent">
            <Notification renderAs={Tile} className="is-child" color="primary">
                <Tile className="is-parent">
                    <Notification
                        renderAs={Tile}
                        style={{ color: "black" }}
                        className="is-child"
                    >
                        <div className="title">{JSON.stringify(boats)}</div>
                    </Notification>
                </Tile>
            </Notification>
        </Tile>
    );
}
