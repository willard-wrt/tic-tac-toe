const game = (() => {
  const playerFactory = (name, mark, turn) => ({ name, mark, turn });
  const player1 = playerFactory('player 1', '', true);
  const player2 = playerFactory('player 2', '', false);
  const board = [];
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  let winner = null;
  let winnerArr = [];
  let roundCount = 0;
  // Function for the game board
  const gamePlay = (function () {
    const box = document.querySelectorAll('.box');
    box.forEach((a) => {
      a.addEventListener('click', (e) => {
        console.log(board);
        if (
          player1.turn === true &&
          e.target.textContent === '' &&
          winner === null
        ) {
          board[e.target.id] = player1.mark;
          a.textContent = player1.mark;
          a.classList.add(player1.mark);
          player1.turn = false;
          player2.turn = true;
          roundCount += 1;
        } else if (
          player2.turn === true &&
          e.target.textContent === '' &&
          winner === null
        ) {
          board[e.target.id] = player2.mark;
          a.textContent = player2.mark;
          a.classList.add(player2.mark);
          player1.turn = true;
          player2.turn = false;
          roundCount += 1;
        }

        console.log(roundCount);
        console.log(winnerArr);
        console.log(winner);
        winChecker();
        winPainter(box);
      });
    });
  })();

  const winChecker = () => {
    const winnerDisplay = document.querySelector('.game-msg');

    const firstPlays = board.reduce(
      (a, v, i) => (v === player1.mark ? a.concat(i) : a),
      []
    );
    const secondPlays = board.reduce(
      (a, v, i) => (v === player2.mark ? a.concat(i) : a),
      []
    );

    for (const [index, combo] of winConditions.entries()) {
      if (combo.every((elem) => firstPlays.includes(elem) === true)) {
        winner = 'p1';
        winnerArr = combo;
      } else if (combo.every((elem) => secondPlays.indexOf(elem) > -1)) {
        winner = 'p2';
        winnerArr = combo;
      }
    }

    if (winner === 'p1') {
      winnerDisplay.innerHTML = 'You are the winner!';
    } else if (winner === 'p2') {
      winnerDisplay.innerHTML = 'You lost the game!';
    } else if (winner === null && roundCount > 8) {
      winnerDisplay.innerHTML = 'It is a tie!';
    }
  };

  const winPainter = (box) => {
    box.forEach((a) => {
      for (let i = 0; i < winnerArr.length; i++) {
        if (a.id == winnerArr[i]) {
          a.classList.contains('o')
            ? (a.style.backgroundColor = '#fecaca')
            : (a.style.backgroundColor = '#99f6e4');
        }
      }
    });
  };

  const clickEvent = (() => {
    document.addEventListener('click', (e) => {
      const { target } = e;
      const titleMenu = document.getElementById('selection');
      const gameBoard = document.getElementById('board-container');
      const catMark = document.querySelector('.cat-mark');
      const firstMark = () => (catMark.classList.contains('o') ? 'o' : 'x');
      const secondMark = () => (player1.mark === 'o' ? 'x' : 'o');
      if (target.id === 'start') {
        titleMenu.style.display = 'none';
        gameBoard.style.display = 'flex';
        player1.mark = firstMark();
        player2.mark = secondMark();
      } else if (target.classList.contains('cat-mark')) {
        if (target.classList.contains('o')) {
          target.classList.remove('o');
          target.classList.add('x');
        } else {
          target.classList.remove('x');
          target.classList.add('o');
        }
      }
    });
  })();
})();
