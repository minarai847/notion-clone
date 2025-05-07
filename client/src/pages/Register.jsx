
import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { LoadingButton } from "@mui/lab";
import { Link } from 'react-router-dom';
import authApi from '../api/authApi';


const Register = () => {
  const handlesubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const username = data.get("username").trim();
    const password = data.get("password").trim();
    const confirmPassword = data.get("confirmPassword").trim();

    console.log(username);
    console.log(password);
    console.log(confirmPassword);
    //新規登録APIを叩く
    try {
      const res = await authApi.register({ username, password, confirmPassword });
      localStorage.setItem("token", res.token);
      console.log("新規登録に成功しました。");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <Box component="form" onSubmit={handlesubmit}>
        <TextField fullWidth id="username" label="お名前" margin="normal" name="username" required />
        <TextField fullWidth id="password" label="パスワード" margin="normal" name="password" required />
        <TextField fullWidth id="confirmPassword" label="確認用パスワード" margin="normal" name="confirmPassword" required />
        <LoadingButton sx={{ mt: 3, mb: 2 }} fullWidth type="submit" loading={false} color="primary" variant="outlined">アカウント作成</LoadingButton>
      </Box>

      <Button component={Link} to="/login">すでにアカウントを持っていますか？ログイン</Button>
    </>
  );

};

export default Register;
