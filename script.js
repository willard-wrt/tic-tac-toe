const game = (() => {
  const playerFactory = (name, mark, turn) => ({ name, mark, turn });
  const player1 = playerFactory('player 1', '', true);
  const player2 = playerFactory('player 2', '', false);

  // Function for the game board
  const gamePlay = (function () {
    const board = [];
    const box = document.querySelectorAll('.box');
    box.forEach((a) => {
      a.addEventListener('click', (e) => {
        console.log(board);
        if (player1.turn === true && e.target.textContent === '') {
          board[e.target.id] = player1.mark;
          a.textContent = player1.mark;
          a.classList.add(player1.mark);
          player1.turn = false;
          player2.turn = true;
        } else if (player2.turn === true && e.target.textContent === '') {
          board[e.target.id] = player2.mark;
          a.textContent = player2.mark;
          a.classList.add(player2.mark);
          player1.turn = true;
          player2.turn = false;
        }
      });
    });
  })();

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
