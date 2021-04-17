import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Main from "./components/Main/Main";
import Calendar from "./components/Calendar/Calendar";
import Details from "./components/Deatails/Details";
import "./css/style.css";
import Features from "./components/Features/Features";
import Footer from "./components/Footer/Footer";
// import { render } from "react-dom";
import FetchData from "./service/FetchData";

class App extends React.Component {
  FetchData = new FetchData();

  state = {
    rocket: "Falcon 1",
    rocketFeatures: null,
    rockets: [],
    company: null,
  };

  componentDidMount() {
    this.updateRocket();
    this.updateCompany();
  }

  updateRocket() {
    this.FetchData.getRocket()
      .then((data) => {
        this.setState({ rockets: data.map((item) => item.name) });
        return data;
      })
      .then((data) => data.find((item) => item.name === this.state.rocket))
      .then((rocketFeatures) => {
        this.setState({ rocketFeatures });
      });
  }

  updateCompany() {
    this.FetchData.getCompany().then((data) => {
      return this.setState({ company: data });
    });
  }

  changeRocket = (rocket) => {
    this.setState(
      {
        rocket,
      },
      this.updateRocket
    );
  };

  render() {
    return (
      <BrowserRouter>
        <Header rockets={this.state.rockets} changeRocket={this.changeRocket} />
        <Route
          exact
          path="/"
          render={() =>
            this.state.company && <Home company={this.state.company} />
          }
        />

        <Route path="/rocket">
          <Main rocket={this.state.rocket} />
          {this.state.rocketFeatures && (
            <Features {...this.state.rocketFeatures} />
          )}
        </Route>
        <Route path="/calendar" component={Calendar} />
        <Route path="/details/:id" component={Details} />

        {this.state.company && <Footer {...this.state.company} />}
      </BrowserRouter>
    );
  }
}

export default App;
