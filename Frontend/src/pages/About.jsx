import drax from "../assets/players/nx-drax.png"

function About() {
  return (
    <section className="min-h-screen bg-[#05070D] px-5 py-8">

      {/* Heading */}

      <div className="text-center">

        <h1 className="text-4xl font-black text-white">
          ABOUT NOVAA X
        </h1>

        <p className="mt-2 text-sky-400 tracking-widest uppercase text-sm">
          One Team • One Dream
        </p>

      </div>

      {/* Guild Story */}

      <div className="mt-8 rounded-2xl border border-sky-500/20 bg-[#0B1220] p-5">

        <h2 className="text-xl font-bold text-white">
          OUR STORY
        </h2>

        <p className="mt-4 leading-7 text-white/70">
          NOVAA X is a competitive Free Fire guild built on teamwork,
          discipline, consistency and respect. Every member represents the
          guild with dedication, sportsmanship and the desire to improve.
          Our goal is not only to win matches but also to create a strong
          and united gaming community.
        </p>

      </div>

      {/* Mission */}

      <div className="mt-6 rounded-2xl border border-sky-500/20 bg-[#0B1220] p-5">

        <h2 className="text-xl font-bold text-white">
          OUR MISSION
        </h2>

        <div className="mt-4 space-y-3 text-white/80">

          <p>⚡ Build a Strong Competitive Team</p>

          <p>🤝 Encourage Teamwork & Communication</p>

          <p>🏆 Improve Every Member's Gameplay</p>

          <p>🎯 Maintain Fair Play & Discipline</p>

        </div>

      </div>

      {/* Values */}

      <div className="mt-6 rounded-2xl border border-sky-500/20 bg-[#0B1220] p-5">

        <h2 className="text-xl font-bold text-white">
          OUR VALUES
        </h2>

        <div className="grid grid-cols-2 gap-4 mt-5">

          <div className="rounded-xl bg-[#111827] p-4 text-center">
            <p className="text-3xl">🤝</p>
            <p className="mt-2 text-white font-semibold">
              Teamwork
            </p>
          </div>

          <div className="rounded-xl bg-[#111827] p-4 text-center">
            <p className="text-3xl">🔥</p>
            <p className="mt-2 text-white font-semibold">
              Discipline
            </p>
          </div>

          <div className="rounded-xl bg-[#111827] p-4 text-center">
            <p className="text-3xl">⚡</p>
            <p className="mt-2 text-white font-semibold">
              Consistency
            </p>
          </div>

          <div className="rounded-xl bg-[#111827] p-4 text-center">
            <p className="text-3xl">🏆</p>
            <p className="mt-2 text-white font-semibold">
              Performance
            </p>
          </div>

        </div>

      </div>

      {/* Leader */}

      <div className="mt-6 rounded-2xl border border-sky-500/20 bg-[#0B1220] p-5">

        <h2 className="text-xl font-bold text-white">
          GUILD LEADER
        </h2>

        <div className="mt-5 flex items-center gap-4">

          <div className="h-16 w-16 rounded-full bg-sky-500/20 flex items-center justify-center text-3xl">
            <img src={drax} alt="" className="rounded-full object-contain "/>
          </div>

          <div>

            <h3 className="text-xl font-bold text-white">
              NX DRAX
            </h3>

            <p className="text-sky-400">
              Founder & Guild Leader
            </p>

            <p className="mt-1 text-sm text-white/60">
              Free Fire UID : 9026625712
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}

export default About;