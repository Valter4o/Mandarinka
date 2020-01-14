import { ICell } from "./interfaces/cell";

const games: Array<Array<Array<ICell>>> = [
  [
    [{ value: 5 }, { value: 3 }, {}, {}, { value: 7 }, {}, {}, {}, {}],
    [
      { value: 6 },
      {},
      {},
      { value: 1 },
      { value: 9 },
      { value: 5 },
      {},
      {},
      {}
    ],
    [
      { value: 2 },
      {},
      { value: 1 },
      {},
      { value: 3 },
      {},
      { value: 6 },
      {},
      {}
    ],
    [{}, {}, {}, { value: 8 }, {}, { value: 4 }, {}, {}, { value: 4 }],
    [
      { value: 8 },
      {},
      { value: 9 },
      {},
      {},
      {},
      { value: 1 },
      {},
      { value: 6 }
    ],
    [{}, { value: 6 }, {}, {}, {}, {}, {}, { value: 5 }, {}],
    [{}, {}, {}, { value: 5 }, {}, { value: 9 }, {}, {}, {}],
    [
      { value: 9 },
      {},
      { value: 4 },
      {},
      { value: 8 },
      {},
      { value: 7 },
      {},
      { value: 5 }
    ],
    [{ value: 6 }, {}, {}, { value: 1 }, {}, { value: 7 }, {}, {}, { value: 3 }]
  ]
];

export function getRandGame() {
  const id = getRandomIntInclusive(0, games.length - 1);
  // const game = games[0];
  const game = [
    [{ value: 5 }, { value: 3 }, {}, {}, { value: 7 }, {}, {}, {}, {}],
    [
      { value: 6 },
      {},
      {},
      { value: 1 },
      { value: 9 },
      { value: 5 },
      {},
      {},
      {}
    ],
    [
      { value: 2 },
      {},
      { value: 1 },
      {},
      { value: 3 },
      {},
      { value: 6 },
      {},
      {}
    ],
    [{}, {}, {}, { value: 8 }, {}, { value: 4 }, {}, {}, { value: 4 }],
    [
      { value: 8 },
      {},
      { value: 9 },
      {},
      {},
      {},
      { value: 1 },
      {},
      { value: 6 }
    ],
    [{}, { value: 6 }, {}, {}, {}, {}, {}, { value: 5 }, {}],
    [{}, {}, {}, { value: 5 }, {}, { value: 9 }, {}, {}, {}],
    [
      { value: 9 },
      {},
      { value: 4 },
      {},
      { value: 8 },
      {},
      { value: 7 },
      {},
      { value: 5 }
    ],
    [{ value: 6 }, {}, {}, { value: 1 }, {}, { value: 7 }, {}, {}, { value: 3 }]
  ];

  return game;
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
