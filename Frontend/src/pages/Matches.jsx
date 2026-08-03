import { useGuild } from "../context/GuildContext";

function Matches() {
  const { matches } = useGuild();

  const matchHistory = [...matches].sort(
    (a, b) => b.matchNumber - a.matchNumber
  );

  return (
    <section className="px-5 py-8">

      {/* Heading */}

      <div className="text-center mb-8">

        <h1 className="text-4xl font-black text-white">
          MATCH HISTORY
        </h1>

        <p className="text-sky-400 tracking-widest uppercase text-sm mt-1">
          Novaa X Match Records
        </p>

      </div>

      {/* Total Matches */}

      <div className="mb-6 rounded-xl bg-[#0B1220] border border-sky-500/20 p-4 text-center">

        <p className="text-white/60 text-sm">
          Total Matches
        </p>

        <h2 className="text-3xl font-bold text-white">
          {matches.length}
        </h2>

      </div>

      {/* Match Cards */}

      <div className="space-y-4">

        {matchHistory.map((match) => (

          <div
            key={match.id}
            className={`rounded-2xl border overflow-hidden
            ${
              match.result
                ? "border-green-500/30"
                : "border-red-500/30"
            }`}
          >

            {/* Header */}

            <div
              className={`flex items-center justify-between px-5 py-4
              ${
                match.result
                  ? "bg-green-500/10"
                  : "bg-red-500/10"
              }`}
            >

              <div>

                <h2 className="text-white text-xl font-bold">
                  Match #{match.match_number}
                </h2>

                <p className="text-white/50 text-sm">
                  NOVAA X vs {match.opponent}
                </p>

              </div>

              <span
                className={`rounded-full px-4 py-2 text-xs font-bold
                ${
                  match.result
                    ? "bg-green-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {match.result ? "WIN" : "LOSS"}
              </span>

            </div>

            {/* Body */}

            <div className="p-5">

              {/* MVP */}

              <div className="rounded-xl bg-yellow-500/10 border border-yellow-500/30 p-3 mb-5">

                <p className="text-yellow-400 text-xs uppercase tracking-wider">
                  Match MVP
                </p>

                <h3 className="text-white font-bold text-lg mt-1">
                  👑 {match.mvp_player}
                </h3>

              </div>

              {/* Players */}

              <div className="space-y-3">

                {match.p1_name && (
                  <div className="flex justify-between text-white">
                    <span>{match.p1_name}</span>
                    <span>{match.p1_kills} Kills</span>
                  </div>
                )}

                {match.p2_name && (
                  <div className="flex justify-between text-white">
                    <span>{match.p2_name}</span>
                    <span>{match.p2_kills} Kills</span>
                  </div>
                )}

                {match.p3_name && (
                  <div className="flex justify-between text-white">
                    <span>{match.p3_name}</span>
                    <span>{match.p3_kills} Kills</span>
                  </div>
                )}

                {match.p4_name && (
                  <div className="flex justify-between text-white">
                    <span>{match.p4_name}</span>
                    <span>{match.p4_kills} Kills</span>
                  </div>
                )}

              </div>

              {/* Footer */}

              <div className="mt-5 pt-4 border-t border-white/10">

                <p className="text-white/40 text-xs">
                  {new Date(match.created_at).toLocaleDateString()}
                </p>

              </div>

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

export default Matches;