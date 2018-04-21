import { Map, fromJS } from 'immutable';

export const EMPTY: number = 0;
export const RED: number = 100;
export const BLUE: number = 200;
export const RED_MASTER: number = 150;
export const BLUE_MASTER: number = 250;
export const MOVE: number = 300;
export const START: number = 400;
export const CENTER: any = Map({
	x: 2,
	y: 2
});
export const EMPTY_COORD: any = Map({
	x: null,
	y: null
});
export const DEFAULT_CARD: any = fromJS({
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
});
export const BLUE_MOVE_CARD_1: string = 'blueMoveCard1';
export const BLUE_MOVE_CARD_2: string = 'blueMoveCard2';
export const RED_MOVE_CARD_1: string = 'redMoveCard1';
export const RED_MOVE_CARD_2: string = 'redMoveCard2';
export const SWAP_CARD: string = 'swapCard';
export const MODE_HUMAN: string = 'human';
export const MODE_COMPUTER: string = 'computer';
