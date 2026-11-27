import { useEffect, useState } from "react";
import { motion, useAnimate } from "motion/react";
import confetti from "canvas-confetti";

type GachaAnimation = {
  imageUrlFirst: string;
  imageUrlSecond: string;
  animationEnd: () => void;
};

export default function GachaAnimation({
  imageUrlFirst,
  imageUrlSecond,
  animationEnd,
}: GachaAnimation) {
  const [scope, animate] = useAnimate();
  const [imageUrl, setImage] = useState(imageUrlFirst);

  useEffect(() => {
    let cancelled = false;
    let confettiStarted = false;

    const play = async () => {
      try {
        if (cancelled) return;

        // 落下・バウンド
        await animate(
          "img",
          {
            y: [-200, 0, -30, 0],
            opacity: 1,
          },
          { duration: 0.6 },
        );
        if (cancelled) return;

        // 振動
        await animate(
          "img",
          {
            rotate: [0, -15, 15, -15, 15, 0],
          },
          { duration: 0.6 },
        );
        if (cancelled) return;

        // 画像フェードイン
        await animate(
          "[data-gacha-fade]",
          {
            opacity: 1,
          },
          {
            duration: 1,
          },
        );

        if (cancelled) return;

        // ガチャアイテム画像変更
        if (imageUrlSecond) setImage(imageUrlSecond);

        // 画像フェードアウト
        await animate(
          "[data-gacha-fade]",
          {
            opacity: 0,
          },
          {
            duration: 1,
          },
        );

        if (cancelled) return;

        // 拡大とパーティクルを同時に再生
        confettiStarted = true;
        await Promise.all([
          animate(
            "img",
            {
              scale: [1, 1.4, 1],
            },
            { duration: 0.5 },
          ),

          confetti({
            particleCount: 150,
            spread: 360,
            startVelocity: 30,
            gravity: 0.3,
            ticks: 75,
            shapes: ["star", "circle"],
            colors: ["#ffd700", "#ffffff"],
            origin: { x: 0.5, y: 0.5 },
            disableForReducedMotion: true,
          }),
        ]);
      } catch (error) {
        if (!cancelled) console.error("ガチャ演出に失敗しました。", error);
      }

      if (!cancelled) animationEnd();
    };

    // StrictMode の最初のクリーンアップ後に再生を開始する
    queueMicrotask(() => void play());

    return () => {
      cancelled = true;
      scope.animations.forEach((animation) => animation.stop());
      if (confettiStarted) confetti.reset();
    };
  }, [imageUrlSecond, animate, animationEnd, scope]);

  return (
    <div ref={scope} className="text-center">
      <div className="flex h-80 items-center justify-center relative">
        <motion.img
          initial={{ y: -200, rotate: 0, scale: 1, opacity: 0 }}
          src={imageUrl || undefined}
          alt="ガチャカプセル"
          id="gacha"
          className="w-40"
        />

        <motion.div
          data-gacha-fade
          aria-hidden="true"
          initial={{ opacity: 0 }}
          className="pointer-events-none fixed inset-0 z-10 bg-white"
        />
      </div>
    </div>
  );
}
