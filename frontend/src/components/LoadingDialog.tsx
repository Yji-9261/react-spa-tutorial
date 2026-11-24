import { type RefObject } from "react";

type Prop = {
  ref: RefObject<HTMLDialogElement | null>;
};

export default function LoadingDialog({ ref }: Prop) {
  return (
    <dialog
      aria-labelledby="loading-dialog-title"
      ref={ref}
      onCancel={(e) => e.preventDefault()}
      className="rounded-full m-auto bg-white p-6 backdrop:bg-black/50 max-h-[80vh] w-fit max-w-lg overflow-y-auto"
    >
      <h1 className="animate-pulse text-center text-xl font-bold text-slate-900">
        通信中...
      </h1>
    </dialog>
  );
}
