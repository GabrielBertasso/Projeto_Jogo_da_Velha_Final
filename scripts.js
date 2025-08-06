// Variáveis do jogo
const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const scoreX = document.getElementById('score-x');
const scoreO = document.getElementById('score-o');
const resetGameBtn = document.getElementById('reset-game');
const resetScoresBtn = document.getElementById('reset-scores');
const resultPopup = document.getElementById('result-popup');
const resultMessage = document.getElementById('result-message');
const playAgainBtn = document.getElementById('play-again');

let currentPlayer = 'X'; // Jogador atual
let gameActive = true; // Estado do jogo
let gameState = ['', '', '', '', '', '', '', '', '']; // Estado do tabuleiro
let scores = { X: 0, O: 0 }; // Pontuação dos jogadores

// Condições de vitória
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
    [0, 4, 8], [2, 4, 6]             // diagonais
];

// Inicializa o jogo
function initGame() {
    cells.forEach(cell => {
        cell.addEventListener('click', handleCellClick); // Adiciona evento de clique nas células
    });
    
    resetGameBtn.addEventListener('click', resetGame); // Adiciona evento de clique no botão de reset do jogo
    resetScoresBtn.addEventListener('click', resetScores); // Adiciona evento de clique no botão de reset da pontuação
    playAgainBtn.addEventListener('click', resetGame); // Adiciona evento de clique no botão de jogar novamente
    
    updateScoreboard(); // Atualiza o placar
}

// Manipula o clique na célula
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));
    
    // Se o jogo não está ativo ou célula já está preenchida
    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }
    
    // Atualiza o estado do jogo
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    
    // Verifica se há um vencedor
    checkResult();
}

// Verifica o resultado do jogo
function checkResult() {
    let roundWon = false;
    
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        
        if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
            continue;
        }
        
        if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
            roundWon = true; // Alguém ganhou
            break;
        }
    }
    
    // Se alguém ganhou
    if (roundWon) {
        gameActive = false;
        scores[currentPlayer]++; // Incrementa a pontuação do jogador
        updateScoreboard(); // Atualiza o placar
        resultMessage.textContent = `Jogador ${currentPlayer} venceu!`;
        resultPopup.style.display = 'flex'; // Exibe o popup de resultado
        return;
    }
    
    // Se deu empate
    if (!gameState.includes('')) {
        gameActive = false;
        resultMessage.textContent = 'Deu Velha!';
        resultPopup.style.display = 'flex'; // Exibe o popup de resultado
        return;
    }
    
    // Muda o jogador
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('current-turn').textContent = `É a vez do jogador ${currentPlayer}`; // Atualiza a indicação de turno
}

// Reseta o jogo (tabuleiro)
function resetGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    
    cells.forEach(cell => {
        cell.textContent = ''; // Limpa o conteúdo das células
    });
    
    resultPopup.style.display = 'none'; // Esconde o popup de resultado
    document.getElementById('current-turn').textContent = `É a vez do jogador ${currentPlayer}`; // Reseta a indicação de turno
}

// Reseta a pontuação
function resetScores() {
    scores = { X: 0, O: 0 }; // Reseta a pontuação
    updateScoreboard(); // Atualiza o placar
}

// Atualiza o placar
function updateScoreboard() {
    scoreX.textContent = scores.X; // Atualiza o placar do jogador X
    scoreO.textContent = scores.O; // Atualiza o placar do jogador O
}

// Inicia o jogo
initGame();