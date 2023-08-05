import React, { useState } from "react";
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
    };

    return (
        <Container>
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
