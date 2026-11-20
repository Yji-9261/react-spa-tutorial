import Button from "../components/Button";
import { useNavigate } from "react-router";
import type { SubmitEvent } from "react";

export default function Register() {
    const navigate = useNavigate();


  const handleRegisterClick = async (e: SubmitEvent<HTMLFormElement>)=>{
    e.preventDefault();

    // API 'POST /register'実行し、成功ならhome画面に遷移

    navigate('/');
  };

  function handleLoginTransitionClick() {
    navigate('/login');
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
            className="mt-1 mb-4 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
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
            autoComplete="new-password"
            placeholder="パスワード"
            className="mt-1 mb-4 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
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
