import React from "react";

import { Hero } from "react-bulma-components";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

import backgroundImage from "./img/bg.jpg";

function Index(props) {
    return (
        <>
            <img
                src={backgroundImage}
                style={{
                    position: "absolute",
                    top: "0",
                    bottom: "0",
                    zIndex: "-1",
                    width: "100vw",
                    height: "90vh",
                }}
            />
            <Hero size="medium">
                <Hero.Body>
                    <div className="title" style={{ color: "white" }}>
                        Намерете новини за пристанища и морето
                    </div>
                    <div className="subtitle" style={{ color: "white" }}>
                        Разгледайте нашата страница за новини относно тези теми{" "}
                        <Link to="/news">тук</Link>
                    </div>
                </Hero.Body>
            </Hero>
            <Hero size="medium">
                <Hero.Body>
                    <div
                        className="title info-module"
                        style={{ color: "white" }}
                    >
                        За сайта
                    </div>
                    <div
                        className="subtitle info-module"
                        style={{ color: "white" }}
                    >
                        Нашият уебсайт има за цел да улесни работата на
                        пристанищата, максимално автоматизирайки ги. Освен за
                        пристанища той е подходящ за рибари, независимо
                        професионално или под формата на хоби, защото предоставя
                        информация за рибите, пасажите им и разбира се актуална
                        информация за риболова. Уебсайтът има и секция където
                        рибарите могат да продават рибата, която са хванали и
                        така да се подпомогне за тяхното разпродаване. Освен
                        информативен сайтът цели и да бъде място, където
                        рибарите да качат снимки на улова си, за да се похвалят
                        или да използват платформата за комуникация с останалите
                        рибари. За някои от тези функции е нужна регистрация, а
                        за да си направите такава натиснете
                        <Link to="/Signup"> тук</Link>.
                    </div>
                </Hero.Body>
            </Hero>

            <Footer />
        </>
    );
}

export default Index;
