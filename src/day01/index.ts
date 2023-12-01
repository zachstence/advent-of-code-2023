import run from "aocrunner";

const parseInput = (rawInput: string): string[] => rawInput.split('\n');

const part1 = (rawInput: string): string => {
  const input = parseInput(rawInput);

  const sum = input.reduce<number>((sum, line) => {
    const chars = line.split('')
    
    const first = chars.find(s => !isNaN(parseInt(s)))
    const last = chars.findLast(s => !isNaN(parseInt(s)))
    if (!first || !last) {
      console.error(`Failed to find first and last numbers in ${line}`)
      return sum
    }

    const lineValue = parseInt(`${first}${last}`)

    return sum + lineValue
  }, 0)

  return sum.toString()
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
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
