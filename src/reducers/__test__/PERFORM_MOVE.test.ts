import gameReducer from '../gameReducer';
import { Map, fromJS, List } from 'immutable';
import { getSlotValue } from '../../utils';
import c from '../../constants/game-constants';
import { PERFORM_MOVE } from '../../constants/action-constants';

const DEFAULT_STATE = Map({
	board: fromJS([
		[c.RED, 0, 0, 0, c.BLUE],
		[c.RED, 0, 0, 0, c.BLUE],
		[c.RED_MASTER, 0, 0, 0, c.BLUE_MASTER],
		[c.RED, 0, 0, 0, c.BLUE],
		[c.RED, 0, 0, 0, c.BLUE]
	]),
	swapCard: c.DEFAULT_CARD,
	redMoveCard1: c.DEFAULT_CARD,
	redMoveCard2: c.DEFAULT_CARD,
	blueMoveCard1: c.DEFAULT_CARD,
	blueMoveCard2: c.DEFAULT_CARD,
	activeSlotCoord: Map({
		x: 4,
		y: 4
	}),
	candidateCoords: List(),
	activePlayer: c.BLUE,
	moveHistory: List(),
	isChoosingMoveCard: false
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
			player: c.BLUE
		}));

		// the target coordinates value to not be null
		expect(getSlotValue(nextState.get('board'), Map({
			x: 3,
			y: 3
		}))).toBe(0);
	});
});
