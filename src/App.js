import React from "react";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
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
      <>
        <Header rockets={this.state.rockets} changeRocket={this.changeRocket} />
        <Main rocket={this.state.rocket} />
        {this.state.rocketFeatures && (
          <Features {...this.state.rocketFeatures} />
        )}
        {this.state.company && <Footer {...this.state.company.links} />}
      </>
    );
  }
}

export default App;
