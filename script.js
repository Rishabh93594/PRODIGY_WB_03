const board = document.getElementById("board");
const statusText = document.getElementById("status");

let currentPlayer = "X";
let gameActive = true;
let cells = Array(9).fill("");

function createBoard() {
  board.innerHTML = "";
  cells.forEach((_, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = index;
    cell.addEventListener("click", handleClick);
    board.appendChild(cell);
  });
  updateStatus();
}

function handleClick(e) {
  const index = e.target.dataset.index;

  if (!gameActive || cells[index] !== "") return;

  cells[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    statusText.textContent = `${currentPlayer} wins! 🎉`;
    gameActive = false;
    return;
  }

  if (!cells.includes("")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateStatus();
}

function updateStatus() {
  statusText.textContent = `${currentPlayer}'s Turn`;
}

function checkWinner() {
  const winCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6]             // diags
  ];

  return winCombos.some(combo => {
    const [a, b, c] = combo;
    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
  });
}

function restartGame() {
  currentPlayer = "X";
  gameActive = true;
  cells = Array(9).fill("");
  createBoard();
}

createBoard();
