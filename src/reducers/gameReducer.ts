import { List, Map, fromJS } from 'immutable';
import { Coord } from '../typings';
import cards from '../cards';

import c from '../constants/game-constants';
import {
	INITIAL_GAME_STATE,
	SLOT_INTERACTION,
	PERFORM_MOVE,
	MOVE_CARD_EXCHANGE,
	AUTO_MOVE_CARD_EXCHANGE,
	CHECK_FOR_WINNER,
	RESET_GAME
} from '../constants/action-constants';

import {
	shuffle,
	isOpponentSlot,
	getAbsoluteCoords,
	getRelativeCoords,
	getRelativeCoord,
	getSlotValue,
	relativeCoordSearch,
	toggleActivePlayer
} from '../utils';

export const DEFAULT_STATE = Map({
	board: fromJS([
		[c.RED, 0, 0, 0, c.BLUE],
		[c.RED, 0, 0, 0, c.BLUE],
		[c.RED_MASTER, 0, 0, 0, c.BLUE_MASTER],
		[c.RED, 0, 0, 0, c.BLUE],
		[c.RED, 0, 0, 0, c.BLUE]
	]),
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
	winner: null,
	isChoosingMoveCard: false
});

const _getMoveCards = (state: any) => {
	let isBlueActive = state.get('activePlayer') === c.BLUE;
	return List([
		state.getIn([isBlueActive ? 'blueMoveCard1' : 'redMoveCard1', 'card']),
		state.getIn([isBlueActive ? 'blueMoveCard2' : 'redMoveCard2', 'card'])
	]);
};

const getInitialGameState = (state: any) => {
	const shuffledCards = fromJS(shuffle(cards));
	const nextState = Map({
		winner: null,
		board: fromJS([
			[c.RED, 0, 0, 0, c.BLUE],
			[c.RED, 0, 0, 0, c.BLUE],
			[c.RED_MASTER, 0, 0, 0, c.BLUE_MASTER],
			[c.RED, 0, 0, 0, c.BLUE],
			[c.RED, 0, 0, 0, c.BLUE]
		]),
		capturedPieces: Map({
			red: List([0, 0, 0, 0, 0]),
			blue: List([0, 0, 0, 0, 0])
		}),
		swapCard: shuffledCards.get(0),
		blueMoveCard1: shuffledCards.get(1),
		blueMoveCard2: shuffledCards.get(2),
		redMoveCard1: shuffledCards.get(3),
		redMoveCard2: shuffledCards.get(4),
		activePlayer: shuffledCards.getIn([0, 'player'])
	});

	return state.merge(nextState);
};

const _getCandidateCoords = (state: any, acoord: any) => {
	const moveCards = _getMoveCards(state);
	const moveCard1AbsoluteCoords = getAbsoluteCoords(moveCards.get(0));
	const moveCard2AbsoluteCoords = getAbsoluteCoords(moveCards.get(1));
	const moveCard1RelativeCoords = getRelativeCoords(c.CENTER, moveCard1AbsoluteCoords);
	const moveCard2RelativeCoords = getRelativeCoords(c.CENTER, moveCard2AbsoluteCoords);
	const moveCardCoords = moveCard1RelativeCoords.concat(moveCard2RelativeCoords);

	return moveCardCoords.map((coord: any) => {
		return Map({
			x: acoord.get('x') + coord.get('x'),
			y: acoord.get('y') + coord.get('y')
		});
	});
};

const handleSlotInteraction = (state: any, payload: any) => {
	const nextState = Map({
		candidateCoords: _getCandidateCoords(state, payload.coord),
		activeSlotCoord: Map(payload.coord)
	});

	return state.merge(nextState);
};

const _getNextCapturedPieces = (state: any, coord: Coord) => {
	let updated = false;
	const board = state.get('board');
	const activePlayer = state.get('activePlayer');
	const activePlayerKey = activePlayer === c.BLUE ? 'blue' : 'red';

	if (isOpponentSlot(activePlayer, board, coord)) {
		const capturedPieces = state.getIn(['capturedPieces', activePlayerKey]);
		const nextCapturedPieces = capturedPieces.map((piece: any) => {
			if (piece === 0 && !updated) {
				updated = true;
				return getSlotValue(board, coord);
			} else {
				return piece;
			}
		});

		const nextState = state.setIn(['capturedPieces', activePlayerKey], nextCapturedPieces);
		return nextState.get('capturedPieces');
	} else {
		return state.get('capturedPieces');
	}
};

const _getNextBoard = (state: any, coord: Coord) => {
	const board = state.get('board');
	const activeCoord = state.get('activeSlotCoord');

	return board.updateIn([coord.get('x'), coord.get('y')], () => getSlotValue(board, activeCoord))
				.updateIn([activeCoord.get('x'), activeCoord.get('y')], () => c.EMPTY);

};

