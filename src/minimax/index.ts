import { Map, fromJS } from 'immutable';
import c from '../constants/game-constants';
import Actions from '../actions';
import {
	getCandidateCoords,
	getRandomInt,
	getRelativeCoord,
	getMoveCards,
	getRelativeCoordsByMoveCard,
	relativeCoordSearch
} from '../utils';

export default class Minimax {
	store: any;
	state: any;
	actions: any;

	constructor(store: any) {
		this.store = store;
		this.state = this.store.getState().game;
		this.actions = new Actions(this.store);
	}

	public makeBlindMove = () => {

		const srcCoord = Map({
			x: getRandomInt(0, 4),
			y: 0
		});

		const candidateCoords = getCandidateCoords(this.state, srcCoord);
		const targetCoord = candidateCoords[getRandomInt(0, candidateCoords.length)];

		return fromJS({
			moveCard: this.selectMoveCard(srcCoord, targetCoord),
			coords: {
				src: srcCoord,
				target: targetCoord
			}
		});
	}

	private selectMoveCard  = (srcCoord: any, targetCoord: any) => {
		const moveCards = getMoveCards(this.state);
		const relativeCoord = getRelativeCoord(targetCoord, srcCoord);
		const moveCard1RelativeCoords = getRelativeCoordsByMoveCard(moveCards.get(0));
		const moveCard2RelativeCoords = getRelativeCoordsByMoveCard(moveCards.get(1));

		const moveCard1SearchResults = relativeCoordSearch(relativeCoord, moveCard1RelativeCoords);
		const moveCard2SearchResults = relativeCoordSearch(relativeCoord, moveCard2RelativeCoords);

		if (moveCard1SearchResults && moveCard2SearchResults) {
			this.actions.gameActions.handleMoveCardExchange(c.RED_MOVE_CARD_1);
		} else if (moveCard1SearchResults) {
			this.actions.gameActions.handleMoveCardExchange(c.RED_MOVE_CARD_1);
		} else if (moveCard2SearchResults) {
			this.actions.gameActions.handleMoveCardExchange(c.RED_MOVE_CARD_2);
		} else {
			// throw new Error('noOP, both move card coords did not match last move coords');
		}
	}
}