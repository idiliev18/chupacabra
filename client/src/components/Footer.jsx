import React from "react";
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
      <h1 style={{ color: "white", 
                   textAlign: "center", 
                   marginTop: "-50px" }}>
        CHUPACABRA
      </h1>
      <Container>
        <Row>
          <Column>
            <Heading>За нас</Heading>
            <p>Тук трябва да напишем информация за нас</p>
          </Column>
          <Column>
            <Heading>Бързи връзки</Heading>
            <p>Тук трябва да сложим линкове към другите страници</p>
          </Column>
          <Column>
            <Heading>Контакти</Heading>
            <p>Тук трябва да сложим различни контакти</p>
          </Column>
          <Column>
            <Heading>Социални медии</Heading>
            <FooterLink href="#">
              <i className="fab fa-facebook-f">
                <span style={{ marginLeft: "10px" }}>
                  Facebook
                </span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-instagram">
                <span style={{ marginLeft: "10px" }}>
                  Instagram
                </span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-twitter">
                <span style={{ marginLeft: "10px" }}>
                  Twitter
                </span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-youtube">
                <span style={{ marginLeft: "10px" }}>
                  Youtube
                </span>
              </i>
            </FooterLink>
          </Column>
        </Row>
      </Container>
    </Box>
  );
};
export default Footer;
