import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import authUtils from '../../utils/authUtils';
import notionLogo from "../../assets/images/notion-logo.png"

const AuthLayout = () => {

  const navigate = useNavigate();
  useEffect(() => {
    const cheakAuth = async () => {
      const isAuth = await authUtils.isAuthenticated();
      if (isAuth) {
        navigate("/");
      }
    };
    cheakAuth();
  }, [navigate]);
  return (
    <div>AuthLayout
      <Container component="main" maxWidth="xs">
        <Box sx={{
          marginTop: 6,
          diaplay: "flex",
          flexDirection: "colunm"
        }}>
          <img src={notionLogo} alt=""
            style={{ width: 100, height: 100, marginBottom: 3 }} />
          Notionクローン開発

        </Box>
        <Outlet />
      </Container>
    </div>
  )
};

export default AuthLayout;
