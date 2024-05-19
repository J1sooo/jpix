import React from "react";
import {useEffect, useState} from "react";
import axios from "axios";

function Recommended() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getpost = async () => {
            const response = await axios.get("/board1/list");
            setData(response.data);

        }
        getpost();

    }, []);
  return (
      <div>
          <ul>
              {data.map((v, idx) => <li key={'${idx}-'}>{v.title}{v.content}</li>)}
          </ul>
      </div>
  );
}

export default Recommended;