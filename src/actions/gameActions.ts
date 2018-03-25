import { getSlotValue } from '../utils';

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
import Minimax from '../minimax';

export default class GameActions {
	store: any;
	constructor(store: any) {
		this.store = store;
	}

	setupInitialGameState() {
		this.store.dispatch({type: INITIAL_GAME_STATE});

		if (this.store.getState().game.get('activePlayer') === c.RED &&
			this.store.getState().game.get('mode') === c.MODE.COMPUTER) {
			const minimax = new Minimax(this.store);
			const move = minimax.makeBlindMove();
			this.store.dispatch({
				type: PERFORM_MOVE,
				payload: {
					srcCoord: move.getIn(['coords', 'src']),
					targetCoord: move.getIn(['coords', 'target'])
				}
			});
		}
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

	performComputerMove() {
		const minimax = new Minimax(this.store);
		const move = minimax.makeBlindMove();
		this.store.dispatch({
			type: PERFORM_MOVE,
			payload: {
				srcCoord: move.getIn(['coords', 'src']),
				targetCoord: move.getIn(['coords', 'target'])
			}
		});
	}

	handleCandidateSlotInteraction(coords: any) {

		this.store.dispatch({
			type: PERFORM_MOVE,
			payload: {
				srcCoord: coords.srcCoord,
				targetCoord: coords.targetCoord
			}
		});

		this.store.dispatch({
			type: CHECK_FOR_WINNER
		});
	}

	handleMoveCardExchange(moveCard: any) {
		if (moveCard) {
			this.store.dispatch({
				type: MOVE_CARD_EXCHANGE,
				payload: { moveCard }
			});
		} else {
			this.store.dispatch({
				type: AUTO_MOVE_CARD_EXCHANGE
			});
		}
	}

	resetGame() {
		this.store.dispatch({type: RESET_GAME});
	}
}