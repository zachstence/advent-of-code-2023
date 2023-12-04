import run from "aocrunner";

type Card = {
  winningNumbers: number[]
  yourNumbers: number[]
}

type ParsedInput = Card[]

const parseInput = (rawInput: string): ParsedInput => {
  return rawInput.split('\n').map((line, i) => {
    const [winningNumbersStr, yourNumbersStr] = line.replaceAll(/Card +\d+: /g, '').split(' | ')
    const winningNumbers = winningNumbersStr.split(' ').filter(x => x.length).map(x => parseInt(x))
    const yourNumbers = yourNumbersStr.split(' ').filter(x => x.length).map(x => parseInt(x))
    return { winningNumbers, yourNumbers }
  })
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  
  const sum = input.reduce<number>((sum, card) => {
    const matches = card.yourNumbers.filter(yourNumber => card.winningNumbers.includes(yourNumber))
    const numMatches = matches.length
    if (numMatches === 0) return sum
    const cardValue = Math.pow(2, numMatches - 1)
    return sum + cardValue
  }, 0)

  return sum.toString();
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
