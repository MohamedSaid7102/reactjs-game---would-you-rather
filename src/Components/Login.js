import React, { Component } from 'react';
import { checkLoginUser } from '../utils/helpers';
import { connect } from 'react-redux';
import { setAuthedUser } from '../Redux/Actions/authedUser';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  state = {
    userName: '',
    pass: '',
    authed: false,
  };
  handleSignIn = async (e) => {
    e.preventDefault();
    if (this.state.userName && this.state.pass) {
      let userCheck = await checkLoginUser(
        this.state.userName,
        this.state.pass
      );

      this.setState({
        authed: userCheck != null,
      });

      if (this.state.authed) this.props.dispatch(setAuthedUser(userCheck));
      else this.props.dispatch(setAuthedUser(null)); // TODO: I might change this later.

      this.setState({
        userName: '',
        pass: '',
      });
    }
  };
  render() {
    // TODO: add loading effect when login in and the user is authed & show error messege if the user is not authed
    if (this.state.authed) return <Redirect path="/" />;
    return (
      <div className="login-container">
        <h1 className="login__header">Login</h1>
        <form onSubmit={this.handleSignIn}>
          <label htmlFor="userName">User Name</label>
          <input
            type="text"
            id="userName"
            value={this.state.userName}
            onChange={(e) => this.setState({ userName: e.target.value })}
          />
          <label htmlFor="userName">password</label>
          <input
            type="password"
            id="userName"
            value={this.state.pass}
            onChange={(e) => this.setState({ pass: e.target.value })}
          />
          <center>
            <button type="submit" className="login__button">
              Login
            </button>
          </center>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser,
  };
};
export default connect(mapStateToProps)(Login);