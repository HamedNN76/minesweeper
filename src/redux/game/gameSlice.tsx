import {createSlice} from '@reduxjs/toolkit';

function convertMapPayload(payload: string): string[] {
  const rowList = payload.split('map:')[1].split('\n');
  return rowList.filter(item => !!item.length);
}

interface GameState {
  map: string[];
  message: string;
}

const initialState: GameState = {
  map: [],
  message: '',
};

export type CreateGameAction = {
  type: string;
  payload: string;
};

export type SetMapAction = {
  type: string;
  payload: string;
};

export type UpdateMessageAction = {
  type: string;
  payload: string;
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    init() {},
    createGame(state: GameState, action: CreateGameAction) {},
    getMap(state: GameState) {},
    setMap(state: GameState, action: SetMapAction) {
      state.map = convertMapPayload(action.payload);
    },
    updateMessage(state: GameState, action: UpdateMessageAction) {
      state.message = action.payload;
    },
  },
});

export const {init, setMap, createGame, updateMessage} = gameSlice.actions;

export const gameReducer = gameSlice.reducer;
