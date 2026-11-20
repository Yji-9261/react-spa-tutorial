import { useNavigate } from "react-router";
import Button from "../components/Button";
import type { SubmitEvent } from "react";


export default function Login() {
    const navigate = useNavigate();

  const handleLoginClick = async (e: SubmitEvent<HTMLFormElement>)=>{
      e.preventDefault();
  
      // API 'POST /login'実行し、成功ならhome画面に遷移
  
      navigate('/');
    };

  function handleRegisterTransitionClick() {
    navigate('/register');
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <form onSubmit={handleLoginClick}>
        <h1 className="flex justify-center font-bold mb-4 text-xl">
          ログイン
        </h1>
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
            className="mt-1 mb-4 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
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
            className="mt-1 mb-4 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
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
