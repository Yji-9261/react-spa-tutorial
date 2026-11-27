import { Navigate, useNavigate, useLocation } from "react-router";
import Button from "../components/Button";
import GachaAnimation from "../animations/GachaAnimation";
import { useCallback, useEffect, useRef, useState } from "react";
import LoadingDialog from "../components/LoadingDialog";

export default function Gacha() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrlFirst, setImageUrlFirst] = useState("");
  const [imageUrlSecond, setImageUrlSecond] = useState("");
  const loadinDialogRef = useRef<HTMLDialogElement>(null);

  // "/gacha"から受け取った抽選結果を"/gacha/result"に受け渡す
  const handleSkipClick = useCallback(() => {
    navigate("/gacha/result", { state: location.state });
  }, [navigate, location.state]);

  useEffect(() => {
    if (!location.state) return;

    // モーダル表示
    loadinDialogRef.current?.showModal();

    const imageResult = new Image();
    imageResult.src = location.state.image_url;
    void imageResult.decode().catch(() => {
      console.error("結果画像の先読みに失敗しました。");
    });

    const loadImages = async () => {
      const IMAGE_PATTERN = [
        "/images/capsule_n.png",
        "/images/capsule_r.png",
        "/images/capsule_sr.png",
        "/images/capsule_ssr.png",
      ];

      try {
        const imageFirst = new Image();
        imageFirst.src = "/images/capsule_unknown.png";
        await imageFirst.decode();
        setImageUrlFirst(imageFirst.src);

        const imageSeond = new Image();
        imageSeond.src = IMAGE_PATTERN[location.state.rarity - 1];
        await imageSeond.decode();
        setImageUrlSecond(imageSeond.src);
      } catch {
        console.error("画像の読み込みに失敗しました。");
      } finally {
        setIsLoading(false);
        loadinDialogRef.current?.close();
      }
    };

    // 画像の読み込み
    loadImages();
  }, [location, loadinDialogRef]);

  // データ消失時はホーム画面へ
  if (!location.state) {
    return <Navigate to="/home" replace={true} />;
  }

  if (isLoading) {
    return <LoadingDialog ref={loadinDialogRef} />;
  }

  // 画像の読み込みに失敗した時どうするか、今回は何もしない

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <div className="flex flex-col items-center">
        <GachaAnimation
          imageUrlFirst={imageUrlFirst}
          imageUrlSecond={imageUrlSecond}
          animationEnd={handleSkipClick}
        />

        <div className="relative z-20">
          <Button type="button" onClick={handleSkipClick}>
            スキップ
          </Button>
        </div>
      </div>
    </main>
  );
}
