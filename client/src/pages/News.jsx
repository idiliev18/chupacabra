import React, { useEffect, useState } from "react";
import RSSParser from "rss-parser";
import he from "he";

import { Tile, Notification, Container } from "react-bulma-components";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const NEWS_ENDPOINT = "//localhost:4000/rss/maritimeFeed";
const rssParser = new RSSParser();

function News(props) {
    const [loading, setLoading] = useState(true);
    const [feed, setFeed] = useState({});

    const chunk = (array, n) => {
        let retArray = [];
        for (let i = 0; i < array.length; i += n)
            retArray.push(array.slice(i, i + n));

        return retArray;
    };

    useEffect(() => {
        rssParser.parseURL(NEWS_ENDPOINT).then((feed) => {
            setFeed(feed);
            setLoading(false);
        });
    }, [setLoading, setFeed]);

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <>
                    <Tile className="is-parent">
                        <Tile className="is-child is-vertical">
                            <Notification
                                renderAs={Tile}
                                color="success"
                                className="is-child"
                            >
                                <h1
                                    className="title"
                                    style={{ textAlign: "center" }}
                                >
                                    {feed.title}
                                </h1>
                            </Notification>
                        </Tile>
                    </Tile>
                    <Tile>
                        {chunk(feed.items, 2.7).map((column, columnIndex) => (
                            <Tile
                                className="is-parent is-vertical"
                                key={columnIndex}
                            >
                                {column.map((item, index) => (
                                    <Notification
                                        color="primary"
                                        className="is-child"
                                        key={index}
                                    >
                                        <h1 className="title">{item.title}</h1>
                                        <p className="subtitle">
                                            <a
                                                style={{
                                                    textDecoration: "none",
                                                }}
                                                href={item.link}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                {he.decode(
                                                    item.content.replace(
                                                        /<[^>]+>/g,
                                                        ""
                                                    )
                                                )}
                                            </a>
                                        </p>
                                        <p style={{ textAlign: "right" }}>
                                            <i>
                                                {new Date(
                                                    item.isoDate
                                                ).toLocaleString("bg")}
                                            </i>
                                        </p>
                                    </Notification>
                                ))}
                            </Tile>
                        ))}
                    </Tile>
                </>
            )}
        </>
    );
}

export default News;
