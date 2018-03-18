import { Component } from "react";
import queryString from "query-string";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null
    };
  }

  login(callback) {
    var CLIENT_ID = "93a1dd69716b4bb9ad6e149ced3e7cb2";
    var REDIRECT_URI = "http://localhost:3000/";
    function getLoginURL(scopes) {
      return (
        "https://accounts.spotify.com/authorize?client_id=" +
        CLIENT_ID +
        "&redirect_uri=" +
        encodeURIComponent(REDIRECT_URI) +
        "&scope=" +
        encodeURIComponent(scopes.join(" ")) +
        "&response_type=token"
      );
    }

    var url = getLoginURL(["user-read-email"]);

    var width = 450,
      height = 730,
      left = screen.width / 2 - width / 2,
      top = screen.height / 2 - height / 2;

    window.addEventListener(
      "message",
      function(event) {
        var hash = JSON.parse(event.data);
        if (hash.type == "access_token") {
          callback(hash.access_token);
        }
      },
      false
    );

    window.location.replace(url);
  }

  getUserData(accessToken) {
    return $.ajax({
      url: "https://api.spotify.com/v1/me",
      headers: {
        Authorization: "Bearer " + accessToken
      }
    });
  }

  render() {
    return (
      <div role="button" onClick={this.login}>
        Login
      </div>
    );
  }
}
