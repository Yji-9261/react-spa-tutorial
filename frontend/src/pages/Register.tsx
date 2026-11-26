import { useState, useRef, type SubmitEvent } from "react";
import Button from "../components/Button";

import axios from "axios";
import { useNavigate } from "react-router";

import { useApi } from "../Hooks/Api";
import { useAuth } from "../Hooks/Auth";
import type { UserData } from "../types/User";
import LoadingDialog from "../components/LoadingDialog";

export default function Register() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [errorUserName, setErrorUserName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const { login } = useAuth();
  const loadingDialogRef = useRef<HTMLDialogElement>(null);

  const handleRegisterClick = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 通信中モーダルウィンドウを出し、ボタンの入力を無効化する
    loadingDialogRef.current?.showModal();

    // 前回の送信エラーメッセージをクリア
    setErrorUserName("");
    setErrorEmail("");
    setErrorPassword("");

    try {
      // 登録APIを実行
      await useApi.post("/register", {
        name: userName,
        email: email,
        password: password,
        password_confirmation: confirm,
      });

      // 登録成功時にユーザー情報を取得して状態を更新
      const response = await useApi.get<UserData>("/api/v1/user");
      login(response.data);
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 422) {
        console.log(error.response.data.errors);
        const e = error.response.data.errors;

        // 422エラー例外に入る
        setErrorUserName(e?.name?.[0]);
        setErrorEmail(e?.email?.[0]);
        setErrorPassword(e?.password?.[0]);
      } else {
        setErrorUserName("通信エラーが発生しました。");
        console.log(error);
      }
    } finally {
      // 通信中モーダルウィンドウを閉じ、ボタンの入力を有効化する
      loadingDialogRef.current?.close();
    }
  };

  function handleLoginTransitionClick() {
    navigate("/login");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <LoadingDialog ref={loadingDialogRef} />
      <form onSubmit={handleRegisterClick}>
        <h1 className="flex justify-center font-bold mb-4 text-xl">
          アカウントを作成
        </h1>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            名前
          </label>
          <input
            id="name"
            type="text"
            autoComplete="off"
            placeholder="user name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="mt-1 mb-4 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
          {errorUserName && (
            <label className="block text-sm font-medium text-red-700">
              {errorUserName}
            </label>
          )}
        </div>

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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 mb-4 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
          {errorEmail && (
            <label className="block text-sm font-medium text-red-700">
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
            autoComplete="new-password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 mb-4 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
          {errorPassword && (
            <label className="block text-sm font-medium text-red-700">
              {errorPassword}
            </label>
          )}
        </div>
        <div>
          <label
            htmlFor="confirm"
            className="block text-sm font-medium text-gray-700"
          >
            確認
          </label>
          <input
            id="confirm"
            name="confirm"
            type="password"
            autoComplete="new-password"
            placeholder="パスワード確認"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="mt-1 mb-4 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div className="flex justify-center mb-4">
          <Button name="submit" type="submit">
            登録
          </Button>
        </div>
        <div className="flex justify-center">
          <Button
            name="login"
            type="button"
            onClick={handleLoginTransitionClick}
          >
            ログイン
          </Button>
        </div>
      </form>
    </main>
  );
}
