import { useGuild } from "../context/GuildContext";
import defaultImage from "../assets/default.png"
import { useState } from "react";


function Leaderboard() {
  const { guildPlayers, playerStats } = useGuild();
  const MIN_MATCHES = 15

  const leaderboard = [...playerStats]
    .map((player) => ({
      ...player,
      average: player.kills / player.matches,
    }))
    .sort((a, b) => { //sorting algo taken from internet
      const aEligible = a.matches >= MIN_MATCHES;
      const bEligible = b.matches >= MIN_MATCHES;

      if (aEligible !== bEligible) {
        return bEligible - aEligible;
      }

      if (!aEligible && !bEligible) {
        return b.matches - a.matches;
      }

      if (b.average !== a.average) {
        return b.average - a.average;
      }

      if (b.kills !== a.kills) {
        return b.kills - a.kills;
      }

      return b.matches - a.matches;
    });

    const leader = leaderboard[0]

    function matchesToReachTop(player, leader) {
      if (player.playerId === leader.playerId) return 0;

      const leaderAvg = leader.kills / leader.matches;

      let futureMatches = player.matches < 15 ? 15 - player.matches : 1;

      while (true) {
        
        const avg =
          (player.kills + futureMatches * 10) /
          (player.matches + futureMatches);

        if (avg > leaderAvg) {
          return futureMatches;
        }

        futureMatches++;
      }
    }

    const [selectedPlayer, setSelectedPlayer] = useState(null);


  return (
    <section className="px-4 py-8">

      {/* Heading */}

      <div className="text-center">

        <h1 className="text-4xl font-black tracking-wide text-white">
          LEADERBOARD
        </h1>

        <p className="text-sky-400 uppercase tracking-widest text-sm mt-1">
          Guild Member Stats
        </p>

      </div>

      {/* Last Updated */}

      <div className="flex justify-center mt-5 mb-6">

        <div className="rounded-xl border border-sky-500/20 bg-[#0B1220] px-5 py-3">

          <p className="text-xs text-green-400 text-center blink-smooth">
            ● Real Time Update
          </p>
          <p className="mt-1 text-xs text-green-400 text-center blink-smooth">
            Minimum {MIN_MATCHES} Matches Required to <span className="text-blue-400">#RANK</span>
          </p>


        </div>

      </div>

      {/* Header */}

      <div className="flex items-center rounded-xl border border-sky-500/20 bg-gradient-to-r from-blue-900 to-sky-700 px-3 py-3 text-[11px] font-bold uppercase text-white">

        <div className="w-8 text-center">#</div>

        <div className="ml-3 text-center w-35">
          Player Name
        </div>
        <div className="w-12 text-center">
          Match
        </div>
        <div className="w-12 text-center text-yellow-400">
          Kills
        </div>
        <div className="w-10 text-center text-pink-400">
          MVP
        </div>
        <div className="w-16 text-center -mr-1.5 ml-1">
          Damage
        </div>

      </div>

     {/* popup window */}
     

      {/* Players */}

      <div className="mt-3 space-y-3">

        {leaderboard.map((player, index) => {

          const profile = guildPlayers.find(
            (p) => p.id === player.playerId
          );

          return (
            // Player card
            <div
              onClick={() => setSelectedPlayer({
                name: player.name,
                needMatch: matchesToReachTop(player,leader)
              })}

              key={player.playerId}
              className={`flex items-center rounded-2xl px-3 py-3 transition-all
                        ${
                          index === 0
                            ? "border border-yellow-400 bg-gradient-to-r from-[#9e6a03] via-[#5c4300] to-[#c89b00] shadow-lg shadow-yellow-500/30"
                            : "border border-sky-500/15 bg-[#090F18] hover:border-sky-400"
                        }
                        ${
                          index === 1 
                          ? "border border-slate-300 bg-gradient-to-r from-[#29395e] via-[#334155] to-[#7DD3FC] shadow-lg shadow-sky-300/20"
                          : "border border-sky-500/15 bg-[#090F18] hover:border-sky-400"
                        }
                        ${
                          index === 2
                          ? "border border-rose-500 bg-gradient-to-br from-[#7a4949] via-[#3B0A0A] to-[#7A1F1F] shadow-lg shadow-rose-500/25"
                          : "border border-sky-500/15 bg-[#090F18] hover:border-sky-400"
                        }
                        
                        `}
            >

              {/* Rank */}

              <div className="w-8 text-center">

                {index === 0 ? (
                  <span className="text-yellow-400 text-2xl -ml-2">👑</span>
                ) : index === 1 ? (
                  <span className="text-gray-300 text-xl -ml-2">🥈</span>
                ) : index === 2 ? (
                  <span className="text-orange-400 text-xl -ml-2">🥉</span>
                ) : (
                  <span className="text-white/70 font-bold mr-3">
                    {index + 1}
                  </span>
                )}

              </div>

              {/* Player */}

              <div className="flex width-[150px] items-center">

                <img
                  src={profile?.image || defaultImage}
                  alt={player.name}
                  className="w-8 h-8 object-contain rounded-full flex-shrink-0"
                />

                <div className="ml-1 w-20">

                  <h3 className="text-white text-[12px] font-bold whitespace-nowrap">
                    {player.name}
                  </h3>

                  <p className="text-[8px] ml-2 text-sky-400">
                    Avg {player.average.toFixed(2)}
                  </p>

                </div>

              </div>

              <div className="w-12 text-center text-[12px] text-white font-semibold">
                {player.matches}
              </div>

              <div className="w-12 text-center text-[12px] font-bold text-yellow-400">
                {player.kills}
              </div>

              <div className="w-10 text-center text-[12px] font-bold text-pink-400">
                {player.mvp}
              </div>

              <div className="w-16 text-right text-white text-[12px]">
                {player.damage.toLocaleString()}
              </div>

            </div>

          );

        })}

      </div>

      {selectedPlayer && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setSelectedPlayer(null)}
        >
          <div
            className="bg-[#111827] border border-sky-500/20 rounded-2xl p-6 w-72"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-white text-xl font-bold">
              🎯To Reach <span className="text-sky-400">#rank 1</span>
            </h2>

            <p className="text-white font-bold mt-3">
              {selectedPlayer.name}
            </p>

            <p className="text-white mt-2">
              Need{" "}
              <span className="text-yellow-400">
                {selectedPlayer.needMatch}
              </span>{" "}
              Matches
            </p>

            <p className="text-gray-400 text-sm">
              Assuming 10 Kills Per Match
            </p>
            <p className="text-gray-400 text-sm">
              if your kills more then 10 then match number decreases !!
            </p>
          </div>
        </div>
      )}

    </section>
  );
}

export default Leaderboard;