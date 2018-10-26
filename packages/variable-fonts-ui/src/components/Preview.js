import React from "react";
import Textarea from "react-textarea-autosize";
// import { injectGlobal } from "styled-components";
// import { createGlobalStyle } from "styled-components";

class Preview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.text
    };
  }

  handleChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.text !== this.props.text) {
      this.setState({
        value: nextProps.text
      });
    }
  }

  render() {
    const { weight, slant } = this.props.options;
    return (
      <Textarea
        inputRef={this.props.forwardRef}
        onChange={this.handleChange}
        value={this.state.value}
        style={{
          width: "100%",
          fontFamily: "Inter UI",
          height: "auto",
          fontSize: "72px",
          resize: "none",
          border: "none",
          fontWeight: weight,
          transform: `scale(1) rotate(0deg) translate(0px, 0px) skew(-${slant}deg, 0deg)`
        }}
      />
    );
  }
}

export default Preview;
