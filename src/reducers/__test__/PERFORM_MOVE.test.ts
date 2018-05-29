import gameReducer from '../gameReducer';
import { Map, List } from 'immutable';
import { getSlotValue } from '../../utils';
import * as c from '../../constants/game-constants';
import { Mode, Player } from '../../typings';
import { PERFORM_MOVE } from '../../constants/action-constants';

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
			type: PERFORM_MOVE,
			payload: {
				coord: Map({
					x: -1,
					y: -1
				})
			}
		};

		// get next state
		const nextState = gameReducer(DEFAULT_STATE, action);

		// move history to not be null
		expect(nextState.get('moveHistory').get(0)).toEqual(Map({
			x: -1,
			y: -1,
			player: Player.BLUE
		}));

		// the target coordinates value to not be null
		expect(getSlotValue(nextState.get('board'), Map({
			x: 3,
			y: 3
		}))).toBe(0);
	});
});
