(function clickEvent() {
  document.addEventListener('click', (e) => {
    const { target } = e;
    const titleMenu = document.getElementById('selection');
    const gameBoard = document.getElementById('board-container');
    console.log(target);
    if (target.id === 'start') {
      console.log('start btn is clicked');
      titleMenu.style.display = 'none';
      gameBoard.style.display = 'flex';
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
