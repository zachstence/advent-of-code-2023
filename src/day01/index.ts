import run from "aocrunner";
import console from "console";

const WORD_TO_NUMBER: Record<string, string> = {
  'one': '1',
  'two': '2',
  'three': '3',
  'four': '4',
  'five': '5',
  'six': '6',
  'seven': '7',
  'eight': '8',
  'nine': '9',
}

const parseInput = (rawInput: string): string[] => rawInput.split('\n');

const part1 = (rawInput: string): string => {
  const input = parseInput(rawInput);

  const sum = input.reduce<number>((sum, line) => {
    const chars = line.split('')
    
    const first = chars.find(s => !isNaN(parseInt(s)))
    const last = chars.findLast(s => !isNaN(parseInt(s)))
    if (!first || !last) {
      console.error(`Failed to find first and last numbers in '${line}'`)
      return sum
    }

    const lineValue = parseInt(`${first}${last}`)

    return sum + lineValue
  }, 0)

  return sum.toString()
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput)

  const sum = input.reduce<number>((sum, line) => {
    const matches = [...line.matchAll(/(?=(one|two|three|four|five|six|seven|eight|nine|1|2|3|4|5|6|7|8|9))/gi)]

    const firstMatch = matches[0]
    const lastMatch = matches[matches.length - 1]

    const firstMatchStr = firstMatch[1]
    const firstMatchNumber = firstMatchStr.length === 1 ? firstMatchStr : WORD_TO_NUMBER[firstMatchStr]

    const lastMatchStr = lastMatch[1]
    const lastMatchNumber = lastMatchStr.length === 1 ? lastMatchStr : WORD_TO_NUMBER[lastMatchStr]

    const lineValue = parseInt(`${firstMatchNumber}${lastMatchNumber}`)

    return sum + lineValue
  }, 0)

  return sum.toString()
};

run({
  part1: {
    tests: [
      {
        input: `1asdjfahsdfjhkagsdjhfg2`,
        expected: "12",
      },
      {
        input: `asfasdfsfasdfas9asfasfasdfasdfa`,
        expected: "99",
      },
      {
        input: `asdf8f8asdfasdfasdfasdf`,
        expected: "88",
      },
      {
        input: `1`,
        expected: "11",
      },
      {
        input: `12`,
        expected: "12",
      },
      {
        input: `122222222222222222222221`,
        expected: "11",
      },
      {
        input: `3sdfasdfsfasfasdfasdfas`,
        expected: "33",
      },
      {
        input: `asdfasdf7as6f6asdfa6sdf8as6fas5dfa54sd3f56asd3f48as67dtfasd6f545asd3f5as3d46f6a5s8df68as56d8f4asd6f4as6df`,
        expected: "76",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `two1asdjfahsdfjhkagsdjhfg2`,
        expected: "22",
      },
      {
        input: `asfasdfsfasdfasnineasfasfasdfasdfa`,
        expected: "99",
      },
      {
        input: `asdfeightfeightasdfasdfasdfasdf`,
        expected: "88",
      },
      {
        input: `1`,
        expected: "11",
      },
      {
        input: `1onetwothree2`,
        expected: "12",
      },
      {
        input: `one2222222222nine222222222221`,
        expected: "11",
      },
      {
        input: `3sdthreefasdfsfasfasdfasdfas`,
        expected: "33",
      },
      {
        input: `asdfasdf7assixf6asdfa6sdfeightas6fasfivedfa54sd3f56asd3f48as67dtfasd6f545asd3f5as3d46f6a5s8df68as56d8f4asd6f4as6789sixdf`,
        expected: "76",
      },
      {
        input: 'twoneightwonelevenineight',
        expected: '28',
      },
      {
        input: 'nineight',
        expected: '98',
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
