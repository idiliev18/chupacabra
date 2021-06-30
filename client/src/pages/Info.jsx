import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import Footer from "../components/Footer";

function Info(props) {
  return (
    <>
      <div className="hero" style={{ marginRight: "5%", marginLeft: "3%" }}>
        <div className="hero-body">
          <div className="container">
            <p className="title is-3 has-text-centered">Нашият отбор</p>
            <br />
            <br />
            <br />
            <div className="columns has-text-centered">
              <div className="column is-3">
                <div className="card">
                  <div className="card-image">
                    <img
                      src="../img/team-img/KNTaligadzhiev19.png"
                      alt="Костадин Талигаджиев"
                      data-pagespeed-url-hash="708956031"
                      onload="pagespeed.CriticalImages.checkImageForCriticality(this);"
                    />
                  </div>
                  <div className="card-content box">
                    <div className="media">
                      <div className="media-content">
                        <p className="title is-4" style="padding-bottom: 10px;">
                          Костадин Талигаджиев
                        </p>
                        <p className="subtitle is-6">@KNTaligadzhiev19</p>
                      </div>
                    </div>

                    <div className="content">
                      Костадин е FrontEnd и неговата задача беше да създаде
                      UI(User Interface) за нашата уеб платформа, използвайки
                      Bulma. Може да видите неговият{" "}
                      <a href="https://github.com/KNTaligadzhiev19">
                        GitHub профил
                      </a>
                      за повече информация.
                      <br />
                      <br />
                      <a>#FrontEnd</a> <a>#UI</a> <a>#Bulma</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="column is-3">
                <div className="card">
                  <div className="card-image">
                    <img
                      src="../img/team-img/SSIvanov19.png"
                      alt="Стоян Иванов"
                      data-pagespeed-url-hash="3128553429"
                      onload="pagespeed.CriticalImages.checkImageForCriticality(this);"
                    />
                  </div>
                  <div className="card-content box">
                    <div className="media">
                      <div className="media-content">
                        <p className="title is-4" style="padding-bottom: 10px;">
                          Стоян Иванов
                        </p>
                        <p className="subtitle is-6">@SSIvanov19</p>
                      </div>
                    </div>

                    <div className="content">
                      Стоян е BackEnd Developer и неговата задача беше да
                      разработи алгоритмите, на базата на които функционира
                      нашата уеб платформа, използвайки JavaScript. Може да
                      видите неговият{" "}
                      <a href="https://github.com/SSIvanov19">GitHub профил</a>{" "}
                      за повече информация.
                      <br />
                      <br />
                      <a>#BackEnd</a> <a>#JavaScript</a>
                      <br />
                    </div>
                  </div>
                </div>
              </div>

              <div className="column is-3">
                <div className="card">
                  <div className="card-image">
                    <img
                      src="../img/team-img/YITanev19.png"
                      alt="Йоан Танев"
                      data-pagespeed-url-hash="1299669844"
                      onload="pagespeed.CriticalImages.checkImageForCriticality(this);"
                    />
                  </div>
                  <div className="card-content box">
                    <div className="media">
                      <div className="media-content">
                        <p className="title is-4" style="padding-bottom: 10px;">
                          Йоан Танев
                        </p>
                        <p className="subtitle is-6">@YHTanev19</p>
                      </div>
                    </div>

                    <div className="content">
                      Йоан е дизайнер и като той се погрижи за дизайна на уеб
                      платформата и след това да го даде на Костадин, за да може
                      той да се води по него. Може да видите неговият{" "}
                      <a href="https://github.com/YHTanev19">GitHub профил</a>{" "}
                      за повече информация.
                      <br />
                      <br />
                      <a>#Designer</a> <a>#UI</a>
                      <br />
                    </div>
                  </div>
                </div>
              </div>

              <div className="column is-3">
                <div className="card">
                  <div className="card-image">
                    <img
                      src="../img/team-img/MTIvanov19.png"
                      alt="Мирослав Иванов"
                      data-pagespeed-url-hash="2182332372"
                      onload="pagespeed.CriticalImages.checkImageForCriticality(this);"
                    />
                  </div>
                  <div className="card-content box">
                    <div className="media">
                      <div className="media-content">
                        <p className="title is-4" style="padding-bottom: 10px;">
                          Мирослав Иванов
                        </p>
                        <p className="subtitle is-6">@MTIvanov19</p>
                      </div>
                    </div>

                    <div className="content">
                      Мирослав трябваше да се погрижи всички да излълнят
                      задачите си на време, да им помага когато имаха нужда и да
                      направи презентация и документация. Може да видите
                      неговият{" "}
                      <a href="https://github.com/MTIvanov19">GitHub профил</a>
                      за повече информация. <br />
                      <br />
                      <a>#ScrumTrainer</a> <a>#Documentation</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Info;
