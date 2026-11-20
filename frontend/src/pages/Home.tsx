import { useRef, useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import ItemsDialog from "../components/ItemsDialog";

export default function Home() {
  const navigate = useNavigate();
  const [userName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [gachaItems, setGachaItems] = useState([]);
  const itemsDialogRef = useRef<HTMLDialogElement>(null);

  function handleGachaClick() {
    // 'POST api/v1/lottery'実行
    // 結果(アイテム名、アイテム画像URL、アイテムALT)をstateに受け渡す
    // 不正な結果を返した場合は、エラーメッセージを出力する

    setErrorMessage("通信エラーが発生しました。");

    navigate("/gacha", {
      state: {
        name: "テスト",
        rarity: 3,
        rarityName: 'SSR',
        imageUrl: "http://localhost/image",
        imageAlt: "テスト用の画像です",
      },
    });
  }

  function handleItemsClick() {
    // アイテム一覧取得API実行

    // GET /api/v1/itemsでitems取得
    //items = GachaItem[];
    setGachaItems([]);

    // サブウィンドウを表示
    itemsDialogRef.current?.showModal();
  }

  function handleLogoutClick() {
    // ログアウトAPI実行し、成功したらログイン画面に遷移する

    navigate("/login");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <ItemsDialog items={gachaItems} ref={itemsDialogRef}/>

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
