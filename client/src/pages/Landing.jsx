import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import cars24 from '/cars24.avif'
import doordash from '/doordash.svg'
import dropbox from '/dropbox.svg'
import loreal from '/loreal.svg'
import matrimoney from '/matrimoney.avif'
import noise from '/noise.avif'
import razorpay from '/razorpay.webp'
import snapdeal from '/sanpdeal.png'
import royal_enfield from '/royal_enfiled.avif'


const logos = [
  {src: cars24 }, 
  {src: doordash}, 
  {src: dropbox}, 
  {src: loreal}, 
  {src: noise, dark: true},
  {src: snapdeal, dark: true},
  {src: razorpay},
  {src: matrimoney},
  {src: royal_enfield}
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Landing() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-8 pt-32 text-center">
        <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6 }}
            className="
                text-5xl md:text-6xl
                font-semibold
                leading-[1.1]
                tracking-tight
                bg-clip-text text-transparent
                bg-gradient-to-b
                from-white
                via-white/90
                to-white/70
            "
            >
            Share your availability. <br />
            Let others book time.
            </motion.h1>


        <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="
                mt-6
                max-w-2xl mx-auto
                text-lg
                font-normal
                leading-relaxed
                tracking-tight
                text-white/65
            "
            >
            Avail helps you schedule meetings without back-and-forth.
            Set your availability once and share a simple link.
            </motion.p>


        <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
        className="mt-10 flex justify-center"
        >
        <motion.div
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <Link to="/login">
            <Button className="px-8 py-4 text-base shadow-lg shadow-emerald-500/25 cursor-pointer">
            Get started
            </Button>
          </Link>
        </motion.div>
        </motion.div>

      </section>



      {/* TRUSTED BY */}
      <section className="relative py-24 overflow-hidden">
        {/* soft divider glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to bottom, transparent, rgba(34,197,94,0.08), transparent)',
            }}
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-8">
          <p className="text-center text-sm tracking-wide text-white/50 mb-10">
            TRUSTED BY TEAMS AT
          </p>

          {/* marquee */}
          <div className="relative overflow-hidden">
                      <motion.div
            className="flex items-center gap-20"
            animate={{ x: ['0%', '-100%'] }}
            transition={{
              duration: 40,
              ease: 'linear',
              repeat: Infinity,
            }}
          >
            {[...logos, ...logos].map((logo, i) => (
              <div
                key={i}
                className="
                  flex items-center justify-center
                  min-w-[160px]
                  opacity-85
                  transition
                  duration-300
                  hover:opacity-100
                "
              >
                <img
                  src={logo.src}
                  alt="brand logo"
                  className={`
                    h-8 object-contain
                    transition duration-300
                    ${
                      logo.dark
                        ? 'brightness-150 contrast-110'
                        : ''
                    }
                    hover:drop-shadow-[0_0_10px_rgba(34,197,94,0.35)]
                  `}
                />
              </div>
            ))}
          </motion.div>

          </div>
        </div>
      </section>





      {/* HOW IT WORKS */}
      <section className="relative max-w-6xl mx-auto px-8 py-32">
  {/* ambient green wash for this section */}
  <div className="absolute inset-0 pointer-events-none">
    <div
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(50% 40% at 50% 50%, rgba(34,197,94,0.10), transparent 70%)',
      }}
    />
  </div>

  <div className="relative grid md:grid-cols-3 gap-12 text-center">
    {[
      {
        step: '01',
        title: 'Connect',
        desc: 'Sign in with Google and set your availability.',
      },
      {
        step: '02',
        title: 'Share',
        desc: 'Send your booking link to anyone.',
      },
      {
        step: '03',
        title: 'Meet',
        desc: 'People pick a time and you’re booked.',
      },
    ].map((item, i) => (
      <motion.div
        key={i}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ delay: i * 0.1 }}
        whileHover={{ y: -4 }}
        className="
          relative
          p-8
          rounded-2xl
          bg-white/5
          backdrop-blur-xl
          border border-white/10
          shadow-lg shadow-black/20
        "
      >
        {/* step indicator */}
        <div className="mb-6 text-sm font-medium tracking-widest text-emerald-400/80">
          {item.step}
        </div>

        <h3 className="text-2xl font-semibold tracking-tight text-white">
          {item.title}
        </h3>

        <p className="mt-4 text-white/60 leading-relaxed">
          {item.desc}
        </p>
      </motion.div>
    ))}
  </div>
      </section>



      {/* FINAL CTA */}
        <section className="py-28 text-center relative overflow-hidden">
        {/* subtle ambient glow just for this section */}
        <div className="absolute inset-0 pointer-events-none">
            <div
            className="absolute inset-0"
            style={{
                background:
                'radial-gradient(40% 35% at 50% 50%, rgba(34,197,94,0.12), transparent 70%)',
            }}
            />
        </div>

        <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="
            relative
            text-4xl md:text-5xl
            font-semibold
            tracking-tight
            leading-tight
            bg-clip-text text-transparent
            bg-gradient-to-b
            from-white
            via-white/90
            to-white/70
            "
        >
            Scheduling should be effortless
        </motion.h2>

        <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="
            relative
            mt-5
            max-w-xl mx-auto
            text-lg
            leading-relaxed
            tracking-tight
            text-white/60
            "
        >
            Stop emailing. Start sharing your availability.
        </motion.p>

        <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative mt-10 flex justify-center"
        >
            <motion.div
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
            <Link to="/login">
            <Button className="px-8 py-4 shadow-lg shadow-emerald-500/25 cursor-pointer">
                Get started
            </Button>
            </Link>
            </motion.div>
        </motion.div>
        </section>



      {/* FOOTER */}
      <footer className="relative mt-32 border-t border-white/10">
        {/* ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(40% 30% at 50% 0%, rgba(34,197,94,0.08), transparent 70%)',
            }}
          />
        </div>

        {/* subtle noise texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.035]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
          }}
        />

        {/* MAIN CONTENT */}
        <div className="relative max-w-6xl mx-auto px-8 py-16">
          <div className="grid md:grid-cols-3 gap-12">
            {/* BRAND */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
                <span className="text-white font-semibold tracking-tight">
                  Avail
                </span>
              </div>

              <p className="text-sm text-white/50 leading-relaxed max-w-xs">
                A modern scheduling tool to share availability and book meetings
                without back-and-forth.
              </p>
            </div>

            {/* PRODUCT */}
            <div>
              <h4 className="text-sm font-medium text-white mb-3 px-3.5">
                Product
              </h4>

              <ul className="space-y-2 text-sm">
                {[
                  { label: 'Dashboard', to: '/dashboard' },
                  { label: 'Availability', to: '/dashboard/availability' },
                  { label: 'Bookings', to: '/dashboard/bookings' },
                ].map(item => (
                  <li key={item.label}>
                    <Link
                      to={item.to}
                      className="
                        group
                        inline-flex items-center gap-2
                        text-white/50
                        hover:text-white
                        transition
                      "
                    >
                      {/* dot placeholder — ALWAYS present */}
                      <span
                        className="
                          h-1.5 w-1.5 rounded-full
                          bg-emerald-400
                          opacity-0 scale-0
                          group-hover:opacity-100 group-hover:scale-100
                          transition-all duration-300
                        "
                      />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>


            </div>

            {/* CONNECT */}
            <div>
              <h4 className="text-sm font-medium text-white mb-3 px-3.5">
                Connect
              </h4>

              <ul className="space-y-2 text-sm">
            {[
              {
                label: 'GitHub',
                href: 'https://github.com/Al0kKumar',
              },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/in/alok-kumar-sde',
              },
            ].map(item => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    group
                    inline-flex items-center gap-2
                    text-white/50
                    hover:text-white
                    transition
                  "
                >
                  {/* SAME dot, same spacing */}
                  <span
                    className="
                      h-1.5 w-1.5 rounded-full
                      bg-emerald-400
                      opacity-0 scale-0
                      group-hover:opacity-100 group-hover:scale-100
                      transition-all duration-300
                    "
                  />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>


            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/10 py-6">
          <div className="max-w-6xl mx-auto px-8 flex flex-col items-center gap-1 text-center">
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} Avail. All rights reserved.
            </p>

            <p className="text-xs text-white/30">
              Built by{' '}
              <a
                href="https://alok619.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="text-white/60 hover:text-emerald-400 transition"
              >
                Alok
              </a>
            </p>
          </div>
        </div>
      </footer>



    </div>
  );
}
