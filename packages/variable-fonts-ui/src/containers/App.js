import React from 'react';
import PropTypes from 'prop-types';
import { connect } from '~/store/connect';
import App from '~/components/App';

const AppComponent = props => <App {...props} />;

AppComponent.propTypes = {
  children: PropTypes.object,
};

export default connect(state => ({ ...state }))(AppComponent);
