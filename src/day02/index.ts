import run from "aocrunner";

type Color = 'red' | 'green' | 'blue'

interface Cubes {
  color: Color
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
    color: color as Color,
    count: parseInt(count),
  }
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const max: Record<Color, number> = {
    red: 12,
    green: 13,
    blue: 14,
  }
  let possibleGameIdsSum = 0

  input.forEach(game => {
    const gameIsPossible = game.rounds.every(round => round.every(cubes => cubes.count <= max[cubes.color]))
    if (gameIsPossible) {
      possibleGameIdsSum += game.id
    }
  })
  
  return possibleGameIdsSum.toString();
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const powers = input.map(game => {
    const max = game.rounds.reduce<Record<Color, number>>((acc, round) => {
      round.forEach(cubes => {
        acc[cubes.color] = Math.max(acc[cubes.color], cubes.count)
      })
      return acc
    }, {red: 0, green: 0, blue: 0})

    const power = max.red * max.green * max.blue
    return power
  })

  const sum = powers.reduce<number>((acc, curr) => acc + curr, 0)

  return sum.toString();
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
