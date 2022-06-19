import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Types from "../Types";
// import { createTheme } from '@material-ui/core/styles';

type Numbers = {
  result: any;
};

const BoxComponent = ({ result }: Numbers): React.ReactElement => {
  const title = "結果";
  function showTitle() {
    console.log("title:", result.number);
    console.log("result:", result);
  }
  showTitle();
  return (
    <Box
      style={styles.box}
      textAlign="center"
      alignItems="center"
      sx={{ p: 6, borderRadius: "30px", border: "2px solid #2798EC" }}
    >
      <Types>{title}</Types>

      <Typography fontSize="h4.fontSize" m={4}>
        スコア
      </Typography>

      <Typography fontSize="h3.fontSize" fontWeight="bold">
        {result[0].number}点
      </Typography>

      <Typography fontSize="h5.fontSize" m={4}>
        画面から目を離した数
      </Typography>

      <Typography fontSize="h4.fontSize">{result[1].number}回</Typography>
    </Box>
  );
};

const styles = {
  box: {
    width: "45%",
    margin: "50px auto 50px"
  }
};

// export async function getServerSideProps() {
//   // 本来なら以下のように外部APIからデータフェッチ
//   // const res = await fetch(`https://.../data`)
//   // const data = await res.json()

//   // 今はeventsデータを決めうち
//   type EventItem = {
//     id: number;
//     title: string;
//   };

//   const events: EventItem[] = [
//     { id: 1, title: "title1" },
//     { id: 2, title: "title2" }
//   ];

//   return {
//     props: {
//       events: events
//     }
//   };
// }

export default BoxComponent;
