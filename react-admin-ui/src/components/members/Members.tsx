import './members.scss';
import { members } from '../../data.ts';
import { motion } from 'framer-motion';

const TeamMembers = () => {
  const variants = {
    hidden: {
      opacity: 0,
    },

    show: {
      opacity: 1,
      transition: { staggerChildren: 0.07 },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      scale: 0,
    },

    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.2 },
    },
  };
  return (
    <div className="members">
      <h1>Team Members</h1>
      <motion.div
        variants={variants}
        initial="hidden"
        animate="show"
        className="list"
      >
        {members.map((memberImg, i) => (
          <motion.div variants={item}>
            <img key={i} src={memberImg} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default TeamMembers;
