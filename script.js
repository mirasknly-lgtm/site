// Этот скрипт проверяет, находимся ли мы на странице с игрой
const board = document.getElementById('board');

if (board) {
    const cells = document.querySelectorAll('.cell');
    const statusText = document.getElementById('status');
    const resetBtn = document.getElementById('resetBtn');

    let currentPlayer = 'X';
    let gameState = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    // Победные комбинации (индексы ячеек)
    const winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Горизонтали
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Вертикали
        [0, 4, 8], [2, 4, 6]             // Диагонали
    ];

    function handleCellClick(e) {
        const clickedCell = e.target;
        const cellIndex = parseInt(clickedCell.getAttribute('data-index'));

        // Если ячейка занята или игра окончена - ничего не делаем
        if (gameState[cellIndex] !== "" || !gameActive) return;

        // Делаем ход
        gameState[cellIndex] = currentPlayer;
        clickedCell.textContent = currentPlayer;
        clickedCell.classList.add(currentPlayer.toLowerCase());

        checkWin();
    }

    function checkWin() {
        let roundWon = false;
        
        // Проверка всех победных комбинаций
        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusText.textContent = `Победили ${currentPlayer === 'X' ? 'крестики' : 'нолики'}! 🎉`;
            gameActive = false;
            return;
        }

        if (!gameState.includes("")) {
            statusText.textContent = 'Ничья! 🤝';
            gameActive = false;
            return;
        }

        // Передача хода
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Ходят ${currentPlayer === 'X' ? 'крестики (X)' : 'нолики (O)'}`;
    }

    function resetGame() {
        currentPlayer = 'X';
        gameState = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        statusText.textContent = 'Ходят крестики (X)';
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove('x', 'o');
        });
    }

    // Добавляем слушатели событий на клики
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetBtn.addEventListener('click', resetGame);
}
