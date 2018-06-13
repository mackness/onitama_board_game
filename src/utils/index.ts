import { Map, List } from 'immutable';
import * as c from '../constants/game-constants';
import { MoveCard } from '../typings';
import { Board, Coord, Player } from '../typings';

/**
 * Gets the value of a given slot properties.
 * @param {Board} board - a 2d matrix of Immutable Lists.
 * @param {Map} coords - a Map of x y coordinates.
 */
export function getSlotProperty(board: Board, coord: Coord, property: string): any  {
	const slot = board.getIn([coord.get('x'), coord.get('y')]);
	return slot.get(property);
}

/**
 * Gets the value of a given slot properties.
 * @param {Board} board - a 2d matrix of Immutable Lists.
 * @param {Map} coords - a Map of x y coordinates.
 */
export function getPieceProperty(board: Board, coord: Coord, property: string): any  {
	const slot = board.getIn([coord.get('x'), coord.get('y')]);
	return slot.getIn(['piece', property]);
}

/**
 * Get the absolute coords for all possible moves on a move card.
 * @param {List} card - a 5x5 matrix representing a move card.
 */
export function getAbsoluteCoords(card: any) {
	let absCoords: any[] = [];
	card.forEach((row: any, x: number) => {
		row.forEach((slot: any, y: number) => {
			if (slot !== MoveCard.EMPTY && slot !== MoveCard.START) {
				absCoords.push(Map({x, y}));
			}
		});
	});
	return absCoords;
}

/**
 * Get the coords of active board pieces for a given player in order to make a move.
 * @return {List} a list of coordinates of all active board pieces.
 */
export function getSourceCoords(board: any, player: any) {
	let sourceCoords: any[] = [];
	board.forEach((row: any, x: number) => {
		row.forEach((slot: any, y: number) => {
			if (slot.getIn(['piece', 'player']) === player) {
				sourceCoords.push(Map({x, y}));
			}
		});
	});
	return sourceCoords;
}

/**
 * Get the distance from point a to point b as an x, y coordinate pair.
 * @param {Map} a - the start coordinate.
 * @param {Map} b - the end coordinate.
 */
export function getRelativeCoord(a: Coord, b: Coord) {
	return Map({
		x: b.get('x') - a.get('x'),
		y: b.get('y') - a.get('y')
	});
}

/**
 * Get the distances from point a to all provided points as a list of x, y coordinate pairs.
 * @param {Map} a - the starting coordinate.
 * @param {List} author - a list of end coordinates.
 */
export function getRelativeCoords(a: Coord, coords: any) {
	return coords.map((coord: Coord) => {
		return Map({
			x: coord.get('x') - a.get('x'),
			y: coord.get('y') - a.get('y')
		});
	});
}

/**
 * Fisher-Yates in place shuffle.
 * @param {Array} a array of items to be shuffled.
 */
export function shuffle(a: Array<object>) {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[a[i], a[j]] = [a[j], a[i]];
	}
	return a;
}

/**
 * Toggles currently active player.
 * @param {Number} activePlayer number that represents currently active player.
 */
export function toggleActivePlayer(activePlayer: number) {
	return activePlayer === Player.BLUE ? Player.RED : Player.BLUE;
}

/**
 * Gets the move cards for the currently active player.
 * @param {Number} state application state.
 * @return {List} list of move cards.
 */
export function getMoveCards(state: any) {
	let isBlueActive = state.get('activePlayer') === Player.BLUE;
	return List([
		state.getIn([isBlueActive ? 'blueMoveCard1' : 'redMoveCard1', 'card']),
		state.getIn([isBlueActive ? 'blueMoveCard2' : 'redMoveCard2', 'card'])
	]);
}

/**
 * Gets the relative coords of a given move card.
 * @param {Number} state application state.
 * @return {Array} array of possible moves
 */
export function getRelativeCoordsByMoveCard(moveCard: any) {
	return getRelativeCoords(c.CENTER, getAbsoluteCoords(moveCard));
}

/**
 * Gets the possible moves for a given slot.
 * @param {Number} state application state.
 * @param {Map} acoord coordinate map for a slot.
 * @return {Array} array of possible moves
 */
export function getCandidateCoords(state: any, acoord: any) {
	const board = state.get('board');
	const activePlayer = state.get('activePlayer');
	const moveCards = getMoveCards(state);
	const moveCard1RelativeCoords = getRelativeCoordsByMoveCard(moveCards.get(0));
	const moveCard2RelativeCoords = getRelativeCoordsByMoveCard(moveCards.get(1));
	const moveCardCoords = moveCard1RelativeCoords.concat(moveCard2RelativeCoords);

	// generate a list of possible moves - exclude moves that target active player's slots
	// and out of bounds moves
	return moveCardCoords.map((coord: any) => {
		return Map({
			x: acoord.get('x') + coord.get('x'),
			y: acoord.get('y') + coord.get('y')
		});
	}).filter((coord: any) => {
		return (
			(coord.get('x') >= 0 && coord.get('x') <= board.size - 1) &&
			(coord.get('y') >= 0 && coord.get('y') <= board.size - 1) &&
			(isOpponentSlot(activePlayer, board, coord) ||
			getPieceProperty(board, coord, 'player') !== activePlayer)
		);
	});
}

/**
 * searches a card for relative coords.
 * note: this function is used to determine if the relative coordiates of the last move match
 * the relative coords of one of the move cards. It is used to attempt and auto move card exchange.
 * @param {Map} moveCoords a relative coord pair for a move
 * @param {List} cardCoords the relative move coords for a given move card
 * @return {Map} relative coord
 */
export function relativeCoordSearch(moveCoords: Coord, cardCoords: any) {
	return cardCoords.find((coord: any) => {
		if (moveCoords.get('x') === coord.get('x') &&
			moveCoords.get('y') === coord.get('y')) {
			return coord;
		} else {
			return null;
		}
	});
}

/**
 * Determine if a slot belongs to the opponent.
 * @param {number} activePlayer the currently active player
 * @param {Map} board an x, y coordiate pair
 * @param {Map} candidateCoord an x, y coordiate pair
 * @return {boolean} is opponent slot
 */
export function isOpponentSlot(activePlayer: number, board: any, coord: any): boolean {
	const piece = getPieceProperty(board, coord, 'player');
	const opponent = activePlayer === Player.BLUE ? Player.RED : Player.BLUE;
	return piece === opponent;
}

/**
 * generates a random int in a range.
 * note: min inclusive max exclusive
 * @param {number} min min value in range
 * @param {number} max max value in range
 * @return {number} random int
 */
export function getRandomInt(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min) + min);
}

/**
 * applies x and y coordiates to board slots when game is initialized
 * @param {Board} board data structure
 * @return {Board} the game board
 */
export function sequenceBoard(board: any): Board {
	return board.map((col: any, x: any) => {
		return col.map((slot: any, y: any) => {
			return slot.merge({coord: Map({x, y})});
		});
	});
}
