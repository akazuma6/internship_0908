import React from 'react';
// BrowserRouterをreact-router-domからインポートします
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Container, CssBaseline } from '@mui/material';
import Header from './components/Header';
import EmpList from './components/EmpList';
import MyPage from './pages/MyPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';


//
function App() {
  return (
    // Routerで全体を囲みます
    <Router>
      <AuthProvider>
        <CssBaseline />
        <Header />
        <Container component="main" sx={{ mt: 4, mb: 4 }}>
            <Routes>
              {/* ホームページ (従業員一覧) */}
              <Route path="/" element={<HomePage />} />

              {/* ログインページ */}
              {/* '/login/:userId' というパスで、userIdを動的に受け取れるようにします */}
              <Route path="/login/:userId" element={<LoginPage />} />

              {/* マイページ (要認証) */}
              <Route 
                path="/mypage/:userId"
                element={
                  <ProtectedRoute>
                    <MyPage />
                  </ProtectedRoute>
                }
              />

              {/* 従業員が選択されていない場合のログインページ（念のため）*/}
              <Route path="/login" element={<LoginPage />} />

            </Routes>
        </Container>
      </AuthProvider>
    </Router>
  );
}

export default App;

