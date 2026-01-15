import React from "react";
import { Link } from "react-router-dom";

const Casino = () => {
  // 1. Data Array
  const casinoGames = [
    {
      path: "/live/dt20",
      img: "assets/dt20-BTYSNym9.jpg",
      title: "DRAGON TIGER",
    },
    {
      path: "/live/dt202",
      img: "assets/dt202-BiZBmDfm.jpg",
      title: "DRAGON TIGER 2",
    },
    {
      path: "/live/teenpatti20",
      img: "assets/teen20-Ceb03TGl.jpg",
      title: "TEENPATTI T20",
    },
    {
      path: "/live/teenpattiodi",
      img: "assets/teen-DZNfip5M.jpg",
      title: "TEENPATTI ONE DAY",
    },
    {
      path: "/live/lucky7b",
      img: "assets/lucky7eu-B9GoLH0h.jpeg",
      title: "LUCKY 7B",
    },
    {
      path: "/live/andarbahar2",
      img: "assets/abj-BSv3pW28.jpg",
      title: "ANDAR BAHAR 2",
    },
    {
      path: "/live/aaa",
      img: "assets/aaa-B_TuC7tC.jpg",
      title: "AMAR AKBAR ANTHONY",
    },
    {
      path: "/colorgame",
      img: "assets/colorgame_new-L9PjTa_k.png",
      title: "Color Game",
    },
    {
      path: "/vab",
      img: "assets/ab-DlpS08-G.png",
      title: "Virtual Andar Bahar",
    },
  ];

  return (
    <div>
      <div className="content">
        {/* 2. Loop through the data */}
        {casinoGames.map((game, index) => (
          <Link key={index} className="card" to={game.path}>
            <img className="casinologo" src={game.img} alt={game.title} />
            <div>{game.title}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Casino;
