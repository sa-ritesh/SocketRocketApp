import { Fragment } from "react";
import { Container, Row } from "reactstrap";
import Header from "./components/Header";
import LiveVisitors from "./components/LiveVisitors";

function App() {
  return (
    <div className="App">
      <Fragment>
        <Header />
        <Container>
          <Row>
            <LiveVisitors />
          </Row>
        </Container>
      </Fragment>
    </div>
  );
}

export default App;
