import { type ReactNode } from "react";

type ButtonProp = {
  name?: string;
  disabled?: boolean;
  type: "button" | "submit";
  children: ReactNode;
  onClick?: () => void;
};

export default function Button(prop: ButtonProp) {
  return (
    <div>
      <button
        name={prop.name}
        disabled={prop.disabled}
        type={prop.type}
        onClick={prop.onClick}
        className="border rounded-lg bg-green-500 px-6 py-3 text-white font-bold disabled:opacity-50"
      >
        {prop.children}
      </button>
    </div>
  );
}
