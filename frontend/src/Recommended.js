import React from "react";
import {useEffect, useState} from "react";
import axios from "axios";
import "./Recommended.css"

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
      <div className="main">
              {data.map((v, idx) => <div key={`${idx}-`}>
                <video controls width="250" autoplay loop><source src={v.filepath} type="video/mp4"/></video>
                {v.title}{v.content}</div>)}
      </div>
  );
}

export default Recommended;