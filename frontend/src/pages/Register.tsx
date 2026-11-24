import Button from "../components/Button";
import { useNavigate } from "react-router";
import { useState, type SubmitEvent } from "react";
import { api } from "../libs/api";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [errorUserName, setErrorUserName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const handleRegisterClick = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // API 'POST /register'実行し、成功ならhome画面に遷移
      await api.get("/sanctum/csrf-cookie");
      const response = await api.post("/register", {
        name: userName,
        email: email,
        password: password,
        password_confirmation: confirm,
      });

      if (response.status === 201) {
        navigate("/");
      } else {
        setErrorUserName("通信エラーが発生しました。");
      }
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
    }
  };

  function handleLoginTransitionClick() {
    navigate("/login");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
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
            <label
              htmlFor="name"
              className="block text-sm font-medium text-red-700"
            >
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
            <label
              htmlFor="name"
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
            autoComplete="new-password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 mb-4 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
          {errorPassword && (
            <label
              htmlFor="name"
              className="block text-sm font-medium text-red-700"
            >
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
          <Button type="submit">登録</Button>
        </div>
        <div className="flex justify-center">
          <Button type="button" onClick={handleLoginTransitionClick}>
            ログイン
          </Button>
        </div>
      </form>
    </main>
  );
}
