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
import { motion, useScroll, useTransform } from 'framer-motion';
import { Calendar, Link2, CheckCircle } from 'lucide-react';
import Marquee from 'react-fast-marquee';
import { useRef } from 'react';

const logos = [
  {src: cars24 }, 
  {src: doordash}, 
  {src: dropbox, dark: true}, 
  {src: royal_enfield},
  {src: loreal}, 
  {src: snapdeal, dark: true},
  {src: razorpay},
  {src: matrimoney},
  {src: noise, dark: true}
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};



function AnimatedConnector() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 70%', 'end 40%'],
  });

  const draw = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      ref={ref}
      className="absolute inset-0 pointer-events-none hidden md:block"
    >
      <svg
        viewBox="0 0 1000 200"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        {/* 1 → 2 */}
        <motion.line
          x1="180"
          y1="100"
          x2="500"
          y2="100"
          stroke="url(#grad)"
          strokeWidth="0.5"
          strokeLinecap="round"
          pathLength="1"
          style={{ pathLength: draw }}
        />

        {/* 2 → 3 */}
        <motion.line
          x1="500"
          y1="100"
          x2="820"
          y2="100"
          stroke="url(#grad)"
          strokeWidth="0.5"
          strokeLinecap="round"
          pathLength="1"
          style={{ pathLength: draw }}
        />

        <defs>
          <linearGradient id="grad" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}




  function StepCard({ title, desc, icon: Icon, depth }) {
  const { scrollYProgress } = useScroll({
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, depth]);

  return (
    <motion.div
      style={{ y }}
      whileHover={{ y: depth - 6 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      className="group relative"
    >
      {/* ICON DOT */}
      <div className="mb-6 flex justify-center">
        <div
          className="
            relative
            flex items-center justify-center
            h-10 w-10 rounded-full
            bg-emerald-400/15
            border border-emerald-400/30
            text-emerald-400
            shadow-[0_0_18px_rgba(34,197,94,0.35)]
          "
        >
          <Icon size={18} />
        </div>
      </div>

      {/* CARD */}
      <div
        className="
          relative
          p-8
          rounded-2xl
          bg-white/5
          backdrop-blur-xl
          border border-white/10
          shadow-lg shadow-black/20
          transition
          group-hover:border-emerald-400/30
        "
      >
        <h3 className="text-2xl font-semibold tracking-tight text-white">
          {title}
        </h3>

        <p className="mt-4 text-white/60 leading-relaxed">
          {desc}
        </p>
      </div>
    </motion.div>
  );
}


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

      <div className="relative max-w-6xl mx-auto px-6">
        <p className="text-center text-sm tracking-wide text-white/50 mb-10">
          TRUSTED BY TEAMS AT
        </p>

        <Marquee
          speed={45}              // 👈 consistent across devices
          pauseOnHover
          pauseOnClick
          gradient={false}
          className="overflow-hidden"
        >
          {logos.map((logo, i) => (
            <div
              key={i}
              className="
                mx-10
                flex items-center justify-center
                opacity-100
                hover:opacity-100
                transition
              "
            >
              <img
                src={logo.src}
                alt="brand logo"
                className={`
                  h-7 md:h-8
                  object-contain
                  transition
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
        </Marquee>
      </div>
    </section>






    {/* HOW IT WORKS */}
    <section className="relative max-w-6xl mx-auto px-8 py-36 overflow-hidden">
      {/* ambient wash */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(55% 45% at 50% 50%, rgba(34,197,94,0.12), transparent 70%)',
          }}
        />
      </div>

      {/* SCROLL-ANIMATED CONNECTOR */}
      <AnimatedConnector />

      <div className="relative grid md:grid-cols-3 gap-14 text-center">
        {[
          {
            title: 'Connect',
            desc: 'Sign in with Google and define your availability.',
            icon: Calendar,
            depth: -20,
          },
          {
            title: 'Share',
            desc: 'Send your booking link to anyone, instantly.',
            icon: Link2,
            depth: -35,
          },
          {
            title: 'Meet',
            desc: 'They pick a time — you’re automatically booked.',
            icon: CheckCircle,
            depth: -20,
          },
        ].map((item, i) => (
          <StepCard key={i} {...item} />
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
