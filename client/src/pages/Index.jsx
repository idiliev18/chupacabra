import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import styles from "./Index.module.css";
import backgroundImage from "./img/bg.jpg";

function Index(props) {

    return (
        <>

          <section className={"hero main_hero is-fullheight "+styles.banner}>
              <div className="hero-body">
                <div className="container has-text-centered">
                  <h1 className="title is-1 main-text has-text-white">CHUPACABRA</h1>
                </div>
              </div>
            </section>

              <section className="hero">
              <div className="hero-body">
                <div className="container">
                  <div className="content">
                    <h4 className="main_title title is-4">За сайта</h4>
                  </div>
                  <div className="columns content">
                    <div className="column">
                      <p style={{marginLeft:"5%"}}>
                        Нашият уебсайт има за цел да улесни работата на пристанищата, максимално автоматизирайки ги. Освен за пристанища
                        той е подходящ за рибари, независимо професионално или под формата на хоби, защото предоставя информация за рибите,
                        пасажите им и разбира се актуална информация за риболова. Уебсайтът има и секция където рибарите могат да продават
                        рибата, която са хванали и така да се подпомогне за тяхното разпродаване. Освен информативен сайтът цели и да бъде
                        място, където рибарите да качат снимки на улова си, за да се похвалят или да използват платформата за комуникация 
                        с останалите рибари. За някои от тези функции е нужна регистрация, а за да си направите такава натиснете  
                      </p>  <br /><br />
                    </div>
                  </div>
                  <div className="content">
                    <h5 className="main_title title is-5">Предимства</h5>
                    <p style={{marginLeft:"5%"}}>
                      Нашият сайт има редица предмиства, като това, че рибарите могат да си продават по-лесно рибата, която са хванали, пристанищата 
                      могат да са по-организирани и разбира се много други.
                    </p>
                  </div>
                </div>
              </div>
            </section>

        <Footer />

        </>
    );
}

export default Index;
