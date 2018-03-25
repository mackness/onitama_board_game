import { Map, fromJS } from 'immutable';
export default {
	EMPTY: 0,
	RED: 100,
	BLUE: 200,
	RED_MASTER: 150,
	BLUE_MASTER: 250,
	MOVE: 300,
	START: 400,
	CENTER: Map({
		x: 2,
		y: 2
	}),
	EMPTY_COORD: Map({
		x: null,
		y: null
	}),
	DEFAULT_CARD: fromJS({
		school: '',
		cardColor: '',
		player: '',
		card: [
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0]
		]
	}),
	BLUE_MOVE_CARD_1: 'blueMoveCard1',
	BLUE_MOVE_CARD_2: 'blueMoveCard2',
	RED_MOVE_CARD_1: 'redMoveCard1',
	RED_MOVE_CARD_2: 'redMoveCard2',
	SWAP_CARD: 'swapCard',
	MODE: {
		COMPUTER: 'computer',
		HUMAN: 'human'
	}
};
