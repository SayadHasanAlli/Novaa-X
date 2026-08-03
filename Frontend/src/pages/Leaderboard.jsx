import { useGuild } from "../context/GuildContext";
import defaultImage from "../assets/default.png"


function Leaderboard() {
  const { guildPlayers, playerStats } = useGuild();

  const leaderboard = [...playerStats]
    .map((player) => ({
      ...player,
      average: player.kills / player.matches,
    }))
    .sort((a, b) => {
      const aEligible = a.matches >= 10;
      const bEligible = b.matches >= 10;

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

      {/* Players */}

      <div className="mt-3 space-y-3">

        {leaderboard.map((player, index) => {

          const profile = guildPlayers.find(
            (p) => p.id === player.playerId
          );

          return (

            <div
              key={player.playerId}
              className="flex items-center rounded-2xl border border-sky-500/15 bg-[#090F18] px-3 py-3 transition-all hover:border-sky-400"
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

              {/* Matches */}

              <div className="w-12 text-center text-[12px] text-white font-semibold">
                {player.matches}
              </div>

              {/* Kills */}

              <div className="w-12 text-center text-[12px] font-bold text-yellow-400">
                {player.kills}
              </div>

              {/* MVP */}

              <div className="w-10 text-center text-[12px] font-bold text-pink-400">
                {player.mvp}
              </div>

              {/* Damage */}

              <div className="w-16 text-right text-white text-[12px]">
                {player.damage.toLocaleString()}
              </div>

            </div>

          );

        })}

      </div>

    </section>
  );
}

export default Leaderboard;