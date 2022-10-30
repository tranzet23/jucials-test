import { Container, Row, Col } from 'reactstrap';
import { IFooterProps } from './FooterTypes';

const Footer = ({ companyName, tagline }: IFooterProps) => {
  return (
    <>
      <footer className='footer'>
        <Container fluid={true}>
          <Row>
            <Col md={6}>
              {new Date().getFullYear()} © {companyName}
            </Col>
            <Col md={6}>
              <div className='text-sm-end d-none d-sm-block'>{tagline}</div>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
