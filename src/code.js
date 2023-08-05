import React, { useState ,useEffect } from "react";
import styled from 'styled-components';
import x from './img/x.png';
import o from './img/o.png';

const Code = () => {
    const initialBoard = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];

    const [player, setPlayer] = useState(false);
    const [board, setBoard] = useState(initialBoard);
    const [winner, setWinner] = useState(null);

    useEffect(() => {
        const checkWinner = () => {
            // Check rows, columns, and diagonals for a winning combination
            for (let i = 0; i < 3; i++) {
                if (board[i][0] && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
                    setWinner(board[i][0]);
                    return;
                }
                if (board[0][i] && board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
                    setWinner(board[0][i]);
                    return;
                }
            }
            if (board[0][0] && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
                setWinner(board[0][0]);
                return;
            }
            if (board[0][2] && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
                setWinner(board[0][2]);
                return;
            }
        };

        checkWinner();
    }, [board]);

    const playerSwitch = (row, col) => {
        if (board[row][col] === null) {
            const newBoard = [...board];
            newBoard[row][col] = player ? 'x' : 'o';
            setBoard(newBoard);
            setPlayer(!player);
        }
    };

    const restartGame = () => {
        setBoard(initialBoard);
        setPlayer(false);
        setWinner(null)
        
    };

    let statusMessage = '';
    if (winner) {
        statusMessage = `Player ${winner.toUpperCase()} wins!`;
    } else if (board.every(row => row.every(cell => cell !== null))) {
        statusMessage = "It's a draw!";
    } else {
        statusMessage = `Current player: ${player ? 'X' : 'O'}`;
    }

    return (
        <Container>
            <h2>{statusMessage}</h2>
            <Table>
                <tbody>
                    {board.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {row.map((cell, colIndex) => (
                                <td key={colIndex} onClick={() => playerSwitch(rowIndex, colIndex)}>
                                    {cell === 'x' ? <img src={x} alt='X' /> : (cell === 'o' ? <img src={o} alt='O' /> : null)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
            <RestartButton onClick={restartGame}>Restart</RestartButton>
        </Container>
    );
};

const Container = styled.div`
    img { height: 50px; }
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
`;

const Table = styled.table`
    text-align: center;
    border-collapse: collapse;

    td {
        border: 2px solid black;
        vertical-align: middle;
        font-size: 36px;
        cursor: pointer;
        height: 100px;
        width: 100px;
    }
`;

const RestartButton = styled.button`
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 18px;
    cursor: pointer;
`;

export default Code;
