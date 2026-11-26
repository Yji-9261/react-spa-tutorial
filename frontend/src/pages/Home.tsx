import { useRef, useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import ItemsDialog from "../components/ItemsDialog";
import { useApi } from "../Hooks/Api";
import type { GachaItem } from "../types/GachaItem";
import axios from "axios";
import LoadingDialog from "../components/LoadingDialog";
import { useAuth } from "../Hooks/Auth";

export default function Home() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [gachaItems, setGachaItems] = useState<GachaItem[] | null>(null);
  const itemsDialogRef = useRef<HTMLDialogElement>(null);
  const loadingDialogRef = useRef<HTMLDialogElement>(null);
  const { user, logout } = useAuth();
  const userName = user?.name;

  // ガチャ実行
  async function handleGachaClick() {
    // 前回のエラーメッセージをクリア
    setErrorMessage("");
    // 多重押下を防ぐために、サブウィンドウを表示する前にローディングダイアログを表示する
    loadingDialogRef.current?.showModal();

    try {
      const response = await useApi.post("/api/v1/lottery");
      const gachaItem: GachaItem = response.data.data;
      navigate("/gacha", { state: gachaItem });
    } catch {
      setErrorMessage("ガチャを実行できませんでした。");
    } finally {
      loadingDialogRef.current?.close();
    }
  }

  // アイテム一覧取得APIを実行し、返ってきたjsonをGacahItemに変換してstateに格納する
  async function handleItemsClick() {
    // 前回のエラーメッセージをクリア
    setErrorMessage("");
    // 多重押下を防ぐために、サブウィンドウを表示する前にローディングダイアログを表示する
    loadingDialogRef.current?.showModal();

    try {
      // すでにアイテム一覧が取得済みの場合は、APIを実行せずにサブウィンドウを表示する
      if (gachaItems === null) {
        // アイテム一覧取得API実行し、返ってきたjsonをGacahItemに変換
        const response = await useApi.get("/api/v1/items");
        setGachaItems(response.data.data);
      }
      // サブウィンドウを表示
      itemsDialogRef.current?.showModal();
    } catch (e) {
      setErrorMessage("通信エラーが発生しました。");
      console.log(e);
    } finally {
      loadingDialogRef.current?.close();
    }
  }

  // ログアウト処理
  async function handleLogoutClick() {
    // ログアウトAPI実行し、成功したらログイン画面に遷移する
    loadingDialogRef.current?.showModal();
    try {
      // ログアウトAPI実行し、zustandの認証状態をクリアする
      await useApi.post("/logout");
      logout();
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(
          error.response?.data?.message ?? "ログアウトできませんでした。",
        );
      } else {
        setErrorMessage("通信エラーが発生しました。");
      }
      console.log(error);
    } finally {
      loadingDialogRef.current?.close();
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <ItemsDialog items={gachaItems ?? []} ref={itemsDialogRef} />
      <LoadingDialog ref={loadingDialogRef} />

      <div className="flex flex-col items-center gap-4">
        <h1 className="font-bold mb-4 text-xl">こんにちは{userName}さん</h1>

        <Button type="button" onClick={handleGachaClick}>
          ガチャを引く
        </Button>

        <Button type="button" onClick={handleItemsClick}>
          アイテム一覧
        </Button>

        <Button type="button" onClick={handleLogoutClick}>
          ログアウト
        </Button>

        {errorMessage && (
          <div className="items-start">
            {" "}
            <h3 className="text-sm font-semibold text-red-500">
              {errorMessage}
            </h3>
          </div>
        )}
      </div>
    </main>
  );
}
