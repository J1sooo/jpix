    import { useEffect, useState } from "react";
    import axios from "axios";
    import "./Recommended.css";


    function Recommended() {
        const [data, setData] = useState([]);

        useEffect(() => {
            const getpost = async () => {
                const response = await axios.get("/board1/list");
                setData(response.data);
            };
            getpost();
        }, []);


        return (
            <div className="app-container">
                <div className="main">

                    {data.map((v, idx) => (

                        <div key={`${idx}-`} className="video-container-wrapper"
                             style={{
                                 border: '1px solid black',
                                 borderRadius: '15px',
                                 padding: '20px',
                                 margin: '10px 0',
                                 marginBottom: '40px',
                                 paddingBottom: '50px',
                                 paddingRight: '70px'
                             }}>
                            <div className="video-container" style={{width: '18rem'}}>
                                <video controls autoPlay loop>
                                    <source src={v.filepath} type="video/mp4"/>
                                </video>
                            </div>
                            <div className="button-container">b1</div>
                            <div className="video-info">
                                <h3 className="card-title">{v.title}</h3>
                            </div>
                            <div className="video-info">
                                <p className="card-text">{v.content}</p>
                            </div>
                        </div>


                    ))}
                </div>
            </div>
        );
    }

    export default Recommended;