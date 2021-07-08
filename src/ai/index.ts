import { fromJS } from 'immutable';
import * as c from '../constants/game-constants';
import Actions from '../actions';
import {
	getCandidateCoords,
	getRandomInt,
	getRelativeCoord,
	getMoveCards,
	getRelativeCoordsByMoveCard,
	relativeCoordSearch,
	getSourceCoords
} from '../utils';

export default class Ai {
	store: any;
	state: any;
	actions: any;

	constructor(store: any) {
		this.store = store;
		this.state = this.store.getState().game;
		this.actions = new Actions(this.store);
	}

	/**
	 * This method constructs a move by randomly selecting source and target move slots.
	 * @return {Map} a map of all the data necessary to make a move.
	 */
	public makeBlindMove = () => {
		const board = this.state.get('board');
		const player = this.state.get('activePlayer');

		// get source coord
		const srcCoords = getSourceCoords(board, player);
		const srcCoord = srcCoords[getRandomInt(0, srcCoords.length)];

		// get target coord
		const candidateCoords = getCandidateCoords(this.state, srcCoord);
		const targetCoord = candidateCoords[getRandomInt(0, candidateCoords.length)];

		return fromJS({
			moveCard: this.selectMoveCard(srcCoord, targetCoord),
			slots: {
				source: board.getIn([srcCoord.get('x'), srcCoord.get('y')]),
				target: board.getIn([targetCoord.get('x'), targetCoord.get('y')])
			}
		});
	}

	private selectMoveCard  = (srcCoord: any, targetCoord: any) => {
		const moveCards = getMoveCards(this.state);
		const relativeCoord = getRelativeCoord(targetCoord, srcCoord);
		const moveCard1RelativeCoords = getRelativeCoordsByMoveCard(moveCards.get(0));
		const moveCard2RelativeCoords = getRelativeCoordsByMoveCard(moveCards.get(1));

		const card1Results = relativeCoordSearch(relativeCoord, moveCard1RelativeCoords);
		const card2Results = relativeCoordSearch(relativeCoord, moveCard2RelativeCoords);

		if (card1Results && card2Results) {
			this.actions.gameActions.handleMoveCardExchange(c.RED_MOVE_CARD_1);
		} else if (card1Results) {
			this.actions.gameActions.handleMoveCardExchange(c.RED_MOVE_CARD_1);
		} else if (card2Results) {
			this.actions.gameActions.handleMoveCardExchange(c.RED_MOVE_CARD_2);
		} else {
			throw new Error('noOP, both move card coords did not match last move coords');
		}
	}
}