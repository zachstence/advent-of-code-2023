import run from "aocrunner";

type Match = {
  content: string
  row: number
  columns: [number, number]
}

type ParsedInput = {
  width: number
  height: number
  numbers: Match[]
  parts: Match[]
}

const parseInput = (rawInput: string): ParsedInput => {
  const lines = rawInput.split('\n')
  const width = lines[0].length
  const height = lines.length

  let numbers: Match[] = []
  let parts: Match[] = []
  const regexMatches = [...rawInput.replaceAll('\n', '').matchAll(/(\d+|[^\.])/g)]
  regexMatches.forEach(regexMatch => {
    const content = regexMatch[0]
    
    const startIndex = regexMatch.index
    const row = Math.floor(startIndex / width)
    const startColumn = startIndex - row * width
    const endColumn = startColumn + content.length - 1
    const columns = [startColumn, endColumn] as [number, number]

    const match: Match = { content, row, columns }
    
    if (!isNaN(parseInt(match.content))) numbers.push(match)
    else parts.push(match)
  })


  return {
    width,
    height,
    numbers,
    parts,
  }
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  
  const sum = input.numbers.reduce<number>((sum, number) => {
    const isPartNumber = input.parts.some(part => areMatchesAdjacent(number, part))
    if (isPartNumber) return sum + parseInt(number.content)
    return sum
  }, 0)

  return sum.toString();
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const sum = input.parts.reduce<number>((sum, part) => {
    if (part.content !== '*') return sum

    const adjacentNumbers = input.numbers.filter(number => areMatchesAdjacent(part, number))
    if (adjacentNumbers.length !== 2) return sum

    const [{ content: number1Content }, { content: number2Content }] = adjacentNumbers as [Match, Match]
    const gearRatio = parseInt(number1Content) * parseInt(number2Content)
    return sum + gearRatio
  }, 0)

  return sum.toString();
};

const areMatchesAdjacent = (a: Match, b: Match): boolean => {
  const sameRow = a.row === b.row
  const adjacentRow = areNumbersAdjacent(a.row, b.row)

  // If rows are not equal or adjacent, matches cant be adjacent
  if (!sameRow && !adjacentRow) return false

  // If in the same row, start/end columns must be adjacent
  if (sameRow) {
    return areNumbersAdjacent(a.columns[0], b.columns[1]) || areNumbersAdjacent(a.columns[1], b.columns[0])
  }

  // If in adjacent rows, columns must overlap
  if (adjacentRow) {
    const overlap = areRangesAdjacent(a.columns, b.columns)
    return overlap
  }

  return false
}

const areNumbersAdjacent = (a: number, b: number): boolean => a === b - 1 || b === a - 1

const areRangesAdjacent = (a: [number, number], b: [number, number]): boolean => (
  (a[0] >= b[0] - 1 && a[0] <= b[1] + 1)
  || (a[1] >= b[0] - 1 && a[1] <= b[1] + 1)
  || (b[0] >= a[0] - 1 && b[0] <= a[1] + 1)
  || (b[1] >= a[0] - 1 && b[1] <= a[1] + 1)
)

run({
  part1: {
    tests: [
      {
        input: `
        123.*
        `,
        expected: "0",
      },
      {
        input: `
        123*456
        `,
        expected: "579",
      },
      {
        input: `
        .1.
        2*3
        .4.
        `,
        expected: "10",
      }
    ],
    solution: part1,
  },
  part2: {
    tests: [],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
