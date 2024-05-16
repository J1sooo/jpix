import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import React from "react";
import axios from "axios";

function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const getpost = async () => {
      const response = await axios.get("/board/list");
      setData(response.data);

    }
    getpost();

  }, []);

  return (
      <div className="App">
        <header className="App-header">

          <ul>
            {data.map((v, idx)=><li key={'${idx}-'}>{v.title}{v.content}</li>)}
          </ul>


        </header>
      </div>
  );
}

export default App;
