import run from "aocrunner";

interface Cubes {
  color: 'red' | 'green' | 'blue'
  count: number
}

type Round = Cubes[]

interface Game {
  id: number
  rounds: Round[]
}

const parseInput = (rawInput: string): Game[] => {
  return rawInput.split('\n').map(lineToGame)
};

const lineToGame = (line: string): Game => {  
  const id = parseGameId(line)
  const rounds = parseRounds(line)
  return {id, rounds}
}

const parseGameId = (line: string): number => {
  return parseInt(line.split(':')[0].split(' ')[1])
}

const parseRounds = (line: string): Round[] => {
  return line.split(':')[1].split(';').map(parseRound)
}

const parseRound = (round: string): Round => {
  return round.split(',').map(parseCubes)
}

const parseCubes = (cubes: string): Cubes => {
  const [count, color] = cubes.trim().split(' ')

  return {
    color: color as 'red' | 'green' | 'blue',
    count: parseInt(count),
  }
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  console.log(JSON.stringify(input, null, 2))

  return;
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
  onlyTests: true,
});
