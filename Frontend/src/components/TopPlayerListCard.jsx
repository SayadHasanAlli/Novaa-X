function TopPlayerListCard({ player, rank }) {

  if (!player) return null;

  return (

    <div
      className="
        relative
        overflow-hidden
        rounded-2xl
        border
        border-sky-500/20
        bg-[#09111E]
        px-4
        py-3
        flex
        items-center
        justify-between
        transition-all
        duration-300
        hover:border-sky-400/40
        hover:bg-[#0D1625]
      "
    >

      {/* Left */}

      <div className="flex items-center gap-3">

        {/* Profile */}

        <div
          className="
            w-12
            h-12
            rounded-full
            overflow-hidden
            border
            border-sky-500/30
            bg-sky-500/10
            shrink-0
          "
        >

          {player.image ? (

            <img
              src={player.image}
              alt={player.player_id}
              className="w-full h-full object-cover"
            />

          ) : (

            <div className="w-full h-full flex items-center justify-center text-white font-bold">

              {player.player_id[0]}

            </div>

          )}

        </div>

        {/* Name */}

        <div>

          <h3 className="text-white font-bold">

            {player.player_id}

          </h3>

          <p className="text-xs text-gray-400">

            {player.kills} Kills • ⭐ {player.mvp} MVP

          </p>

        </div>

      </div>

      {/* Right */}

      <div
        className="
          w-10
          h-10
          rounded-full
          bg-sky-500/10
          border
          border-sky-500/20
          flex
          items-center
          justify-center
        "
      >

        <span className="text-white font-bold">

          #{rank}

        </span>

      </div>

    </div>

  );

}

export default TopPlayerListCard;