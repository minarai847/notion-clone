
import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from 'react-router-dom';
import authApi from '../api/authApi';


const Login = () => {
  const navigate = useNavigate();
  const [usernameErrText, setUsernameErrText] = useState("");
  const [passwordErrText, setPasswordErrText] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlesubmit = async (e) => {
    e.preventDefault();

    setUsernameErrText("");
    setPasswordErrText("");
    setError("");
    const data = new FormData(e.target);
    const username = data.get("username").trim();
    const password = data.get("password").trim();

    console.log(username);
    console.log(password);
    let isError = false;

    // ユーザー名のバリデーション
    if (username === "") {
      setUsernameErrText("名前を入力してください");
      isError = true;
    } else if (username.length < 8) {
      setUsernameErrText("ユーザー名は８文字以上である必要があります。");
      isError = true;
    }

    // パスワードのバリデーション
    if (password === "") {
      setPasswordErrText("パスワードを入力してください");
      isError = true;
    } else if (password.length < 8) {
      setPasswordErrText("パスワードは８文字以上である必要があります");
      isError = true;
    }



    if (isError) return;

    setLoading(true);
    //新規登録APIを叩く
    try {
      const res = await authApi.register({ username, password });
      setLoading(false);
      localStorage.setItem("token", res.token);
      console.log("新規登録に成功しました。");
      navigate("/");
    } catch (err) {
      setLoading(false);
      console.log(err);

      const errors = err?.response?.data?.errors;

      if (Array.isArray(errors)) {
        errors.forEach((error) => {
          // express-validatorはpathフィールドを使用
          const field = error?.path || error?.field;
          switch (field) {
            case "username":
              setUsernameErrText(error.msg);
              break;
            case "password":
              setPasswordErrText(error.msg);
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
        <LoadingButton sx={{ mt: 3, mb: 2 }} fullWidth type="submit" loading={loading} color="primary" variant="outlined">ログイン</LoadingButton>
      </Box>

      <Button component={Link} to="/login">アカウントを持っていませんか？新規登録</Button>
    </>
  );

};

export default Login;
