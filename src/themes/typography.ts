import FontSizes from "./fontSize";
import Fonts from "./fonts";

const Typography = {
  h1: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes["4xl"],
    // lineHeight: 40,
    letterSpacing: 0.5,
  },
  h2: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes["3xl"],
    // lineHeight: 36,
    letterSpacing: 0.25,
  },
  h3: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes["2xl"],
    //  lineHeight: 32,
    letterSpacing: 0,
  },
  h4: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.xl,
    //  lineHeight: 28,
    letterSpacing: 0.25,
  },
  h5: {
    fontFamily: Fonts.bold,
    fontSize: FontSizes.lg,
    //  lineHeight: 24,
    letterSpacing: 0,
  },
  subtitle: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.md,

    letterSpacing: 0.5,
  },
  body: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
    //lineHeight: 20,
    letterSpacing: 0.25,
  },
  caption: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.xs,
    // lineHeight: 16,
    letterSpacing: 0.4,
  },
};
export default Typography;
