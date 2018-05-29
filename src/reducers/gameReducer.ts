import { List, Map, fromJS } from 'immutable';
import { Coord, Mode, Piece, Player, MoveCards, Slot } from '../typings';
import cards from '../cards';
import * as c from '../constants/game-constants';

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
	getRelativeCoord,
	relativeCoordSearch,
	toggleActivePlayer,
	getMoveCards,
	getCandidateCoords,
	getRelativeCoordsByMoveCard,
	getPieceProperty
} from '../utils';

const getInitialGameState = (state: any, payload?: any) => {
	const shuffledCards = fromJS(shuffle(cards));
	const swapCardPiece =  shuffledCards.getIn([0, 'piece']);
	const nextState = Map({
		winner: false,
		board: c.DEFAULT_BOARD,
		capturedPieces: c.DEFAULT_CAPTURED_PIECES,
		swapCard: shuffledCards.get(0),
		blueMoveCard1: shuffledCards.get(1),
		blueMoveCard2: shuffledCards.get(2),
		redMoveCard1: shuffledCards.get(3),
		redMoveCard2: shuffledCards.get(4),
		activePlayer: swapCardPiece === Piece.RED_PAWN ? Player.RED : Player.BLUE,
		mode: (payload && payload.mode === Mode.HUMAN) ? Mode.HUMAN : Mode.COMPUTER
	});

	return state.merge(nextState);
};

const _isCandidateSlot = (slot: any, candidateCoords: any): boolean => {
	return fromJS(candidateCoords).contains(slot.get('coord'));
};

const _isActiveSlot = (slot: any, activeCoord: any): boolean => {
	return activeCoord.equals(slot.get('coord'));
};

/**
 * based on given inputs this function should apply the next board state to the board structure
 * @param {Map} state application state Map.
 * @param {Object} coord coordinate object from action payload.
 */
const _applyNextBoardState = (state: any, coord: any) => {
	const board = state.get('board');
	const candidateCoords = getCandidateCoords(state, coord);

	return board.map((col: any, x: number) => {
		return col.map((slot: any, y: number) => {
			switch (true) {
				case _isCandidateSlot(slot, candidateCoords) && _isActiveSlot(slot, coord):
					return slot.merge({
						isCandidate: true,
						isActive: true
					});
				case _isCandidateSlot(slot, candidateCoords):
					return slot.merge({
						isCandidate: true,
						isActive: false
					});
				case _isActiveSlot(slot, coord):
					return slot.merge({
						isCandidate: false,
						isActive: true
					});
				default:
					return slot;
			}
		});
	});
};

const handleSlotInteraction = (state: any, payload: any) => {
	const coord = payload.coord;
	return state.merge(Map ({
		board: _applyNextBoardState(state, coord),
		activeSlotCoord: Map(coord)
	}));
};

const _getNextCapturedPieces = (state: any, coord: Coord) => {
	let updated = false;
	const board = state.get('board');
	const activePlayer = state.get('activePlayer');
	const activePlayerKey = activePlayer === Player.BLUE ? 'blue' : 'red';

	if (isOpponentSlot(activePlayer, board, coord)) {
		const capturedPieces = state.getIn(['capturedPieces', activePlayerKey]);
		const nextCapturedPieces = capturedPieces.map((piece: any) => {
			if (piece === 0 && !updated) {
				updated = true;
				return getPieceProperty(board, coord, 'piece');
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


// update this based on the new slot shape
// remember you jsut added getSlotProperty and getPieceProperty
const _getNextBoard = (state: any, payload: any) => {
	const board = state.get('board');
	const srcCoord = payload.srcCoord;
	const targetCoord = payload.targetCoord;

	return board.update((slot: Slot) => {

	});
};

const _getNextMoveHistory = (state: any, payload: any) => {
	return state.get('moveHistory').update((list: any) => {
		return list.push(Map({
			srcCoord: Map({
				x: payload.srcCoord.get('x'),
				y: payload.srcCoord.get('y'),
			}),
			targetCoord: Map({
				x: payload.targetCoord.get('x'),
				y: payload.targetCoord.get('y')
			}),
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
	const redWinner = !_hasMaster(state.get('board'), Piece.BLUE_MASTER);
	const blueWinner = !_hasMaster(state.get('board'), Piece.RED_MASTER);
	if (blueWinner || redWinner) {
		return state.set('winner', blueWinner ? Player.BLUE : Player.RED);
	}

	return state.set('winner', null);
};

/**
 * should take a source and target coord pair and return the next game state
 * card exchange happens it's the other players trun.
 * @param {String} state application state Map.
 * @param {String} moveCard state property name of the move card to be exchanged.
 */
const performMove = (state: any, payload: any) => {
	const nextState = Map({
		board: _getNextBoard(state, payload),
		capturedPieces: _getNextCapturedPieces(state, payload.targetCoord),
		moveHistory: _getNextMoveHistory(state, payload),
		lastMoveRelativeCoords: getRelativeCoord(payload.targetCoord, payload.srcCoord),
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
const _swapMoveCard = (state: any, moveCard: number) => {
	return Map({
		[moveCard]: state.get('swapCard'),
		swapCard: state.get(moveCard),
		activePlayer: toggleActivePlayer(state.get('activePlayer'))
	});
};

const _swapMoveCard1 = (state: any) => {
	if (state.get('activePlayer') === Player.BLUE) {
		return _swapMoveCard(state, MoveCards.BLUE_MOVE_CARD_1);
	} else {
		return _swapMoveCard(state, MoveCards.RED_MOVE_CARD_1);
	}
};

const _swapMoveCard2 = (state: any) => {
	if (state.get('activePlayer') === Player.BLUE) {
		return _swapMoveCard(state, MoveCards.BLUE_MOVE_CARD_2);
	} else {
		return _swapMoveCard(state, MoveCards.RED_MOVE_CARD_2);
	}
};

const autoMoveCardExchange = (state: any) => {
	let nextState;
	const moveCards = getMoveCards(state);
	const lastMoveCoords = state.get('lastMoveRelativeCoords');

	const moveCard1RelativeCoords = getRelativeCoordsByMoveCard(moveCards.get(0));
	const moveCard2RelativeCoords = getRelativeCoordsByMoveCard(moveCards.get(1));

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

const moveCardExchange = (state: any, payload: any) => {
	return state.merge(_swapMoveCard(state, payload.moveCard));
};

const resetGame = (state: any) => {
	return state.merge(getInitialGameState(state));
};

export const DEFAULT_STATE = Map({
	board: c.DEFAULT_BOARD,
	capturedPieces: c.DEFAULT_CAPTURED_PIECES,
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

const gameReducer = (state = DEFAULT_STATE, action: any) => {
	switch (action.type) {
		case INITIAL_GAME_STATE:
			return getInitialGameState(state, action.payload);
		case SLOT_INTERACTION:
			return handleSlotInteraction(state, action.payload);
		case PERFORM_MOVE:
			return performMove(state, action.payload);
		case AUTO_MOVE_CARD_EXCHANGE:
			return autoMoveCardExchange(state);
		case MOVE_CARD_EXCHANGE:
			return moveCardExchange(state, action.payload);
		case CHECK_FOR_WINNER:
			return checkForWinner(state);
		case RESET_GAME:
			return resetGame(state);
		default:
			return state;
	}
};

export default gameReducer;