// ProtectedRoute.tsx
import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../Hooks/Auth";
import { useApi } from "../Hooks/Api";
import type { UserData } from "../types/User";

export function LogedinRoute() {
  const { login, logout } = useAuth();
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const [isSessionChecking, setIsSessionChecking] = useState(true);

  // zustandのisAuthenticatedはメモリ管理
  // 再読み込みを行うと初期値のfalseを返すため
  // 認証状態をサーバーに再確認する仕様とする
  useEffect(() => {
    const checkAuth = async () => {
      console.log("Checking authentication status...");

      try {
        const response = await useApi.get<UserData>("/api/v1/user");

        // ユーザー情報が取得できた場合、ログイン状態に設定
        if (response.data.name !== null) {
          login(response.data);
        } else {
          console.error("予期せぬエラー");
          logout();
        }
      } catch(error) {
        console.log(error);
      } finally {
        // ロード完了とする
        setIsSessionChecking(false);
      }
    };

    // 非同期でユーザー情報を取得して、認証状態を更新する
    checkAuth();
  }, [login, logout]);

  // 認証状態trueならOutletを返す。falseならログイン画面にリダイレクトする。
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  // 認証確認中なら、ユーザー認証確認中のメッセージを表示する
  if (isSessionChecking) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="animate-pulse text-lg text-gray-800 font-bold">
          ユーザー認証確認中
        </p>
      </div>
    );
  }

  return <Outlet />;
}
