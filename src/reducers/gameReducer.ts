import { List, Map, fromJS } from 'immutable';
import { Coord } from '../typings';
import cards from '../cards';

import c from '../constants/game-constants';
import {
	INITIAL_GAME_STATE,
	SLOT_INTERACTION,
	PERFORM_MOVE,
	MOVE_CARD_EXCHANGE,
	AUTO_MOVE_CARD_EXCHANGE
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
	isChoosingMoveCard: false
});

const _getMoveCards = (state: any) => {
	let isBlueActive = state.get('activePlayer') === c.BLUE;
	return List([
		state.get(isBlueActive ? 'blueMoveCard1' : 'redMoveCard1'),
		state.get(isBlueActive ? 'blueMoveCard2' : 'redMoveCard2')
	]);
};

const getInitialGameState = (state: any) => {
	const shuffledCards = fromJS(shuffle(cards));
	const nextState = Map({
		swapCard: shuffledCards.getIn([0, 'card']),
		blueMoveCard1: shuffledCards.getIn([1, 'card']),
		blueMoveCard2: shuffledCards.getIn([2, 'card']),
		redMoveCard1: shuffledCards.getIn([3, 'card']),
		redMoveCard2: shuffledCards.getIn([4, 'card']),
		activePlayer: shuffledCards.getIn([0, 'color'])
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

const _checkForWinner = (state: any) => {
	return false;
};

const performMove = (state: any, payload: any) => {
	const nextState = Map({
		board: _getNextBoard(state, payload.coord),
		capturedPieces: _getNextCapturedPieces(state, payload.coord),
		moveHistory: _getNextMoveHistory(state, payload.coord),
		lastMoveRelativeCoords: getRelativeCoord(payload.coord, state.get('activeSlotCoord')),
		isWinner: _checkForWinner(state),
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
		default:
			return state;
	}
};

export default gameReducer;