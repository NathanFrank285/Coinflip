import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      await dispatch(signUp(username, email, password));
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/portfolio" />;
  }

  return (
    <form className='splash-form' onSubmit={onSignUp}>
      <div>
        <div className='login-label'>
          <label>User Name</label>
        </div>
        <input
          className='login-input'
          type="text"
          name="username"
          onChange={updateUsername}
          placeholder='User Name'
          value={username}
        ></input>
      </div>
      <div>
        <div className='login-label'>
          <label>Email</label>
        </div>
        <input
          className='login-input'
          type="text"
          name="email"
          onChange={updateEmail}
          placeholder='Email'
          value={email}
        ></input>
      </div>
      <div>
        <div className='login-label'>
          <label>Password</label>
        </div>
        <input
          className='login-input'
          type="password"
          name="password"
          onChange={updatePassword}
          placeholder='Password'
          value={password}
        ></input>
      </div>
      <div>
        <div className='login-label'>
          <label>Repeat Password</label>
        </div>
        <input
          className='login-input'
          type="password"
          name="repeat_password"
          onChange={updateRepeatPassword}
          placeholder='Repeat Password'
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <div className='btn-div'>
        <button className='login-btn' type="submit">Sign Up</button>
      </div>
    </form>
  );
};

export default SignUpForm;
