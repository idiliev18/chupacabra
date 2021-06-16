import React, { useEffect } from "react";
import RSSReader from "rss-parser";
import { Tile, Notification, Container } from "react-bulma-components";

const NEWS_ENDPOINT = "//localhost:4000/rss/maritimeFeed";

function News(props) {
    useEffect(() => {
        fetch(NEWS_ENDPOINT).then((data) => console.log(data));
    }, []);

    return (
        <Container>
            <Tile>
                <Tile className="is-vertical is-8">
                    <Tile>
                        <Tile className="is-parent is-vertical">
                            <Notification
                                renderAs={Tile}
                                color="primary"
                                className="is-child"
                            >
                                <h1 className="title">Vertical...</h1>
                                <p className="subtitle">Top tile</p>
                            </Notification>
                            <Notification
                                renderAs={Tile}
                                color="primary"
                                className="is-child"
                            >
                                <h1 className="title">...tiles</h1>
                                <p className="subtitle">Bottom tile</p>
                            </Notification>
                        </Tile>
                        <Tile className="is-parent">
                            <Notification
                                renderAs={Tile}
                                color="info"
                                className="is-child"
                            >
                                <h1 className="title">Middle tile</h1>
                                <p className="subtitle">no img</p>
                            </Notification>
                        </Tile>
                    </Tile>
                    <Tile className="is-parent">
                        <Notification
                            renderAs={Tile}
                            className="is-child"
                            color="danger"
                        >
                            <h1 className="title">Wide Tile</h1>
                            <p className="subtitle">
                                Aligned with the right tile
                            </p>
                        </Notification>
                    </Tile>
                </Tile>
                <Tile className="is-parent">
                    <Notification
                        renderAs={Tile}
                        className="is-child"
                        color="success"
                    >
                        <h1 className="title">Tall tile</h1>
                        <p className="subtitle">With even more content</p>
                    </Notification>
                </Tile>
            </Tile>
        </Container>
    );
}

export default News;
