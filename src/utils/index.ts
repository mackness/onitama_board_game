import { Map } from 'immutable';
import c from '../constants/game-constants';
import { Board, Card, Coord } from '../typings';

/**
 * Gets the value of a given slot.
 * @param {List} board - a 2d matrix of Immutable Lists.
 * @param {Map} coords - a Map of x y coordinates.
 */
export function getSlotValue(board: Board, coords: any)  {
	return board.getIn([coords.get('x'), coords.get('y')]);
}

/**
 * Get the absolute coords for all possible moves on a move card.
 * @param {List} card - a 5x5 matrix representing a move card.
 */
export function getAbsoluteCoords(card: Card) {
	let absCoords = [];
	for (var x = 0; x < card.size; x++) {
		for (var y = 0; y < card.get(x).size; y++) {
			if (card.getIn([x, y]) !== c.EMPTY && card.getIn([x, y]) !== c.START) {
				absCoords.push(Map({x, y}));
			}
		}
	}
	return absCoords;
}

/**
 * Get the distance from point a to point b as an x, y coordinate pair.
 * @param {Map} a - the start coordinate.
 * @param {Map} b - the end coordinate.
 */
export function getRelativeCoord(a: Coord, b: Coord) {
	return Map({
		x: a.get('x') - b.get('x'),
		y: a.get('y') - b.get('y')
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
	return activePlayer === c.BLUE ? c.RED : c.BLUE;
}

/**
 * searches a card for relative coords.
 * note: this function is used to determine if the coordiates of the last move match
 * the relative coords of one of the move cards.
 * @param {Map} a coord pair
 * @param {List} card
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
