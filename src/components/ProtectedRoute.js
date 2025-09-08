import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

/**
 * 認証が必要なルートを保護するコンポーネント
 */
const ProtectedRoute = ({ children }) => {
    const { authToken } = useContext(AuthContext);

    if (!authToken) {
        // ログインしていない場合は、ユーザー選択画面（ホームページ）にリダイレクト
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;

