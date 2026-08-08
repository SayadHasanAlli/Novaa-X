function TopPodiumCard({ player, rank, topPlayerkills }) {


  const fifthMatchKills = player.recent_matches[4].kills;
  const nextKills = (topPlayerkills - (player.kills - fifthMatchKills)) + 1


  if (!player) return null;

  const isSecond = rank === 2;

  const gradient = isSecond
    ? "from-slate-300/70 via-[#09111E] to-slate-700/20 border-slate-300/60"
    : "from-orange-300/70 via-[#09111E] to-orange-800/20 border-orange-400/60";

  const badge = isSecond ? "🥈" : "🥉";

  const avgColor = isSecond
    ? "text-slate-200"
    : "text-orange-300";

  return (

    <div
      className={`
        relative
        overflow-hidden
        rounded-2xl
        h-[180px]
        border
        bg-gradient-to-br
        ${gradient}
      `}
    >

      {/* Glow */}

      <div
        className={`
          absolute
          inset-0
          ${isSecond
            ? "bg-gradient-to-br from-slate-300/10 via-transparent to-transparent"
            : "bg-gradient-to-br from-orange-400/10 via-transparent to-transparent"}
        `}
      />

      {/* Character */}

      {player.image && (

        <img
          src={player.image}
          alt={player.player_id}
          className="
            absolute
            right-0
            left-8
            bottom-0
            h-[90%]
            scale-110
            object-contain
            pointer-events-none
            select-none
          "
        />

      )}

      {/* Overlay */}

      <div className="absolute inset-0 bg-gradient-to-r from-[#09111E] via-[#09111E]/50 to-transparent" />

      <div className="relative z-10 p-4 flex flex-col justify-between h-full">


        <div className="flex justify-between items-center">

          <span className="text-2xl">
            {badge}
          </span>
          <span
            className={`
              text-xs
              font-bold
              px-2
              py-1
              rounded-full
              border
              ${isSecond
                ? "border-slate-300/30 text-slate-200"
                : "border-orange-300/30 text-orange-300"}
            `}
          >
            #{rank}
          </span>
        </div>


        <div>
          <h3 className="text-white font-bold text-lg">
            {player.player_id}
          </h3>
        </div>

        <div>
          <div className={`text-3xl font-black ${avgColor}`}>
            {player.average.toFixed(2)}
          </div>
          <div className="text-[10px] uppercase tracking-widest text-gray-400">
            Average
          </div>
        </div>


        <div className="text-xs text-gray-300">
          <span className="text-white font-semibold">
            {player.kills}
          </span>
          {" "}Kills
          {" • "}
          ⭐
          <span className="text-pink-400 font-semibold">
            {" "}{player.mvp}
          </span>
        </div>

        <div>
          <p className="text-[10px] mt-1">
            <span className="text-green-400 font-bold blink-smooth">NEXT</span> : {nextKills}+ kills ➜ <span className="text-yellow-300">#1</span> 
          </p>
        </div>
      </div>

    </div>

  );

}

export default TopPodiumCard;