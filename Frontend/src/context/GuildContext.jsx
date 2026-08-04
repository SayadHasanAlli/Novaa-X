import { createContext, useContext, useState, useEffect } from "react";
import api from "../api/api.js";

import { players } from "../data/players";
import { matches as initialMatches } from "../data/matches";
import { playerStats as initialPlayerStats } from "../data/playerStats";


const GuildContext = createContext();

export function GuildProvider({ children }) {

  // Static Data
  const guildPlayers = players;

  // Merge Backend Player Stats with Player Profile
  const mergedPlayerStats = initialPlayerStats.map((stat) => {

    const profile = guildPlayers.find(
      (player) => player.name === stat.player_id
    );

    return {
      playerId: profile?.id,
      name: profile?.name,
      image: profile?.image,
      matches: stat.matches,
      kills: stat.kills,
      damage: stat.damage,
      mvp: stat.mvp,
    };

  });

  const [playerStats, setPlayerStats] = useState(mergedPlayerStats);
  const [matches, setMatches] = useState(initialMatches);
  const [loading,setLoading] = useState(false)


  useEffect(() => {

        async function fetchMatches() {
            try {
                const res = await api.get("/matches/");
                setMatches(res.data);

            } catch (error) {
                console.error(error);
            }
        }

        async function fetchLeaderboard() {
            setLoading(true)
            try {
                const res = await api.get("/matches/leaderboard");
                const mergedData = res.data.map((stat) => {
                    const profile = guildPlayers.find(
                        (player) => player.name === stat.player_id
                    );

                    return {
                        playerId: profile?.id,
                        name: profile?.name,
                        image: profile?.image,
                        matches: stat.matches,
                        kills: stat.kills,
                        damage: stat.damage,
                        mvp: stat.mvp,
                    };

                });
                setPlayerStats(mergedData);
                setLoading(false)
            } catch (error) {
                console.error(error);
            }
        }

        fetchLeaderboard();
        fetchMatches();

    }, []);
  // Dynamic Data


  return (
    <GuildContext.Provider
      value={{
        guildPlayers,

        loading,

        playerStats,
        setPlayerStats,

        matches,
        setMatches,
      }}
    >
      {children}
    </GuildContext.Provider>
  );
}

export function useGuild() {
  return useContext(GuildContext);
}