import run from "aocrunner";

type Card = {
  index: number
  winningNumbers: number[]
  yourNumbers: number[]
  numMatches: number
}

type ParsedInput = Card[]

const getNumMatches = (winningNumbers: number[], yourNumbers: number[]): number => yourNumbers.filter(yourNumber => winningNumbers.includes(yourNumber)).length

const parseInput = (rawInput: string): ParsedInput => {
  return rawInput.split('\n').map((line, i) => {
    const [winningNumbersStr, yourNumbersStr] = line.replaceAll(/Card +\d+: /g, '').split(' | ')
    const winningNumbers = winningNumbersStr.split(' ').filter(x => x.length).map(x => parseInt(x))
    const yourNumbers = yourNumbersStr.split(' ').filter(x => x.length).map(x => parseInt(x))
    return {
      index: i,
      winningNumbers,
      yourNumbers,
      numMatches: getNumMatches(winningNumbers, yourNumbers),
    }
  })
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  
  const sum = input.reduce<number>((sum, { numMatches }) => {
    if (numMatches === 0) return sum
    const cardValue = Math.pow(2, numMatches - 1)
    return sum + cardValue
  }, 0)

  return sum.toString();
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let numCards = 0

  const indicesToProcess = input.map(card => card.index)
  while (indicesToProcess.length > 0) {
    numCards++

    const index = indicesToProcess.shift()!
    const card = input[index]
    if (!card) continue

    const wonIndices = Array.from({ length: card.numMatches }).map((_, i) => card.index + 1 + i)
    indicesToProcess.unshift(...wonIndices)
  }

  return numCards.toString();
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
