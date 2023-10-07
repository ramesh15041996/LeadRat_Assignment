import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function TicketNav() {
  return (
    <>
      <Navbar bg="danger" variant="light">
        <Container>
          <Navbar.Brand href="#home">Leadrat</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#pricing">Book-My-Seat</Nav.Link>
          </Nav>
          
        </Container>
      </Navbar>
      <br />
    </>
  );
}

export default TicketNav;
