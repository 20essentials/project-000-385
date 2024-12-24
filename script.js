const $ = el => document.querySelector(el);
const $$ = el => document.querySelectorAll(el);

const $canvas = $('.game-tetris');
const context = $canvas.getContext('2d');
const $imgSprite = $('.img');
const $score = $('.score');
const $modal = $('dialog');

const blocksize = 13;
const boardWidth = 18;
const boardHeight = 28;
let contador = 0;

$canvas.width = blocksize * boardWidth;
$canvas.height = blocksize * boardHeight;

context.scale(blocksize, blocksize);

const drawMatrix = (rows, cols) => {
  return [...Array(rows)].map(_ => Array(cols).fill(0));
};

const boardMatrix = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1]
];

const xSpriteCoordinate = [
  52 * 1 + 15 * 0,
  52 * 2 + 15 * 1,
  52 * 3 + 15 * 2,
  52 * 4 + 15 * 3,
  52 * 5 + 15 * 4,
  52 * 6 + 15 * 5,
  52 * 7 + 15 * 6,
  52 * 8 + 15 * 7
];

const allPieces = [
  [
    [0, 1, 0],
    [1, 1, 1]
  ],
  [
    [1, 1, 1],
    [1, 0, 0]
  ],
  [[1, 1, 1, 1]],
  [
    [1, 1, 0],
    [0, 1, 1]
  ]
];

const randomImageX = () => {
  return xSpriteCoordinate[
    Math.floor(Math.random() * xSpriteCoordinate.length)
  ];
};

const piece = {
  position: { x: 8, y: 5 },
  shape: [
    [1, 1],
    [1, 1]
  ],
  imageX: randomImageX()
};

/*******************FUNCTIONS*******************/

function draw() {
  context.clearRect(0, 0, $canvas.width, $canvas.height);

  boardMatrix.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        context.drawImage($imgSprite, piece.imageX, 39, 52, 52, x, y, 1, 1);
      }
    });
  });

  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value) {
        context.drawImage(
          $imgSprite,
          piece.imageX,
          39,
          52,
          52,
          piece.position.x + x,
          piece.position.y + y,
          1,
          1
        );
      }
    });
  });
}

function detectCollision() {
  return piece.shape.find((row, y) => {
    return row.find((value, x) => {
      return (
        value === 1 &&
        boardMatrix?.[y + piece.position.y]?.[x + piece.position.x] !== 0
      );
    });
  });
}

function newShape() {
  let newShape = allPieces[~~(Math.random() * allPieces.length)];
  let maxCorX = boardWidth - newShape[0].length;
  let posX = ~~(Math.random() * (maxCorX - 1));

  piece.shape = newShape;
  piece.position = { x: posX, y: 0 };
  piece.imageX = randomImageX();

  if (detectCollision()) {
    $modal.showModal();
  }
}

function solidifyPiece() {
  piece.shape.forEach((row, y) => {
    row.forEach((value, x) => {
      if (value === 1) {
        boardMatrix[piece.position.y + y][piece.position.x + x] = 1;
      }
    });
  });
}

function deleteRows() {
  let rowsToDelete = [];
  boardMatrix.forEach((row, y) => {
    if (row.every(cell => cell === 1)) {
      rowsToDelete.push(y);
    }
  });

  rowsToDelete.toReversed().forEach(y => {
    boardMatrix.splice(y, 1);

    let newRow = Array(boardWidth).fill(0);
    boardMatrix.unshift(newRow);
  });

  let nPoints = rowsToDelete.length;
  Array.from({ length: nPoints }, (_, i) => {
    contador += 100;
  });

  $score.innerHTML = contador;
}

let dropTime = 0;
let lastTime = 0;

function update(time = 0) {
  let deltaTime = time - lastTime;
  lastTime = time;
  dropTime += deltaTime;

  if (dropTime > 500) {
    piece.position.y++;

    if (detectCollision()) {
      piece.position.y--;
      solidifyPiece();
      deleteRows();
      newShape();
    }

    dropTime = 0;
  }

  draw();
  requestAnimationFrame(update);
}

update();

/*******************EVENTS*******************/
document.addEventListener('keydown', ({ key }) => {
  if (key === 'ArrowDown' || key === 'S' || key === 's') {
    piece.position.y++;
    if (detectCollision()) {
      piece.position.y--;
      solidifyPiece();
      deleteRows();
      newShape();
    }
  }
  if (key === 'ArrowLeft' || key === 'A' || key === 'a') {
    piece.position.x--;
    if (detectCollision()) {
      piece.position.x++;
    }
  }

  if (key === 'ArrowRight' || key === 'D' || key === 'd') {
    piece.position.x++;
    if (detectCollision()) {
      piece.position.x--;
    }
  }

  if (key === 'ArrowUp' || key === 'W' || key === 'w') {
    const shapeRotated = [];

    for (let col = 0; col < piece.shape[0].length; col++) {
      let rowShape = [];

      for (let row = piece.shape.length - 1; row >= 0; row--) {
        rowShape.push(piece.shape[row][col]);
      }

      shapeRotated.push(rowShape);
    }

    let previousShape = piece.shape;
    piece.shape = shapeRotated;

    if (detectCollision()) {
      piece.shape = previousShape;
    }
  }
});

const $audio = new Audio('assets/music.mp3');

document.addEventListener('click', ({ target }) => {
  if (target.matches('.again')) {
    location.reload();
  }

  if (target.matches('.sound')) {
    target.classList.toggle('no');
    if (target.classList.contains('no')) {
      $audio.play();
      $audio.volume = 0.7;
    } else {
      $audio.pause();
    }
  }

  if (target.matches('.btn-top') || target.matches('.btn2-top')) {
    const shapeRotated = [];

    for (let col = 0; col < piece.shape[0].length; col++) {
      let rowShape = [];

      for (let row = piece.shape.length - 1; row >= 0; row--) {
        rowShape.push(piece.shape[row][col]);
      }

      shapeRotated.push(rowShape);
    }

    let previousShape = piece.shape;
    piece.shape = shapeRotated;

    if (detectCollision()) {
      piece.shape = previousShape;
    }
  } else if (target.matches('.btn-left') || target.matches('.btn2-left')) {
    piece.position.x--;
    if (detectCollision()) {
      piece.position.x++;
    }
  } else if (target.matches('.btn-right') || target.matches('.btn2-right')) {
    piece.position.x++;
    if (detectCollision()) {
      piece.position.x--;
    }
  } else if (
    target.matches('.btn-bottom') ||
    target.matches('.btn2-bottom')
  ) {
    piece.position.y++;
    if (detectCollision()) {
      piece.position.y--;
      solidifyPiece();
      deleteRows();
      newShape();
    }
  }
});
