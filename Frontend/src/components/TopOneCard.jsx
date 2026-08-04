function TopOneCard({ player }) {
  if (!player) return null;

  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-3xl
        h-[280px]
        border
        border-yellow-400/40
        bg-gradient-to-br
        from-yellow-300/15
        via-[#09111E]
        to-amber-700/20
        shadow-lg
        shadow-yellow-500/10
      "
    >
      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-transparent to-transparent" />

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
            drop-shadow-[0_0_25px_rgba(255,215,0,0.45)]
          "
        />
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#09111E] via-[#09111E]/70 to-transparent" />

      {/* Crown */}
      <div className="absolute top-4 right-4 text-3xl">
        👑
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full p-6">

        {/* Rank */}
        <div>

          <div className="
            inline-flex
            items-center
            gap-2
            px-4
            py-2
            rounded-full
            bg-yellow-400/20
            border
            border-yellow-300/40
          ">

            <span className="text-yellow-300 font-bold">
              #1 TOP PLAYER
            </span>

          </div>

        </div>

        {/* Name */}
        <div>

          <h2 className="text-3xl font-black text-white">
            {player.player_id}
          </h2>

          <p className="text-yellow-300 mt-1">
            Best Recent Performance
          </p>

        </div>

        {/* Average */}
        <div>

          <div className="text-5xl font-black text-yellow-300 leading-none">
            {player.average.toFixed(2)}
          </div>

          <div className="text-sm uppercase tracking-widest text-gray-300">
            Average Kills
          </div>

        </div>

        {/* Bottom Stats */}
        <div className="flex justify-between w-[180px]">

          <div>
            <p className="text-gray-400 text-sm">
              Total Kills
            </p>
            <p className="text-2xl font-bold text-white">
              {player.kills}
            </p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">
              MVP
            </p>
            <p className="text-2xl font-bold text-pink-400">
              {player.mvp}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default TopOneCard;