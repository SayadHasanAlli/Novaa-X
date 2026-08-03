import { useGuild } from "../context/GuildContext";

function TopPerformers() {
  const { guildPlayers, playerStats } = useGuild();
  const MIN_MATCHES = 15

  const topPerformers = [...playerStats]
    .filter((player) => player.matches >= MIN_MATCHES)
    .map((player) => ({
      ...player,
      average: player.kills / player.matches,
    }))
    .sort((a, b) => {
      const avgDiff = b.average - a.average;
      if (avgDiff !== 0) return avgDiff;

      if (b.kills !== a.kills) return b.kills - a.kills;

      return b.matches - a.matches;
    })
    .slice(0, 4);

  return (
    <section className="px-5 mt-10">

      <div className="mb-5">
        <h2 className="text-2xl font-bold text-white tracking-wide">
          TOP PERFORMERS
        </h2>

        <p className="text-xs text-gray-400">
          Minimum {MIN_MATCHES} Matches Required to <span className="text-blue-500">#Rank</span>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">

        {topPerformers.map((player, index) => {

          const profile = guildPlayers.find(
            (p) => p.id === player.playerId
          );

          return (

            <div
              key={player.playerId}
              className="relative overflow-hidden rounded-2xl border border-sky-500/20 bg-[#09111E] h-[210px]"
            >

              {/* Glow */}

              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 via-transparent to-transparent" />

              {/* Player Image */}

              {profile?.image && (
                <img
                  src={profile.image}
                  alt={player.name}
                  className="
                    absolute
                    right-0
                    h-[95%]
                    object-contain
                    opacity-100
                    pointer-events-none
                    select-none
                  "
                />
              )}

              {/* Left Shadow */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#09111E] via-[#09111E]/20 to-transparent" />

              {/* Content */}

              <div className="relative z-10 p-4 flex flex-col h-full">

                <div className="flex justify-between items-center">

                  <div className="w-8 h-8 rounded-full bg-sky-500/15 flex items-center justify-center border border-sky-500/30">

                    <span className="text-sm font-bold text-white">
                      #{index + 1}
                    </span>

                  </div>

                  <div className="px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/20">

                    <span className="text-yellow-400 font-bold text-sm">
                      {player.average.toFixed(2)}
                    </span>

                  </div>

                </div>

                <div className="mt-5">

                  <h3 className="text-white text-l font-bold leading-tight">
                    {player.name}
                  </h3>

                </div>

                <div className="mt-4 space-y-1 text-sm">

                  <div className="text-gray-300">
                    Kills :
                    <span className="text-yellow-400 font-semibold">
                      {" "}
                      {player.kills}
                    </span>
                  </div>

                  <div className="text-gray-300">
                    Matches :
                    <span className="text-sky-400 font-semibold">
                      {" "}
                      {player.matches}
                    </span>
                  </div>

                  <div className="text-gray-300">
                    MVP :
                    <span className="text-pink-400 font-semibold">
                      {" "}
                      {player.mvp}
                    </span>
                  </div>

                </div>


              </div>

            </div>

          );
        })}

      </div>

    </section>
  );
}

export default TopPerformers;