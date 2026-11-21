import { useRef, useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import ItemsDialog from "../components/ItemsDialog";
import { api } from "../libs/api";
import type { GachaItem } from "../types/GachaItem";

export default function Home() {
  const navigate = useNavigate();
  const [userName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [gachaItems, setGachaItems] = useState<GachaItem[]>([]);
  const itemsDialogRef = useRef<HTMLDialogElement>(null);

  async function handleGachaClick() {
    // 'POST api/v1/lottery'実行
    // 結果(アイテム名、レアリティ、アイテム画像など)をstateに受け渡す
    // 不正な結果を返した場合は、エラーメッセージを出力する

    try {
      const response = await api.post("/api/v1/lottery");
      console.log(response);
      const gachaItem: GachaItem = response.data.data;
      if (response.status === 200) {
        navigate("/gacha", {state: gachaItem});
      } else {
        setErrorMessage("予期せぬエラーが発生しました。");
        console.log(response);
      }
    } catch (e) {
      setErrorMessage("通信エラーが発生しました。");
      console.log(e);
    }
  }

  async function handleItemsClick() {
    try {
      // アイテム一覧取得API実行し、返ってきたjsonをGacahItemに変換
      const response = await api.get("/api/v1/items");
      if (response.status === 200) {
        setGachaItems(response.data.data);
        // サブウィンドウを表示
        itemsDialogRef.current?.showModal();
      } else {
        setErrorMessage("予期せぬエラーが発生しました。");
        console.log(response);
      }
    } catch (e) {
      setErrorMessage("通信エラーが発生しました。");
      console.log(e);
    }
  }

  function handleLogoutClick() {
    // ログアウトAPI実行し、成功したらログイン画面に遷移する

    navigate("/login");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <ItemsDialog items={gachaItems} ref={itemsDialogRef} />

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
