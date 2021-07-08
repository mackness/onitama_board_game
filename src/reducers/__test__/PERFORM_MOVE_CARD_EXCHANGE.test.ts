import gameReducer from '../gameReducer';
import { Map, List } from 'immutable';
import * as c from '../../constants/game-constants';
import { Mode, Player } from '../../typings';
import { MOVE_CARD_EXCHANGE } from '../../constants/action-constants';

export const DEFAULT_STATE = Map({
	board: c.DEFAULT_BOARD,
	capturedPieces: Map({
		red: List([0, 0, 0, 0, 0]),
		blue: List([0, 0, 0, 0, 0]),
	}),
	swapCard: c.DEFAULT_CARD,
	redMoveCard1: c.DEFAULT_CARD,
	redMoveCard2: c.DEFAULT_CARD,
	blueMoveCard1: c.DEFAULT_CARD,
	blueMoveCard2: c.DEFAULT_CARD,
	activeSlotCoord: c.EMPTY_COORD,
	candidateCoords: List(),
	activePlayer: null,
	moveHistory: List(),
	winner: false,
	isChoosingMoveCard: false,
	isComputerMoveScheduled: false,
	mode: Mode.COMPUTER
});

test('game reducer', () => {

	it('performs a move', () => {
		const action = {
			type: MOVE_CARD_EXCHANGE,
			payload: {moveCard: c.BLUE_MOVE_CARD_1}
		};

		// get next state
		const nextState = gameReducer(DEFAULT_STATE, action);

		// the target coordinates value to not be null
		expect(nextState.get('swapCard')).not.toBe(null);

		// the active player to be toggled
		expect(nextState.get('activePlayer')).toBe(Player.RED);
	});
});
