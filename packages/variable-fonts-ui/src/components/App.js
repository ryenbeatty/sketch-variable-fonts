import React, { Component } from "react";
import styled, { createGlobalStyle } from "styled-components";
// import domtoimage from "dom-to-image";
import html2canvas from "html2canvas";

import Preview from "./Preview";
import Sliders from "./Sliders";

const Wrapper = styled.div``;

const Button = styled.button`
  background: none;
  color: white;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  background: #2066ff;
  padding: 3px 12px;
  height: 30px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.2px;
`;

const Select = styled.select`
  background: none;
  color: black;
  appearance: none;
  margin: 0;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  background: #f9f9f9;
  padding: 3px 12px;
  height: 30px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 14px;
  font-weight: 400;
  position: relative;
  width: 100%;
  letter-spacing: 0.2px;
  div {
    position: absolute;
    width: 10px;
    height: 10px;
    background: red;
  }
`;
const fontSchema = {
  name: "Inter UI",
  variables: {
    slant: {
      name: "Slant",
      min: 0,
      max: 10
    },
    weight: {
      name: "Weight",
      min: 400,
      max: 900
    }
  }
};

const GlobalStyle = createGlobalStyle`
body {
  font-family: Space Mono;
}
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "Change me",
      slant: 0,
      weight: 400
    };
  }

  componentDidMount() {
    window.setTextContent = text => {
      this.setState(
        Object.assign({}, this.state, {
          text
        })
      );
    };
  }

  handleChange = (key, value) => {
    this.setState({
      [key]: value.values[0]
    });
  };

  renderImage = () => {
    window.postMessage("render", {
      width: this.textarea.offsetWidth,
      height: this.textarea.offsetHeight
    });
  };

  render() {
    return (
      <Wrapper>
        <GlobalStyle />
        <Preview
          text={this.state.text}
          options={this.state}
          forwardRef={ref => {
            this.textarea = ref;
          }}
        />
        <div style={{ padding: "20px" }}>
          <Select>
            <option value="Inter UI">Inter UI</option>
            <option value="Gingham">Gingham</option>
            <option value="Inter UI">Source Code</option>
            <option value="Inter UI">Source Sans</option>
          </Select>
          <Sliders
            options={fontSchema.variables}
            values={this.state}
            onChange={this.handleChange}
          />
          <Button onClick={this.renderImage}>Print to Canvas</Button>
        </div>
      </Wrapper>
    );
  }
}

export default App;
