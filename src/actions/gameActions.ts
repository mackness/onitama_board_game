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
import Ai from '../ai';

export default class GameActions {
	store: any;
	ai: any;

	constructor(store: any) {
		this.store = store;
	}

	initGame(mode: string) {
		return new Promise((resolve, reject) => {
			try {
				this.store.dispatch({
					type: INITIAL_GAME_STATE,
					payload: { mode }
				});
				resolve(this.store.getState().game);
			} catch (error) {
				reject(error);
			}
		});
	}

	setupInitialGameState(mode: string) {
		this.initGame(mode)
			.then((state: any) => {
				if (state.get('activePlayer') === c.RED &&
					state.get('mode') === c.MODE_COMPUTER) {
					this.performComputerMove();
				}
			})
			.catch((error) => {
				// log initialization error
			});
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
		const ai = new Ai(this.store);
		const move = ai.makeBlindMove();
		this.store.dispatch({
			type: PERFORM_MOVE,
			payload: {
				srcCoord: move.getIn(['coords', 'src']),
				targetCoord: move.getIn(['coords', 'target'])
			}
		});
	}

	performPlayerMove(coords: any) {
		return new Promise((resolve, reject) => {
			this.store.dispatch({
				type: PERFORM_MOVE,
				payload: {
					srcCoord: coords.srcCoord,
					targetCoord: coords.targetCoord
				}
			});
			resolve();
		});
	}

	handleCandidateSlotInteraction(coords: any) {
		const state = this.store.getState().game;

		this.performPlayerMove(coords).then(() => {
			if (!state.get('winner') &&
				state.get('mode') === c.MODE_COMPUTER) {
				this.performComputerMove();
			}
		});

		this.handleMoveCardExchange();

		this.store.dispatch({
			type: CHECK_FOR_WINNER
		});
	}

	handleMoveCardExchange(moveCard?: any) {
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