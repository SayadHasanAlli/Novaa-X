import { useEffect, useState } from "react";
import api from "../api/api.js";
import { useGuild } from "../context/GuildContext";
import TopOneCard from "./TopOneCard.jsx";
import TopPodiumCard from "./TopPodiumCard.jsx";
import TopPlayerListCard from "./TopPlayerListCard.jsx";


function TopPerformers() {
  const { guildPlayers } = useGuild();
  const [topPerformers, setTopPerformers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

      const fetchTopPerformance = async () => {
          try {
              const res = await api.get("/matches/top-performance");
              const merged = res.data.map((player) => {
                  const profile = guildPlayers.find(
                      p => p.name === player.player_id
                  );
                  return {
                      ...player,
                      image: profile?.image
                  };
              });
              setTopPerformers(merged);
          }
          catch (err) {
              console.log(err);
          }
          finally {
              setLoading(false);
          }
      };

      if (guildPlayers.length > 0) {
          fetchTopPerformance();
      }
  }, [guildPlayers]);

  if (loading || guildPlayers.length === 0) {
      return <p className="text-center mt-3 mb-3">Loading...</p>;
  }

  return (
    <section className="px-5 mt-10">

      <div className="mb-5">
        <h2 className="text-2xl font-bold text-white tracking-wide">
          TOP PERFORMERS
        </h2>

        <p className="text-xs text-gray-400">
            Based on Last
            <span className="text-blue-500">
                {" "}5 Matches
            </span>
        </p>

      </div>

      <TopOneCard player={topPerformers[0]} />

      <div className="grid grid-cols-2 gap-4 mt-4">

        {topPerformers.slice(1, 3).map((player, index) => (

          <TopPodiumCard
            key={player.player_id}
            player={player}
            rank={index + 2}
          />

        ))}

      </div>

      <div className="mt-4 space-y-3">

        {topPerformers.slice(3).map((player, index) => (

          <TopPlayerListCard
            key={player.player_id}
            player={player}
            rank={index + 4}
          />

        ))}

      </div>

    </section>
  );
}

export default TopPerformers;