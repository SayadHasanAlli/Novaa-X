// import React from 'react'

import { useState } from "react";
import { useGuild } from "../context/GuildContext";
const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME;
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;
import api from "../api/api";

function Admin() {
  const { guildPlayers, matches } = useGuild();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isAdmin") === "true"
  );

  const nextMatchNumber = matches.length + 1;

  const [opponent, setOpponent] = useState("");
  const [result, setResult] = useState(true);

  const [players, setPlayers] = useState([
    {
      playerId: "",
      kills: "",
      damage: "",
      mvp: false,
    },
    {
      playerId: "",
      kills: "",
      damage: "",
      mvp: false,
    },
    {
      playerId: "",
      kills: "",
      damage: "",
      mvp: false,
    },
    {
      playerId: "",
      kills: "",
      damage: "",
      mvp: false,
    },
  ]);

  function handlePlayer(index, field, value) {
    const updated = [...players];
    updated[index][field] = value;
    setPlayers(updated);
  }

  function handleMVP(index) {
    const updated = players.map((player, i) => ({
      ...player,
      mvp: i === index,
    }));

    setPlayers(updated);
  }
  function handleLogin(e) {
    e.preventDefault();

    if (
      username === ADMIN_USERNAME &&
      password === ADMIN_PASSWORD
    ) {
      localStorage.setItem("isAdmin", "true");
      setIsLoggedIn(true);
    } else {
      alert("Invalid Username or Password");
    }
  }

  function handleLogout() {
    localStorage.removeItem("isAdmin");
    setIsLoggedIn(false);
  }

function handleSubmit(e) {
    e.preventDefault();

    const validPlayers = players.filter(
      (player) => player.playerId !== ""
    );

    try {
      const res = api.post("/matches/",{
        opponent,
        result,
        players: validPlayers
      })

      console.log(players)
      alert("Saved succesfully")
      
    } catch (error) {
      console.log(error)
      
    }

    setOpponent("");
    setResult(true);

    setPlayers([
      { playerId: "", kills: "", damage: "", mvp: false },
      { playerId: "", kills: "", damage: "", mvp: false },
      { playerId: "", kills: "", damage: "", mvp: false },
      { playerId: "", kills: "", damage: "", mvp: false },
    ]);
  }

  if (!isLoggedIn) {
    return (
      <section className="min-h-screen bg-[#05070D] flex items-center justify-center px-5">

        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-2xl bg-[#0B1220] border border-sky-500/20 p-6"
        >

          <h1 className="text-3xl font-black text-center text-white">
            ADMIN LOGIN
          </h1>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-8 w-full rounded-xl bg-[#111827] px-4 py-3 text-white"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-4 w-full rounded-xl bg-[#111827] px-4 py-3 text-white"
          />

          <button
            type="submit"
            className="mt-6 w-full rounded-xl bg-sky-500 py-3 font-bold text-white"
          >
            LOGIN
          </button>

        </form>

      </section>
    );
  }

  return (

    <section className="min-h-screen bg-[#05070D] px-5 py-8">
      <div className="flex justify-end mb-4">

        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white"
        >
          Logout
        </button>

      </div>

      <h1 className="text-3xl font-black text-center text-white">
        ADMIN PANEL
      </h1>

      <p className="text-center text-green-400 text-sm mt-1">
        Match #{nextMatchNumber}
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-6"
      >

        {/* Opponent */}

        <div>

          <label className="text-white text-sm">
            Opponent Team
          </label>

          <input
            type="text"
            value={opponent}
            onChange={(e) => setOpponent(e.target.value)}
            placeholder="Enter Team Name"
            className="mt-2 w-full rounded-xl bg-[#0B1220] border border-sky-500/20 px-4 py-3 text-white outline-none"
          />

        </div>

        {/* Result */}

        <div>

          <label className="text-white text-sm">
            Match Result
          </label>

          <div className="flex gap-4 mt-3">

            <button
              type="button"
              onClick={() => setResult(true)}
              className={`flex-1 rounded-xl py-3 font-semibold ${
                result
                  ? "bg-green-500 text-white"
                  : "bg-[#0B1220] text-white"
              }`}
            >
              WIN
            </button>

            <button
              type="button"
              onClick={() => setResult(false)}
              className={`flex-1 rounded-xl py-3 font-semibold ${
                !result
                  ? "bg-red-500 text-white"
                  : "bg-[#0B1220] text-white"
              }`}
            >
              LOSS
            </button>

          </div>

        </div>

        {/* Players */}

        {players.map((player, index) => (

          <div
            key={index}
            className="rounded-2xl bg-[#0B1220] border border-sky-500/20 p-4"
          >

            <h2 className="text-white font-bold mb-4">
              Player {index + 1}
            </h2>

            <select
              value={player.playerId}
              onChange={(e) =>
                handlePlayer(index, "playerId", e.target.value)
              }
              className="w-full rounded-xl bg-[#111827] px-4 py-3 text-white outline-none"
            >
              <option value="">
                Select Player
              </option>

              {guildPlayers.map((p) => (

                <option
                  key={p.id}
                  value={p.name}
                >
                  {p.name}
                </option>

              ))}

            </select>

            <div className="grid grid-cols-2 gap-3 mt-4">

              <input
                type="number"
                placeholder="Kills"
                value={player.kills}
                onChange={(e) =>
                  handlePlayer(index, "kills", e.target.value)
                }
                className="rounded-xl bg-[#111827] px-4 py-3 text-white outline-none"
              />

              <input
                type="number"
                placeholder="Damage"
                value={player.damage}
                onChange={(e) =>
                  handlePlayer(index, "damage", e.target.value)
                }
                className="rounded-xl bg-[#111827] px-4 py-3 text-white outline-none"
              />

            </div>

            <label className="flex items-center gap-3 mt-4 text-white">

              <input
                type="radio"
                name="mvp"
                checked={player.mvp}
                onChange={() => handleMVP(index)}
              />

              MVP

            </label>

          </div>

        ))}

        <button
          type="submit"
          className="w-full rounded-xl bg-sky-500 py-4 font-bold text-white"
        >
          SAVE MATCH
        </button>

      </form>

    </section>
  );
}

export default Admin;
