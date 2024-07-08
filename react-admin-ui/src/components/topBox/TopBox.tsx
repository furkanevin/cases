import './topBox.scss';
import { topDealUsers } from '../../data.ts';
import { motion } from 'framer-motion';

const TopBox = () => {
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
    <div className="topBox">
      <h1>Recent Messages</h1>
      <motion.div
        variants={variants}
        initial="hidden"
        animate="show"
        className="list"
      >
        {topDealUsers.map((user) => (
          <motion.div
            variants={item}
            className="listItem"
            key={user.id}
          >
            <div className="user">
              <img src={user.img} alt="" />
              <div className="userTexts">
                <span className="username">{user.username}</span>
                <span className="email">{user.email}</span>
              </div>
            </div>
            <span className="amount">{user.date}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default TopBox;
