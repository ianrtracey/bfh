import { Component } from "react";
import queryString from "query-string";
import PropTypes from "prop-types";

export const authContextTypes = {
  getAuthToken: PropTypes.func
};

const ACCESS_TOKEN = "ACCESS_TOKEN";

export class AuthProvider extends Component {
  state = {
    token: null
  };

  static childContextTypes = authContextTypes;

  componentDidMount = () => {
    const parsedToken = queryString.parse(window.location.hash).access_token;
    console.log("found: ", parsedToken);
    if (parsedToken) {
      console.log("writing");
      window.localStorage.setItem(ACCESS_TOKEN, parsedToken);
    }

    this.setState({
      token: window.localStorage.getItem(ACCESS_TOKEN) || null
    });
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
