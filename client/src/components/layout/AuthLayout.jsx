import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import notionLogo from "../../assets/images/notion-logo.png"

const AuthLayout = () => {
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
