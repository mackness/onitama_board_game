import gameReducer from '../gameReducer';
import { Map, fromJS, List } from 'immutable';
import c from '../../constants/game-constants';
import { MOVE_CARD_EXCHANGE } from '../../constants/action-constants';

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
	blueMoveCard1: fromJS([
		[0, 0, 0, 0, 0],
		[0, 0, c.MOVE, 0, 0],
		[0, c.MOVE, c.START, c.MOVE, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0]
	]),
	blueMoveCard2: fromJS([
		[0, 0, 0, 0, 0],
		[0, c.MOVE, 0, c.MOVE, 0],
		[0, 0, c.START, 0, 0],
		[0, 0, c.MOVE, 0, 0],
		[0, 0, 0, 0, 0]
	]),
	activeSlotCoord: c.DEFAULT_CARD,
	candidateCoords: List(),
	activePlayer: c.BLUE,
	moveHistory: List(),
	isChoosingMoveCard: false
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
		expect(nextState.get('activePlayer')).toBe(c.RED);
	});
});
