import React from "react";

import { Hero, Container } from "react-bulma-components";
import { Link } from "react-router-dom";

function Index(props) {
    return (
        <>
            <Hero size="medium" color="link">
                <Hero.Body>
                    <div className="title">
                        Намерете новини за пристанища и морето
                    </div>
                    <div className="subtitle">
                        Разгледайте нашата страница за новини относно тези теми{" "}
                        <Link to="/news">тук</Link>
                    </div>
                </Hero.Body>
            </Hero>
            <Hero size="medium" color="warning">
                <Hero.Body>
                    <div className="title">lorem ipsum</div>
                    <div className="subtitle">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Molestias omnis dolor in, blanditiis doloremque ullam
                        tenetur soluta ipsum? Nulla iste modi saepe facere
                        impedit explicabo numquam minima inventore, dolor
                        necessitatibus?
                    </div>
                </Hero.Body>
            </Hero>
            <Hero size="medium" color="danger">
                <Hero.Body>
                    <div className="title">lorem ipsum</div>
                    <div className="subtitle">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Molestias omnis dolor in, blanditiis doloremque ullam
                        tenetur soluta ipsum? Nulla iste modi saepe facere
                        impedit explicabo numquam minima inventore, dolor
                        necessitatibus?
                    </div>
                </Hero.Body>
            </Hero>
        </>
    );
}

export default Index;
