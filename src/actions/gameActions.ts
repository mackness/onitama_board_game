import { getSlotValue } from '../utils';

import c from '../constants/game-constants';
import {
	INITIAL_GAME_STATE,
	SLOT_INTERACTION,
	PERFORM_MOVE,
	MOVE_CARD_EXCHANGE,
	AUTO_MOVE_CARD_EXCHANGE
} from '../constants/action-constants';

export default class GameActions {
	store: any;
	constructor(store: any) {
		this.store = store;
	}

	setupInitialGameState() {
		this.store.dispatch({type: INITIAL_GAME_STATE});
	}

	handleSlotInteraction(coord: any) {
		const board = this.store.getState().game.get('board');
		if (getSlotValue(board, coord) !== c.EMPTY) {
			this.store.dispatch({
				type: SLOT_INTERACTION,
				payload: { coord }
			});
		}
	}

	handleCandidateSlotInteraction(coord: any) {
		this.store.dispatch({
			type: PERFORM_MOVE,
			payload: { coord }
		});
	}

	handleMoveCardExchange(moveCard: any) {
		if (moveCard) {
			this.store.dispatch({
				type: MOVE_CARD_EXCHANGE,
				payload: {moveCard}
			});
		} else {
			this.store.dispatch({
				type: AUTO_MOVE_CARD_EXCHANGE
			});
		}
	}
}