import { getPieceProperty } from '../utils';
import { Mode, Player, Piece } from '../typings';
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
				if (state.get('activePlayer') === Player.RED &&
					state.get('mode') === Mode.COMPUTER) {
					this.performComputerMove();
				}
			})
			.catch((error) => {
				// log initialization error
			});
	}

	handleSlotInteraction(slot: any) {
		const board = this.store.getState().game.get('board');
		const coord = slot.get('coord');
		if (getPieceProperty(board, coord, 'piece') !== Piece.EMPTY) {
			this.store.dispatch({
				type: SLOT_INTERACTION,
				payload: { slot }
			});
		}
	}

	performComputerMove() {
		const ai = new Ai(this.store);
		const move = ai.makeBlindMove();
		this.store.dispatch({
			type: PERFORM_MOVE,
			payload: {
				sourceSlot: move.getIn(['slot', 'source']),
				targetSlot: move.getIn(['slot', 'target'])
			}
		});
	}

	performPlayerMove(slots: any) {
		return new Promise((resolve, reject) => {
			try {
				const { sourceSlot, targetSlot } = slots;
				this.store.dispatch({
					type: PERFORM_MOVE,
					payload: { sourceSlot, targetSlot }
				});
				resolve();
			} catch (error) {
				reject(error);
			}
		});
	}

	_shouldPerformComputerMove() {
		const state = this.store.getState().game;
		return (
			!state.get('winner') &&
			!state.get('isChoosingMoveCard') &&
			state.get('mode') === Mode.COMPUTER
		);
	}

	handleCandidateSlotInteraction(slots: any) {
		this.performPlayerMove(slots).then(() => {
			this.handleMoveCardExchange();
			if (this._shouldPerformComputerMove()) {
				this.performComputerMove();
			}
		}).catch((error) => {
			return error;
		});

		this.store.dispatch({
			type: CHECK_FOR_WINNER
		});
	}

	/**
	 * Manages the exchange of move cards.
	 * rules: if a move card is provided to this function then the reducer
	 * will exchange the provided card with the swap card. If a move card is not provided
	 * the reducer will attempt an auto move card exchange. if the auto move card echange fails
	 * the user will be asked to explicitly choose a move card.
	 * @param {String} moveCard - a move card id
	 */
	handleMoveCardExchange(moveCard?: any) {
		const state = this.store.getState().game;
		const mode = state.get('mode');
		const activePlayer = state.get('activePlayer');
		if (moveCard) {
			this.store.dispatch({
				type: MOVE_CARD_EXCHANGE,
				payload: { moveCard }
			});

			// a computer move needs to be performed after the human player has
			// chosen a move card
			if (mode === Mode.COMPUTER && activePlayer === Player.BLUE) {
				this.performComputerMove();
			}
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