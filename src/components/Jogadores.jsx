import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../App.css'
function Jogadores() {
  const [jogadores, setJogadores] = useState([]);
  const [timesData, setTimesData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchJogadores = async () => {
      try {
        const responseJogadores = await fetch(`https://api.cartola.globo.com/atletas/mercado/${id}`);
        const jogadoresData = await responseJogadores.json();

        if (Array.isArray(jogadoresData.atletas)) {
          const updatedJogadoresData = jogadoresData.atletas.map((player) => ({
            ...player,
            foto: player.foto?.replace("FORMATO", "220x220"),
          }));
          setJogadores(updatedJogadoresData);
        }

        const responseTimes = await fetch("https://api.cartola.globo.com/clubes");
        const timesData = await responseTimes.json();
        setTimesData(timesData);
      } catch (error) {
        console.error("Erro:", error);
      }
    };

    fetchJogadores();
  }, [id]);

  return (
    <div>
      <div>
        <img
          className="cartola-logo"
          src="https://logodownload.org/wp-content/uploads/2017/05/cartola-fc-logo-5.png"
          alt=""
        />
      </div>
      <ul className="estilo-ul-lista-times">
        <div>
          <span className="nome-times-jogadores"> Jogadores do {timesData[id]?.nome || "Unknown Team"}</span>
        </div>
        {jogadores.map((player) => (
          <li className="nome-jogador-e-foto" key={player.atleta_id}>
            <div>
              <img
                className="img-jogador"
                src={player.foto}
                alt={player.apelido}
              />
            </div>
            <span>
              {player.apelido}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Jogadores;
