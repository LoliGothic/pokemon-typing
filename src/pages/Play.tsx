import { button, useControls } from "leva";
import React, { FC, useCallback, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import { css } from "@emotion/css";
import { Camera } from "@mediapipe/camera_utils";
import {
  FaceMesh,
  FACEMESH_LEFT_EYE,
  FACEMESH_LIPS,
  FACEMESH_RIGHT_EYE,
  Results
} from "@mediapipe/face_mesh";
import { draw } from "../utils/drawCanvas";
import ButtonAppBar from "../components/ButtonAppBar";

export const Play: React.VFC = () => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resultsRef = useRef<Results>();

  // コントローラーの追加
  const datas = useControls({
    bgImage: false,
    landmark: {
      min: 0,
      max: 477,
      step: 1,
      value: 0
    },
    result: button(() => {
      OutputData();
    })
  });

  /** 検出結果をconsoleに出力する */
  const OutputData = () => {
    const results = resultsRef.current!;
    console.log("results", results);

    console.log(results.multiFaceLandmarks[0]);

    const trueCoordintes = results.multiFaceLandmarks[0];
    const scaledCoordinates: any = []; // length = 478
    let minX = 10000;
    let maxX = -10000;
    let minY = 10000;
    let maxY = -10000;
    let minZ = 10000;
    let maxZ = -10000;
    for (let i = 0; i < trueCoordintes.length; i++) {
      if (minX > trueCoordintes[i].x) {
        minX = trueCoordintes[i].x;
      }
      if (maxX < trueCoordintes[i].x) {
        maxX = trueCoordintes[i].x;
      }
      if (minY > trueCoordintes[i].y) {
        minY = trueCoordintes[i].y;
      }
      if (maxY < trueCoordintes[i].y) {
        maxY = trueCoordintes[i].y;
      }
      if (minZ > trueCoordintes[i].z) {
        minZ = trueCoordintes[i].z;
      }
      if (maxZ < trueCoordintes[i].z) {
        maxZ = trueCoordintes[i].z;
      }
    }
    console.log(
      "minX, maxX, minY, maxY, minZ, maxZ",
      minX,
      maxX,
      minY,
      maxY,
      minZ,
      maxZ
    );
    console.log("scaledCoordinates", scaledCoordinates);
    for (let i = 0; i < trueCoordintes.length; i++) {
      scaledCoordinates[i] = {
        x: (trueCoordintes[i].x - minX) / (maxX - minX),
        y: (trueCoordintes[i].y - minY) / (maxY - minY),
        z: (trueCoordintes[i].z - minZ) / (maxZ - minZ)
      };
    }

    let left_eye_x_avg = 0;
    let left_eye_y_avg = 0;
    let left_eye_z_avg = 0;
    for (let i = 0; i < FACEMESH_LEFT_EYE.length; i++) {
      left_eye_x_avg += scaledCoordinates[i].x;
      left_eye_y_avg += scaledCoordinates[i].y;
      left_eye_z_avg += scaledCoordinates[i].z;
    }
    left_eye_x_avg /= FACEMESH_LEFT_EYE.length;
    left_eye_y_avg /= FACEMESH_LEFT_EYE.length;
    left_eye_z_avg /= FACEMESH_LEFT_EYE.length;

    let right_eye_x_avg = 0;
    let right_eye_y_avg = 0;
    let right_eye_z_avg = 0;
    for (let i = 0; i < FACEMESH_RIGHT_EYE.length; i++) {
      right_eye_x_avg += scaledCoordinates[i].x;
      right_eye_y_avg += scaledCoordinates[i].y;
      right_eye_z_avg += scaledCoordinates[i].z;
    }
    right_eye_x_avg /= FACEMESH_RIGHT_EYE.length;
    right_eye_y_avg /= FACEMESH_RIGHT_EYE.length;
    right_eye_z_avg /= FACEMESH_RIGHT_EYE.length;

    let lips_x_avg = 0;
    let lips_y_avg = 0;
    let lips_z_avg = 0;
    for (let i = 0; i < FACEMESH_LIPS.length; i++) {
      lips_x_avg += scaledCoordinates[i].x;
      lips_y_avg += scaledCoordinates[i].y;
      lips_z_avg += scaledCoordinates[i].z;
    }
    lips_x_avg /= FACEMESH_LIPS.length;
    lips_y_avg /= FACEMESH_LIPS.length;
    lips_z_avg /= FACEMESH_LIPS.length;

    console.log("left_eye_avg", {
      x: left_eye_x_avg,
      y: left_eye_y_avg,
      z: left_eye_z_avg
    });
    console.log("right_eye_avg", {
      x: right_eye_x_avg,
      y: right_eye_y_avg,
      z: right_eye_z_avg
    });
    console.log("eye_avg", {
      x: (left_eye_x_avg + right_eye_x_avg) / 2,
      y: (left_eye_y_avg + right_eye_y_avg) / 2,
      z: (left_eye_z_avg + right_eye_z_avg) / 2
    });
    console.log("lips_avg", {
      x: lips_x_avg,
      y: lips_y_avg,
      z: lips_z_avg
    });
    console.log(
      "lips_z_avg - (left_eye_z_avg + right_eye_z_avg) / 2",
      lips_z_avg - (left_eye_z_avg + right_eye_z_avg) / 2
    );
    if (lips_z_avg - (left_eye_z_avg + right_eye_z_avg) / 2 > 0.08) {
      // 0.010061425867024808 => front
      // 0.008909345257416134 => down
      console.log("front");
    } else {
      console.log("down");
    }
    console.log("FACEMESH_LEFT_EYE", FACEMESH_LEFT_EYE);
    console.log("FACEMESH_RIGHT_EYE", FACEMESH_RIGHT_EYE);
    console.log("FACEMESH_LIPS", FACEMESH_LIPS);
  };

  /** 検出結果（フレーム毎に呼び出される） */
  const onResults = useCallback(
    (results: Results) => {
      // 検出結果の格納
      resultsRef.current = results;
      // 描画処理
      const ctx = canvasRef.current!.getContext("2d")!;
      draw(ctx, results, datas.bgImage, datas.landmark);
    },
    [datas]
  );

  useEffect(() => {
    const faceMesh = new FaceMesh({
      locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
      }
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true, // landmarks 468 -> 478
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    faceMesh.onResults(onResults);

    if (webcamRef.current) {
      const camera = new Camera(webcamRef.current.video!, {
        onFrame: async () => {
          await faceMesh.send({ image: webcamRef.current!.video! });
        },
        width: 1280,
        height: 720
      });
      camera.start();
    }

    return () => {
      faceMesh.close();
    };
  }, [onResults]);

  return (
    <div className={styles.container}>
      <ButtonAppBar />
      {/* capture */}
      <Webcam
        ref={webcamRef}
        style={{ visibility: "hidden" }}
        audio={false}
        width={1280}
        height={720}
        mirrored
        screenshotFormat="image/jpeg"
        videoConstraints={{ width: 1280, height: 720, facingMode: "user" }}
      />
      {/* draw */}
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        width={1280}
        height={720}
      />
    </div>
  );
};

// ==============================================
// styles

const styles = {
  container: css`
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  canvas: css`
    position: absolute;
    width: 1280px;
    height: 720px;
    background-color: #1e1e1e;
    border: 1px solid #fff;
  `
};
