import { type ReactNode } from "react";

type ButtonProp = {
  type: "button" | "submit";
  children: ReactNode;
  onClick?: () => void;
};

export default function Button(prop: ButtonProp) {
  return (
    <div>
      <button
        type={prop.type}
        onClick={prop.onClick}
        className="border rounded-lg bg-green-500 px-6 py-3 text-white font-bold"
      >
        {prop.children}
      </button>
    </div>
  );
}
