import './App.css';
import Login from './pages/login';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from './components/layout/AuthLayout';
import Register from './pages/Register';
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { CssBaseline } from '@mui/material';
import { blue } from '@mui/material/colors';
import Home from './pages/Home';
import AppLayout from './components/layout/AppLayout';

function App() {
  const theme = createTheme({
    palette: { primary: blue },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline></CssBaseline>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="memo" element={<Home />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="login" element={<Login />}></Route>
            <Route path="register" element={<Register />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
