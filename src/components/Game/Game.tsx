import React, {useCallback} from 'react';
import {GameSocket} from '../../utils/GameSocket';
import {gameStyles} from './GameStyles';
import {GameMap} from './GameMap';

interface Props {
  gameMap: string[];
}

export function Game({gameMap}: Props) {
  const classes = gameStyles();

  const onCellClick = useCallback((y: number, x: number) => {
    GameSocket.socket.send(`open ${x} ${y}`);
  }, []);

  const renderMap = useCallback(
    (gameMap: string[]) => {
      return gameMap.map((game: string, row: number) => {
        const squares = game.split('');
        const rowItems = squares.map((square: string, column: number) => {
          const key = `square-${row}-${column}`;
          const testId = `square-${row}-${column}`;
          return (
            <GameMap
              key={key}
              square={square}
              onClick={() => onCellClick(row, column)}
              testId={testId}
            />
          );
        });

        return (
          <div className={classes.row} key={`square-row-${row}`}>
            {rowItems}
          </div>
        );
      });
    },
    [classes.row, onCellClick],
  );

  if (!gameMap.length) {
    return <p>Choose a level and click on Play</p>;
  }

  return <>{renderMap(gameMap)}</>;
}
