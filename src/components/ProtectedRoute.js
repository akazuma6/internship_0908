import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

/**
 * 認証が必要なルートを保護するコンポーネント
 */
//propをそのまま使わせるか、ホーム/に強制的に戻すかの門番
//ホームに戻すのはgetInitialAuthTokenがerrorをキャッチしたときかnullがsetされたとき
const ProtectedRoute = ({ children }) => {
    const { authToken } = useContext(AuthContext);

    if (!authToken) {
        console.log('authTokenがセットされていないためホームに強制的に移動します')
        // ログインしていない場合は、ユーザー選択画面（ホームページ）にリダイレクト
        return <Navigate to="/" />;
    }

    return children;
};


export default ProtectedRoute;

