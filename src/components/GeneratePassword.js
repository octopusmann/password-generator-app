export function generateCustomPassword(
  includeUpperCase,
  includeLowerCase,
  includeNumbers,
  includeSymbols,
  length
) {
  const charSets = {
    numbers: [48, 57],
    uppercase: [65, 90],
    lowercase: [97, 122],
    symbols: [
      33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 91, 92, 93,
      94, 95, 96,
    ],
  };

  let combinedCharSets = [];

  const addCharCodes = (from, to) => {
    for (let i = from; i < to; i++) {
      combinedCharSets.push(i);
    }
  };

  if (includeUpperCase)
    addCharCodes(charSets.uppercase[0], charSets.uppercase[1]);
  if (includeLowerCase)
    addCharCodes(charSets.lowercase[0], charSets.lowercase[1]);

  if (includeNumbers) addCharCodes(charSets.numbers[0], charSets.numbers[1]);

  if (includeSymbols)
    combinedCharSets = combinedCharSets.concat(charSets.symbols);

  let password = "";
  for (let i = 0; i < length; i++) {
    let randomIndex = Math.floor(Math.random() * combinedCharSets.length);
    let charElement = combinedCharSets[randomIndex];
    password += String.fromCharCode(charElement);
  }
  return password;
}
