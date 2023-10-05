// Times.jsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import "./Times.css";
import '../App.css';

function Times() {
  const [times, setTimes] = useState([]);

  useEffect(() => {
    const fetchTimes = async () => {
      try {
        const response = await fetch("https://api.cartola.globo.com/clubes");

        if (!response.ok) {
          throw new Error("Erro ao obter os times");
        }

        const dataTimes = await response.json();

        const timesArray = Object.values(dataTimes);
        const todosTimes = timesArray.filter((time) => time.id !== 1);

        if (Array.isArray(todosTimes)) {
          setTimes(todosTimes);
        } else {
          console.error("Deu erro");
        }
      } catch (error) {
        console.error("Erro:", error.message);
      }
    };

    fetchTimes();
  }, []);

  return (
    <div className="container">
      <img
        className="cartola-logo"
        src="https://logodownload.org/wp-content/uploads/2017/05/cartola-fc-logo-5.png"
        alt=""
      />
      <div className="card-list">
        <ul>
          {times.map((time) => (
            <li className="container-times" key={time.id}>
              <Link to={`/jogador/${time.id}`} className="time-link">
                <div>
                  <img
                    className="time-escudo-img"
                    src={time.escudos["30x30"]}
                    alt={`${time.nome} Escudo`}
                  />
                </div>
                <div className="container-texts">
                 <div className="nome-time">{time.nome}</div>
                  <div className="apelido-time"> {time.apelido}</div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  };


export default Times;
