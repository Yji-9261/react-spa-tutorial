import { useState, useRef, type SubmitEvent } from "react";

import axios from "axios";
import { useNavigate } from "react-router";

import Button from "../components/Button";
import LoadingDialog from "../components/LoadingDialog";
import { useApi } from "../Hooks/Api";
import { useAuth } from "../Hooks/Auth";
import type { UserData } from "../types/User";


export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const {login } = useAuth();
  const loadingDialogRef = useRef<HTMLDialogElement>(null);

  const handleLoginClick = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // 通信中モーダルウィンドウを出し、ボタンの入力を無効化する
    loadingDialogRef.current?.showModal();

    // 前回の送信エラーメッセージをクリア
    setErrorEmail("");
    setErrorPassword("");

    try {
      await useApi.post("/login", {
        email: email,
        password: password,
      });

      // ログイン成功時にユーザー情報を取得して状態を更新
      const response = await useApi.get<UserData>("/api/v1/user");
      login(response.data);

      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 422) {
          const e = error.response.data.errors;
          setErrorEmail(e?.email?.[0]);
          setErrorPassword(e?.password?.[0]);
        } else if (error.response?.status === 429) {
          setErrorEmail(error.response?.data.message);
        } else {
          setErrorEmail("通信エラーが発生しました。");
        }
      }
    }finally {
      // モーダルウィンドウを閉じる
      loadingDialogRef.current?.close();
    }
  };

  function handleRegisterTransitionClick() {
    navigate("/register");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <LoadingDialog ref={loadingDialogRef} />
      <form onSubmit={handleLoginClick}>
        <h1 className="flex justify-center font-bold mb-4 text-xl">ログイン</h1>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            メールアドレス
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="user@example.com"
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 mb-4 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
          {errorEmail && (
            <label
              htmlFor="email"
              className="block text-sm font-medium text-red-700"
            >
              {errorEmail}
            </label>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            パスワード
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="パスワード"
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 mb-4 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
          {errorPassword && (
            <label
              htmlFor="email"
              className="block text-sm font-medium text-red-700"
            >
              {errorPassword}
            </label>
          )}
        </div>

        <div className="flex justify-center mb-4">
          <Button type="submit">ログイン</Button>
        </div>
        <div className="flex justify-center">
          <Button type="button" onClick={handleRegisterTransitionClick}>
            新規登録
          </Button>
        </div>
      </form>
    </main>
  );
}
