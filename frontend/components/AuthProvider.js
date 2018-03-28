import { Component } from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';

export const authContextTypes = {
  getAuthToken: PropTypes.func,
};

const ACCESS_TOKEN_KEY = '__BFH_ACCESS_TOKEN__';
const testToken =
  'BQCXiIjpSLPqiI29IgQg1rW1X_biAeMiRfV_ozx3ZQHDVQkfkEwH1JXv6mGD9620yMwDGXC27uw6sDvQwVDw3_5BXJu1zUGgHD2jbSR30fbeb2f55kqoK49dza51d2R_J263aBT2vXKqj5B0t5k-xhB4viJC6tYL1hgkJx0MLAZzelaH1ZACb3kAiQD1sHUi1QKb7dHNdf9VXeUveAKggAjlQ7vwCgYPsNJ3GLusWZHSqg0RGCHM2zAw';

export class AuthProvider extends Component {
  state = {
    token: null,
  };

  static childContextTypes = authContextTypes;

  componentDidMount = () => {
    const parsedToken = queryString.parse(window.location.hash).access_token;
    if (parsedToken) {
      console.log('writing token');
      window.localStorage.setItem(ACCESS_TOKEN_KEY, parsedToken);
    }

    this.setState({
      token: 'dd',
    });
    console.log('state:', this.state);
  };

  getChildContext() {
    return {
      getAuthToken: () => ({
        token: testToken,
      }),
    };
  }

  render() {
    return <span>{this.props.children}</span>;
  }
}

export const withAuth = WrappedComponent => {
  const Wrapper = (props, { getAuthToken }) => (
    <WrappedComponent getAuthToken={getAuthToken} {...props} />
  );

  Wrapper.contextTypes = authContextTypes;

  return Wrapper;
};
