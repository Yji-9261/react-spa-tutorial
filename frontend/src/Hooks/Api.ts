import axios from "axios";

const CSRF_COOKIE_PATH = "/sanctum/csrf-cookie";

const useApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    Accept: "application/json",
  },
});

// axios通信の失敗時のエラーハンドリング定義
useApi.interceptors.response.use(
  (response) => response, //正常時はレスポンスをそのまま返す

  // エラー時は各ステータスコードに応じて処理を分岐
  async (error) => {
    // エラー発生時の通信リクエスト情報を取得
    const originalRequest = error.config;

    // 419エラー（CSRFトークンの期限切れ）時の一回目の処理
    if (error.response?.status === 419 && !originalRequest._retry) {
      // 無限ループを防ぐために、リトライフラグを設定
      originalRequest._retry = true;

      try {
        // CSRFトークンをリフレッシュするためのリクエストを送信
        // 無限ループ対策を機能させるために、axiosのインスタンスから直接使用する
        await axios.get(CSRF_COOKIE_PATH, {
          baseURL: useApi.defaults.baseURL,
          withCredentials: true,
        });
        // CSRFトークンリフレッシュ後、元のリクエストを再送信
        return useApi(originalRequest);
      } catch (refreshError) {
        // CSRF Cookie のリフレッシュエラーを返す
        console.error("CSRFトークンリフレッシュ失敗:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    // // 401エラー（認証エラー）時の処理
    // if (error.response?.status === 401) {
    //   //console.warn("セッションが切れました。再ログインしてください。");
    //   // //zustandの認証状態をクリアしてログイン画面に遷移する

    //   // alert("セッションが切れました。再ログインしてください。");
    //   // window.location.href = "/login"; // ログイン画面に遷移
    //   return Promise.reject(error);
    // }

    // その他のエラー(403とか404とか)はそのまま返す
    return Promise.reject(error);
  },
);

export { useApi };
