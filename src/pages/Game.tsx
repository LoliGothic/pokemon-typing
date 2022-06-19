import React, { useState, useEffect, createContext } from "react";
import { makeStyles } from "@material-ui/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";

const useStyles = makeStyles(() => ({
  defaultFont: {
    textAlign: "center",
    fontSize: "15px"
  },
  inputBox: {
    padding: "30px",
    marginBottom: "30px",
    textAlign: "center",
    top: "0"
  },
  greenFont: {
    color: "#689f38",
    display: "inline",
    fontFamily: "Times New Roman",
    fontSize: "50px"
  },
  redFont: {
    backgroundColor: "#e0e0e0",
    color: "red",
    display: "inline",
    fontFamily: "Times New Roman",
    fontSize: "50px"
  },
  greyFont: {
    color: "grey",
    display: "inline",
    fontFamily: "Times New Roman",
    fontSize: "50px"
  },
  blackFont: {
    backgroundColor: "#e0e0e0",
    display: "inline",
    fontFamily: "Times New Roman",
    fontSize: "50px"
  },
  stats: {
    display: "inline",
    fontSize: "20px",
    margin: "0 30px",
    textAlign: "center"
  },
  rights: {
    fontSize: "20px",
    padding: "20px"
  }
}));

//pokeAPIで取ってくるデータの型を定義
interface Pokemon {
  name: string;
  url: string;
}

function Game() {
  const classes = useStyles(); //styleの設定
  const [typingString, setTypingString] = useState(""); //pokeAPIから取ってきた英単語を入れる
  const [currentIndex, setCurrentIndex] = useState(0); //英単語のどこの位置か
  const [isMisstype, setIsMisstype] = useState(false);
  const [missCount, setMissCount] = useState(0); //misstypeのカウント
  const [finished, setFinished] = useState(false); //タイピングの終了
  const [started, setStarted] = useState(false); //タイピングの開始
  const [count, setCount] = useState(0); //10問カウント
  const [time, setTime] = useState(0); //スコア計算に使うtime
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [error, setError] = useState("");

  //pokeAPIからデータを持ってくる
  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((res) => {
        console.log(res.data.results);
        let randomInt = Math.floor(Math.random() * 151); //1~151までの乱数生成
        setPokemonData(res.data.results); //ポケモンデータの初期値
        setTypingString(res.data.results[randomInt].name); //英単語の初期値
      })
      .catch((err) => setError(err.message));
  }, []);

  //countが変わるたびに実行
  useEffect(() => {
    //10問終わったらelseに行く
    if (pokemonData.length > 0) {
      if (count < 10) {
        let randomInt = Math.floor(Math.random() * 151); //1~151までの乱数生成
        let pokemonInfo = pokemonData[randomInt]; //ランダムなpokeの情報
        let pokemonName = pokemonInfo.name; //ランダムなpokeの名前
        setTypingString(pokemonName); //pokeの名前をset
        console.log(pokemonName); //pokeの名前が入っているか確認
      } else {
        setTypingString(""); //解いた後は何も表示しない
        setTime(new Date().getTime() - time); //解くのにかかった時間
        setFinished(true); //タイピングゲーム終了
      }
    }
  }, [count]);

  const handleKeyPress = (e: any) => {
    if (finished) return; //タイピングが終わったらkeyを押しても何も返さない

    //タイピング開始時間
    if (!started) {
      setStarted(true);
      setTime(new Date().getTime());
    }

    if (e.key === typingString[currentIndex]) {
      setIsMisstype(false);
      setCurrentIndex(currentIndex + 1);

      //1問追わったらcountを増やすことで，次の問題に行く
      if (currentIndex + 1 >= typingString.length) {
        setCurrentIndex(0);
        setCount(count + 1);
        console.log(count);
      }
    } else {
      //ミスタイプがあったらmissCountを1増やす
      setIsMisstype(true);
      setMissCount(missCount + 1);
    }
  };

  return (
    <div>
      <div className={classes.defaultFont}>
        下の英単語のどこかをクリックしたあとにスタートできます
      </div>
      <Box
        onKeyPress={(e) => handleKeyPress(e)}
        tabIndex={0}
        className={classes.inputBox}
      >
        <Typography className={classes.greenFont}>
          {typingString.slice(0, currentIndex)}
        </Typography>
        {isMisstype ? (
          <Typography className={classes.redFont}>
            {typingString[currentIndex]}
          </Typography>
        ) : (
          <Typography className={classes.blackFont}>
            {typingString[currentIndex]}
          </Typography>
        )}
        <Typography className={classes.greyFont}>
          {typingString.slice(currentIndex + 1, typingString.length)}
        </Typography>
      </Box>
      <Box marginBottom="50px" className={classes.stats}>
        <Typography>missType: {missCount}</Typography>
      </Box>
    </div>
  );
}

export default Game;
