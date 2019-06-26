import React, { Component } from "react";

class Thumb extends Component {
  state = {
    token: false
  };

  handleMedsToken = () => {
    this.setState(prevState => {
      return { token: !prevState.token };
    });
  };

  render() {
    let style = {
      cursor: "pointer"
    };
    return (
      <i
        onClick={this.handleMedsToken}
        style={{ style }}
        className={
          this.state.token
            ? "fa fa-thumbs-o-up fa-lg"
            : "fa fa-thumbs-o-down fa-lg"
        }
        aria-hidden="true"
      />
    );
  }
}

export default Thumb;
