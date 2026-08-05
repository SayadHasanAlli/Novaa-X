import { GUILD } from "../data/config";

function GuildStats() {
  const stats = [
    {
      value: `${GUILD.totalMembers}+`,
      title: "Guild Members",
      icon: "👥",
    },
    {
      value: "60+",
      title: "Match Results",
      icon: "⚔️",
    },
    {
      value: "∞",
      title: "Unlimited Ambition",
      icon: "👑",
    },
  ];

  return (
    <section className="px-5 mt-10">

      <div className="grid grid-cols-3 gap-3">

        {stats.map((item) => (
          <div
            key={item.title}
            className="
              rounded-2xl
              border
              border-sky-500/20
              bg-[#0B1220]
              py-6
              flex
              flex-col
              items-center
              hover:border-sky-400
              transition
            "
          >
            <div className="text-3xl">
              {item.icon}
            </div>

            <h2 className="mt-3 text-2xl font-bold text-sky-400">
              {item.value}
            </h2>

            <p className="mt-2 text-xs text-center text-gray-400 uppercase">
              {item.title}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
}

export default GuildStats;