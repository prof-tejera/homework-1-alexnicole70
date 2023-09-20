import fetch from "node-fetch";
// Recommend using node-fetch for those familiar with JS fetch

const COLORS = "https://nt-cdn.s3.amazonaws.com/colors.json";

/**
 * @param name filter for color name
 * @param hex filter for color hex code
 * @param compName filter for complementary color name
 * @param compHex filter for complementary color hex code
 * @returns Promise
 */

const fetchColors = ({ name, hex, compName, compHex }) => {
  return new Promise((resolve, reject) => {
    fetch(COLORS)
      .then((v) => v.json())
      .then((colorData) => {
        // name contains string (case insensitive)
        if (name) {
          resolve(
            colorData.filter((color) => color.name.toLowerCase().includes(name.toLowerCase()))
          );
        }
        // hex code (without '#')
        if (hex) {
          resolve(
            colorData.filter((inputColor) => inputColor.hex.includes(hex))
          );
        }

        // it contains a complementary color whose name contains a string (case insensitive)
        if (compName) {
          resolve(
            colorData.filter(
              (inputColor) =>
                inputColor.comp.filter((inputCompColor) =>
                  inputCompColor.name.toLowerCase().includes(compName.toLowerCase())
                ).length > 0
            )
          );
        }

        // it contains a complementary color whose hex code equals a given hex code (without '#')

        if (compHex) {
          resolve(
            colorData.filter(
              (inputColor) =>
                inputColor.comp.filter((inputCompColor) =>
                  inputCompColor.hex.includes(compHex)
                ).length > 0
            )
          );
        }
      });
  });
};

// Leave this here
export default fetchColors;
