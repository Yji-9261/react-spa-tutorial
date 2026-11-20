import { type MouseEvent, type RefObject } from "react";
import Button from "./Button";
import type { GachaItem } from "../types/GachaItem";

type ItemsDialogProp = {
  ref: RefObject<HTMLDialogElement | null>;
  items: GachaItem[];
};

export default function ItemsDialog({ref, items}: ItemsDialogProp) {
  function handleCloseDialog(e: MouseEvent<HTMLDialogElement>) {
    if (e.target === e.currentTarget) {
      const rect = e.currentTarget.getBoundingClientRect();

      const isOutside =
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom;

      if (isOutside) {
        e.currentTarget.close();
      }
    }
  }

  return (
    <dialog
      onClick={handleCloseDialog}
      aria-labelledby="items-dialog-title"
      ref={ref}
      className="m-auto rounded-xl bg-white p-6 backdrop:bg-black/50 max-h-[80vh] w-[calc(100%-2rem)] max-w-lg overflow-y-auto"
    >
      <h2 id="items-dialog-title" className="text-xl font-bold text-slate-900">
        取得アイテム一覧
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {items.length === 0 ? (
          <p className="text-sm text-slate-500 sm:col-span-2">
            まだアイテムを取得していません
          </p>
        ) : (
          items.map((item, index) => (
            <article
              key={index}
              className="rounded-lg border border-slate-200 bg-slate-50 p-4"
            >
              <p className="text-sm text-blue-600">{item.rarity}</p>
              <h3 className="mt-1 font-semibold text-slate-900">{item.name}</h3>
            </article>
          ))
        )}
      </div>
      <div className="mt-6 flex justify-end">
        <Button type="button" onClick={() => ref.current?.close()}>
          閉じる
        </Button>
      </div>
    </dialog>
  );
}
