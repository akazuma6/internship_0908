import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { API_BASE_URL } from '../config';

// 修正点: createContextにデフォルト値を設定します。
// これにより、Providerの外部でContextが呼び出された際のクラッシュを防ぎ、
// どの値が欠けているかを明確にします。
const AuthContext = createContext({
    user: null,
    authToken: null,
    loginUser: async () => { console.error("loginUser function called outside of an AuthProvider"); },
    logoutUser: () => { console.error("logoutUser function called outside of an AuthProvider"); },
});

export default AuthContext;

export const AuthProvider = ({ children }) => {
    // ローカルストレージからトークンを安全に読み込む関数
    const getInitialAuthToken = () => {
        try {
            const token = localStorage.getItem('authToken');
            return token ? JSON.parse(token) : null;
        } catch (error) {
            console.error("Failed to parse auth token from localStorage", error);
            return null;
        }
    };

    const [authToken, setAuthToken] = useState(getInitialAuthToken);
    const [user, setUser] = useState(() => (authToken ? jwtDecode(authToken.access) : null));
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // ログイン処理
    const loginUser = async (username, password) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/token/`, {
                username: username,
                password: password,
            });

            if (response.status === 200) {
                const data = response.data;
                setAuthToken(data);
                setUser(jwtDecode(data.access));
                localStorage.setItem('authToken', JSON.stringify(data));
                navigate(`/mypage/${username}`);
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert('ログインに失敗しました。従業員番号とパスワードを確認してください。');
        }
    };

    // ログアウト処理
    const logoutUser = () => {
        setAuthToken(null);
        setUser(null);
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    const contextData = {
        user,
        authToken,
        loginUser,
        logoutUser,
    };
    
    // アプリの初回読み込み時やトークンが変更された時にユーザー情報を更新し、
    // ローディング状態を管理します。
    useEffect(() => {
        if (authToken) {
            setUser(jwtDecode(authToken.access));
        } else {
            setUser(null);
        }
        setLoading(false);
    }, [authToken]);


    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};

