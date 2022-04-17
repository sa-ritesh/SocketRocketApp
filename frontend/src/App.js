import { Fragment } from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { Container, Row } from "reactstrap";
import Header from "./components/Header";
import LiveVisitors from "./components/LiveVisitors";
import PublicChat from "./components/PublicChat";

function App() {
  return (
    <div className="App">
      <Fragment>
        <Container>
          <Row>
            <BrowserRouter>
              <Header />
              <Routes>
                <Route path="/" exact element={<LiveVisitors />} />
                <Route path="/publicChat" exact element={<PublicChat />} />
              </Routes>
            </BrowserRouter>
          </Row>
        </Container>
      </Fragment>
    </div>
  );
}

export default App;
