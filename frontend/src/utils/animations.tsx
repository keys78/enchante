export const modalVariants = {
    initial: {
      opactity: 0,
      x: "-100vw",
    },
    final: {
      opactity: 1,
      x: 0,
      transition: { duration: 0.4, delay: 0}
    },
    exit: {
      opactity: 0,
      x: "-100vw",
      transition: { duration: 0.4, delay: 0.2 },
    }
  };

export const searchBarVariants = {
    initial: {
      opactity: 0,
      y: "-100vh",
    },
    final: {
      opactity: 1,
      y: 0,
      transition: { duration: 0.4, delay: 0}
    },
    exit: {
      opactity: 0,
      y: "-100vh",
      transition: { duration: 0.4, delay: 0.2 },
    }
  };

  export const backdropVariant = {
    hidden: {
        opacity: 0,
        transition: { duration: 0.4, delay: 0.2 },

    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.5,
        },
    },
};