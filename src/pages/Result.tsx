import * as React from "react";
import BoxComponent from "../components/BoxComponent";
import OutlinedButtons from "../components/OutlinedButtons";
import confetti from "canvas-confetti";
import { useRef } from "react";
import ButtonAppBar from "../components/ButtonAppBar";

// 紙吹雪を出す回数
const CONFETTI_COUNT = 5;

type Number = {
  id: string;
  number: number;
};

const numbers: Number[] = [
  { id: "score", number: 80 },
  { id: "count", number: 10 }
];

export const Result: React.VFC = () => {
  // canvasのDOMを取得する
  const myCanvas = React.useRef<HTMLCanvasElement>(null);

  // 紙吹雪を出す回数をセットする
  const count = useRef(CONFETTI_COUNT);

  // 紙吹雪を出す関数
  const myConfetti = confetti.create(myCanvas.current!, {
    resize: true,
    useWorker: true
  });

  React.useEffect(() => {
    // canvasが取得できたら、紙吹雪を出し始める
    if (myCanvas.current) {
      const cb = () => {
        myConfetti({
          particleCount: 100,
          spread: 100,
          ticks: 1000,
          origin: {
            x: Math.random(),
            y: 0
          }
        });

        count.current--;

        if (count.current === 0) {
          return;
        } else {
          setTimeout(cb, 1000);
        }
      };

      window.setTimeout(cb, 1000);
    }
  }, [myCanvas]);

  return (
    <React.Fragment>
      <ButtonAppBar />
      <BoxComponent result={numbers} />
      <OutlinedButtons />
      <canvas ref={myCanvas} />
    </React.Fragment>
  );
};
