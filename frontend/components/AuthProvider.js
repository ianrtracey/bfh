import { Component } from "react";
import queryString from "query-string";
import PropTypes from "prop-types";

export const authContextTypes = {
  getAuthToken: PropTypes.func
};

const ACCESS_TOKEN_KEY = "ACCESS_TOKEN";

export class AuthProvider extends Component {
  state = {
    token: null
  };

  static childContextTypes = authContextTypes;

  componentDidMount = () => {
    const parsedToken = queryString.parse(window.location.hash).access_token;
    if (parsedToken) {
      console.log('writing token')
      window.localStorage.setItem(ACCESS_TOKEN_KEY, parsedToken);
    }

    this.setState({
      token: window.localStorage.getItem(ACCESS_TOKEN_KEY)
    });
    console.log(this.state)
  };

  getChildContext() {
    return {
      getAuthToken: () => this.state
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