const _getNextMoveHistory = (state: any, coord: Coord) => {
	return state.get('moveHistory').update((list: any) => {
		return list.push(Map({
			x: coord.get('x'),
			y: coord.get('y'),
			player: state.get('activePlayer')
		}));
	});
};

const _hasMaster = (board: any, piece: any) => {
	let hasMaster = false;

	for (var x = 0; x < board.size; x++) {
		for (var y = 0; y < board.size; y++) {
			if (board.getIn([x, y]) === piece) {
				hasMaster = true;
			}
		}
	}

	return hasMaster;
};

const checkForWinner = (state: any) => {
	const redWinner = !_hasMaster(state.get('board'), c.BLUE_MASTER);
	const blueWinner = !_hasMaster(state.get('board'), c.RED_MASTER);
	if (blueWinner || redWinner) {
		return state.set('winner', blueWinner ? c.BLUE : c.RED);
	}

	return state.set('winner', null);
};

const performMove = (state: any, payload: any) => {
	const nextState = Map({
		board: _getNextBoard(state, payload.coord),
		capturedPieces: _getNextCapturedPieces(state, payload.coord),
		moveHistory: _getNextMoveHistory(state, payload.coord),
		lastMoveRelativeCoords: getRelativeCoord(payload.coord, state.get('activeSlotCoord')),
		activeSlotCoord: c.EMPTY_COORD,
		candidateCoords: List()
	});

	return state.merge(nextState);
};

/**
 * this function handles exchanging a move card with a swap card.
 * note: toggling the active player here makes sense becuase anytime a
 * card exchange happens it's the other players trun.
 * @param {String} state application state Map.
 * @param {String} moveCard state property name of the move card to be exchanged.
 */
const _swapMoveCard = (state: any, moveCard: string) => {
	return Map({
		[moveCard]: state.get('swapCard'),
		swapCard: state.get(moveCard),
		activePlayer: toggleActivePlayer(state.get('activePlayer'))
	});
};

const _swapMoveCard1 = (state: any) => {
	if (state.get('activePlayer') === c.BLUE) {
		return _swapMoveCard(state, c.BLUE_MOVE_CARD_1);
	} else {
		return _swapMoveCard(state, c.RED_MOVE_CARD_1);
	}
};

const _swapMoveCard2 = (state: any) => {
	if (state.get('activePlayer') === c.BLUE) {
		return _swapMoveCard(state, c.BLUE_MOVE_CARD_2);
	} else {
		return _swapMoveCard(state, c.RED_MOVE_CARD_2);
	}
};

const autoMoveCardExchange = (state: any) => {
	let nextState;
	const moveCards = _getMoveCards(state);
	const lastMoveCoords = state.get('lastMoveRelativeCoords');

	const moveCard1AbsoluteCoords = getAbsoluteCoords(moveCards.get(0));
	const moveCard2AbsoluteCoords = getAbsoluteCoords(moveCards.get(1));
	const moveCard1RelativeCoords = getRelativeCoords(c.CENTER, moveCard1AbsoluteCoords);
	const moveCard2RelativeCoords = getRelativeCoords(c.CENTER, moveCard2AbsoluteCoords);

	const card1SearchResults = relativeCoordSearch(lastMoveCoords, moveCard1RelativeCoords);
	const card2SearchResults = relativeCoordSearch(lastMoveCoords, moveCard2RelativeCoords);

	if (card1SearchResults && card2SearchResults) {
		return state.set('isChoosingMoveCard', true);
	} else if (card1SearchResults) {
		nextState = _swapMoveCard1(state);
	} else if (card2SearchResults) {
		nextState = _swapMoveCard2(state);
	} else {
		throw new Error('noOP, both move card coords did not match last move coords');
	}

	return state.merge(nextState);
};

const moveCardExchange = (state: any, moveCard: string) => {
	return state.merge(_swapMoveCard(state, moveCard));
};

const resetGame = (state: any) => {
	return state.merge(getInitialGameState(state));
};

const gameReducer = (state = DEFAULT_STATE, action: any) => {
	switch (action.type) {
		case INITIAL_GAME_STATE:
			return getInitialGameState(state);
		case SLOT_INTERACTION:
			return handleSlotInteraction(state, action.payload);
		case PERFORM_MOVE:
			return performMove(state, action.payload);
		case AUTO_MOVE_CARD_EXCHANGE:
			return autoMoveCardExchange(state);
		case MOVE_CARD_EXCHANGE:
			return moveCardExchange(state, action.payload.moveCard);
		case CHECK_FOR_WINNER:
			return checkForWinner(state);
		case RESET_GAME:
			return resetGame(state);
		default:
			return state;
	}
};

export default gameReducer;