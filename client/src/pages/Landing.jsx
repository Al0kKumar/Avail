import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

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
    </div>
  );
}
