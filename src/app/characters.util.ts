export const lowerCaseCharacters: string[] = [];
for (let i = 97; i < 123; i++) {
  lowerCaseCharacters.push(String.fromCharCode(i));
}

export const upperCaseCharacters: string[] = [];
for (let i = 65; i < 90; i++) {
  upperCaseCharacters.push(String.fromCharCode(i));
}

export const numberCharacters: string[] = [];
for (let i = 0; i < 10; i++) {
  numberCharacters.push(i.toString());
}

export function doesStringContainTypes(
  password: string,
  lower: boolean,
  upper: boolean,
  numbers: boolean,
  special: boolean,
  specialCharacters: string[]
): boolean {
  const allCharacters = Array.from(password);
  const containsOneOf = (characters) =>
    allCharacters.some((x) => characters.includes(x));
  return (
    (!lower || containsOneOf(lowerCaseCharacters)) &&
    (!upper || containsOneOf(upperCaseCharacters)) &&
    (!numbers || containsOneOf(numberCharacters)) &&
    (!special || containsOneOf(specialCharacters))
  );
}
