import { Container, Row, Col } from "react-bootstrap";

interface FooterProps extends React.HTMLProps<HTMLDivElement> {}

const Footer: React.FC<FooterProps> = (props) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={props.className}>
      <Container>
        <Row>
          <Col className="text-center py-3">
            <p>TechTrove &copy; {currentYear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
