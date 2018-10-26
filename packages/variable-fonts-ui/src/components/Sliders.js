import React from "react";
import Rheostat from "rheostat";
import styled from "styled-components";

const SliderWrapper = styled.div`
  padding: 20px 0;
  display: flex;
  flex-direction: column;
`;

class Sliders extends React.Component {
  render() {
    return (
      <div>
        {Object.keys(this.props.options).map(key => (
          <SliderWrapper key={key}>
            <span style={{ padding: "0 0 20px" }}>
              {this.props.options[key].name}
            </span>
            <Rheostat
              onChange={val => this.props.onChange(key, val)}
              min={this.props.options[key].min}
              max={this.props.options[key].max}
              values={[this.props.values[key]]}
            />
          </SliderWrapper>
        ))}
      </div>
    );
  }
}

export default Sliders;
