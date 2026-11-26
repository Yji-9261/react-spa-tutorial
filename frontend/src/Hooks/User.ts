import { create } from "zustand";
import axios from "axios";

type UserData = {
  name: string | null;
  email: string | null;
  getUser: () => Promise<number>; // 成功時は200、失敗時はエラーコードを返す
  resetUser: () => void; // 成功時は200、失敗時はエラーコードを返す
};

export const useUser = create<UserData>((set) => ({
  name: null,
  email: null,

  getUser: () => {
    return axios
      .get("/api/v1/user")
      .then((response) => {
        set({ name: response.data.name, email: response.data.email });
        return 200; // 成功時のステータスコードを返す
      })
      .catch((error) => {
        console.error("Failed to load user data:", error);
        return error.response?.status || 500; // エラー時のステータスコードを返す
      });
  },
  resetUser: () => {
    set({ name: null, email: null });
  },
}));
