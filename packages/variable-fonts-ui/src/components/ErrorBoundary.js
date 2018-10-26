import React from "react";
import PropTypes from "prop-types";
import { connect } from "~/store/connect";
import { reset } from "~/store/actions";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps() {
    this.setState({ hasError: false });
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true, error, info });
  }

  handleClick = () => {
    this.setState({ hasError: false });
    this.props.triggerReset();
  };

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Flex
          alignItems="center"
          justifyContent="center"
          direction="column"
          style={{ height: "100%" }}
        >
          <Flex.Item>
            <Flex direction="column" alignItems="center">
              <Flex.Item>
                <Text size="xl">Whooops. Something went wrong.</Text>
              </Flex.Item>
              <Flex.Item>
                <Text size="m">
                  {
                    "If it's not your fault but ours we are sorry. We suggest you to start all over"
                  }
                </Text>
              </Flex.Item>
              <Flex.Item>
                <Button onClick={this.handleClick}>Start again</Button>
              </Flex.Item>
              {this.state.error.codeFrame ? (
                <Flex.Item>
                  <Text size="m" spacing="s" style={{ textAlign: "center" }}>
                    {
                      "Here are some information that will help to clarify what has gone wrong."
                    }
                  </Text>
                  <pre
                    style={{
                      padding: "20px",
                      background: "#dadada",
                      maxHeight: "400px",
                      width: "500px",
                      overflow: "auto"
                    }}
                  >
                    <code>{this.state.error.codeFrame}</code>
                  </pre>
                </Flex.Item>
              ) : null}
            </Flex>
          </Flex.Item>
        </Flex>
      );
    }
    return this.props.children;
  }
}

const mapDispatchToProps = dispatch => ({
  triggerReset: () => {
    dispatch(reset());
  }
});

ErrorBoundary.propTypes = {
  triggerReset: PropTypes.func,
  children: PropTypes.node
};

export default connect(
  state => ({ ...state }),
  mapDispatchToProps
)(ErrorBoundary);
