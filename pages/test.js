import {useEffect, useState} from "react";
import {Box} from "@mui/material";

export default function TestPage() {
  const [array, setArray] = useState([])

  useEffect(() => {
    let arr = [];
    for (let i = 1; i <= 100; i++) {
      arr.push({id: i, name: "qwerty qwerty"});
    }
    setArray(arr);

  }, []);


  return (
    <Box height="110vh" bgcolor="#f7f5dc">

    </Box>
  );
};