import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {ThemeProvider} from '@mui/material/styles';
import Button from '@mui/material/Button';
import {Select} from '../Select/Select';
import {SelectChangeEvent, Paper} from '@mui/material';
import {createGame, init} from '../../redux/game/gameSlice';
import {Game} from '../Game/Game';
import {useAppStyles, darkTheme} from './appStyles';
import {useAppDispatch, useAppSelector} from '../../hooks/useStore';

function App() {
  const selectBoxData = useMemo(() => {
    return [
      {value: '1', name: 'Easy'},
      {value: '2', name: 'Normal'},
      {value: '3', name: 'Hard'},
      {value: '4', name: 'Very Hard'},
    ];
  }, []);

  const classes = useAppStyles();

  const dispatch = useAppDispatch();
  const gameState = useAppSelector(state => state.game);

  const [level, setLevel] = useState<number>(1);

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  const onPlayGame = useCallback(() => {
    dispatch(createGame(`new ${level}`));
  }, [dispatch, level]);

  const handleOnLevelChange = useCallback((event: SelectChangeEvent) => {
    const newLevel = Number(event?.target?.value);
    setLevel(newLevel);
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.layoutContainer}>
        <Paper className={classes.container}>
          <p className={classes.title}>Minesweeper</p>
          <div
            className={
              gameState.map.length <= 10
                ? `${classes.content} ${classes.smallContent}`
                : classes.content
            }
          >
            <Game gameMap={gameState.map} />
          </div>
          <div className={classes.footer}>
            <Select
              label="Level"
              onChange={handleOnLevelChange}
              value={level.toString()}
              data={selectBoxData}
            />
            <Button
              onClick={onPlayGame}
              variant="contained"
              color="info"
              className={classes.play}
              data-testid="start-game-btn"
            >
              {gameState.map.length ? 'Play again' : 'Play'}
            </Button>
          </div>
        </Paper>
      </div>
    </ThemeProvider>
  );
}

export default App;
