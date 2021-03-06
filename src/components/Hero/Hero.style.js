export default {
  main: {
    position: "relative",
    width: "100%",
  },
  img: {
    width: "100%",
    objectFit: "contain",
  },
  title: {
    position: "absolute",
    top: "25%",
    bottom: "25%",
    left: "8%",
    width: "20%",
    color: "white",
  },
  titleTypo: {
    fontSize: "4rem",
    fontWeight: "900",
    "@media(max-width:1509px)": {
      fontSize: "3rem",
    },
    "@media(max-width:1137px)": {
      fontSize: "2.5rem",
    },
    "@media(max-width:1006px)": {
      fontSize: "2rem",
    },
    "@media(max-width:757px)": {
      fontSize: "1.7rem",
    },
    "@media(max-width:690px)": {
      fontSize: "1.5rem",
    },
    "@media(max-width:659px)": {
      fontSize: "1.3rem",
    },
    "@media(max-width:493px)": {
      fontSize: "1.1rem",
    },
    "@media(max-width:444px)": {
      fontSize: "0.9rem",
    },
  },
};
