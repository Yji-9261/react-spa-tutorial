import { Navigate, useNavigate, useLocation } from "react-router";
import Button from "../components/Button";

export default function Gacha() {
  const navigate = useNavigate();
  const location = useLocation();

  // "/gacha"から受け取った抽選結果を"/gacha/result"に受け渡す
  function handleSkipClick() {
    navigate("/gacha/result", { state: location.state });
  }

  // データ消失時はホーム画面へ
  if (!location.state) {
    return <Navigate to="/home" replace={true}/>;
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <div className="flex justify-center mb-4">
        <Button type="button" onClick={handleSkipClick}>
          スキップ
        </Button>
      </div>
    </main>
  );
}
