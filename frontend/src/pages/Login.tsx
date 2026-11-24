import { useNavigate } from "react-router";
import Button from "../components/Button";
import { useState, type SubmitEvent } from "react";
import { api } from "../libs/api";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const handleLoginClick = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await api.get("/sanctum/csrf-cookie");
      await api.post("/login", {
        email: email,
        password: password,
      });

      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)){
        if(error.response?.status === 422) {
            const e = error.response.data.errors;        
            setErrorEmail(e?.email?.[0]);
            setErrorPassword(e?.password?.[0]);
        } 
        else if(error.response?.status === 429){
            setErrorEmail(error.response?.data.message);
        }
      }else {
        setErrorEmail("通信エラーが発生しました。");
      }
    }
  };

  function handleRegisterTransitionClick() {
    navigate("/register");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
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
