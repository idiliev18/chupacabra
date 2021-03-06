import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

import {
  Box,
  Container,
  Row,
  Column,
  FooterLink,
  Heading,
} from "./FooterStyles";

const Footer = () => {
  return (
    <Box>
      <hr />
      <h1 style={{ color: "#AAAAAA", textAlign: "center" }}>CHUPACABRA</h1>{" "}
      <br />
      <Container>
        <Row>
          <Column>
            <Heading>За сайта</Heading>
            <p>
              Целта на нашата уеб страница е да помогне, както в организацията
              на пристанищата, като ги автоматизира, так и на рибарите.
            </p>
          </Column>
          <Column>
            <Heading>Бързи връзки</Heading>
            <FooterLink href="../Login">
              <span style={{ marginLeft: "10px" }}>Влизане</span>
            </FooterLink>

            <FooterLink href="../Signup">
              <span style={{ marginLeft: "10px" }}>Регистрация</span>
            </FooterLink>

            <FooterLink href="../News">
              <span style={{ marginLeft: "10px" }}>Новини</span>
            </FooterLink>

            <FooterLink href="../Index">
              <span style={{ marginLeft: "10px" }}>Начало</span>
            </FooterLink>
          </Column>
          <Column>
            <Heading>Контакти</Heading>
            <p>
              За повече информаия моля свържете се с нас на посочения имейл:{" "}
              <br /> <FontAwesomeIcon icon={faEnvelope} />{" "}
              chupacabradevs@gmail.com
            </p>
          </Column>
          <Column>
            <Heading>Социални медии</Heading>
            <FooterLink href="#">
              <span style={{ marginLeft: "10px" }}>Facebook</span>
            </FooterLink>

            <FooterLink href="#">
              <span style={{ marginLeft: "10px" }}>Instagram</span>
            </FooterLink>

            <FooterLink href="#">
              <span style={{ marginLeft: "10px" }}>Twitter</span>
            </FooterLink>

            <FooterLink href="#">
              <span style={{ marginLeft: "10px" }}>Youtube</span>
            </FooterLink>
          </Column>
        </Row>
      </Container>
    </Box>
  );
};
export default Footer;
