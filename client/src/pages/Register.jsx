
import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { LoadingButton } from "@mui/lab";
import { Link } from 'react-router-dom';
import authApi from '../api/authApi';


const Register = () => {

  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");
  const [confirmErrText, setconfirmErrText] = useState("");
  const [error, setError] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();

    setUsernameErrText("");
    setPasswordErrText("");
    setconfirmErrText("");
    setError("");
    const data = new FormData(e.target);
    const username = data.get("username").trim();
    const password = data.get("password").trim();
    const confirmPassword = data.get("confirmPassword").trim();


    console.log(username);
    console.log(password);
    console.log(confirmPassword);
    let isError = false;
    if (username === "") {
      setUsernameErrText("名前を入力してください");
      isError = true;
    }

    if (password === "") {
      setPasswordErrText("パスワードを入力してください");
      isError = true;
    }
    if (confirmPassword === "") {
      setconfirmErrText("確認用パスワードを入力してください");
      isError = true;
    }
    if (password !== confirmPassword) {

      setconfirmErrText("パスワードと確認用パスワードが異なります。");
      isError = true;
    }
    if (isError) return;

    //新規登録APIを叩く
    try {
      const res = await authApi.register({ username, password, confirmPassword });
      localStorage.setItem("token", res.token);
      console.log("新規登録に成功しました。");
    } catch (err) {
      console.log("全体のエラー:", err);
      console.log("APIのレスポンス:", err?.response);
      console.log("APIのエラーデータ:", err?.response?.data);
      console.log("APIのバリデーションエラー:", err?.response?.data?.errors);

      const errors = err?.response?.data?.errors;

      if (Array.isArray(errors)) {
        errors.forEach((error) => {
          // param ではなく "field" が使われている
          switch (error?.field) {
            case "username":
              setUsernameErrText(error.msg);
              break;
            case "password":
              setPasswordErrText(error.msg);
              break;
            case "confirmPassword":
              setconfirmErrText(error.msg);
              break;
            default:
              break;
          }
        });
      } else {
        setError("予期しないエラーが発生しました。");
      }
    }


  };
  return (
    <>
      <Box component="form" onSubmit={handlesubmit} noValidate>
        <TextField fullWidth id="username" label="お名前" margin="normal" name="username" required helperText={usernameErrText} error={usernameErrText !== ""} />
        <TextField fullWidth id="password" label="パスワード" margin="normal" name="password" required helperText={passwordErrText} error={passwordErrText !== ""} />
        <TextField fullWidth id="confirmPassword" label="確認用パスワード" margin="normal" name="confirmPassword" required helperText={confirmErrText} error={confirmErrText !== ""} />
        <LoadingButton sx={{ mt: 3, mb: 2 }} fullWidth type="submit" loading={false} color="primary" variant="outlined">アカウント作成</LoadingButton>
      </Box>

      <Button component={Link} to="/login">すでにアカウントを持っていますか？ログイン</Button>
    </>
  );

};

export default Register;
