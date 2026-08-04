function TopPodiumCard({ player, rank }) {

  if (!player) return null;

  const isSecond = rank === 2;

  const gradient = isSecond
    ? "from-slate-300/20 via-[#09111E] to-slate-700/20 border-slate-300/30"
    : "from-orange-300/20 via-[#09111E] to-orange-800/20 border-orange-400/30";

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
            bottom-0
            h-[92%]
            object-contain
            pointer-events-none
            select-none
          "
        />

      )}

      {/* Overlay */}

      <div className="absolute inset-0 bg-gradient-to-r from-[#09111E] via-[#09111E]/70 to-transparent" />

      {/* Content */}

      <div className="relative z-10 p-4 flex flex-col justify-between h-full">

        {/* Rank */}

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

        {/* Name */}

        <div>

          <h3 className="text-white font-bold text-lg">

            {player.player_id}

          </h3>

        </div>

        {/* Average */}

        <div>

          <div className={`text-3xl font-black ${avgColor}`}>

            {player.average.toFixed(2)}

          </div>

          <div className="text-[10px] uppercase tracking-widest text-gray-400">

            Average

          </div>

        </div>

        {/* Bottom */}

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

      </div>

    </div>

  );

}

export default TopPodiumCard;