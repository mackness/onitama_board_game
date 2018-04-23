import { Map, fromJS } from 'immutable';

// player values
export const EMPTY: number = 0;
export const RED: number = 100;
export const BLUE: number = 200;
export const RED_MASTER_VALUE: number = 150;
export const BLUE_MASTER_VALUE: number = 250;

// board pieces
export const BLUE_PAWN: any = Map({
	isCandidate: false,
	isActive: false,
	isMaster: false,
	value: BLUE
});
export const BLUE_MASTER: any = Map({
	isCandidate: false,
	isActive: false,
	isMaster: false,
	value: BLUE_MASTER_VALUE
});
export const RED_PAWN: any = Map({
	isCandidate: false,
	isActive: false,
	isMaster: false,
	value: RED
});
export const RED_MASTER: any = Map({
	isCandidate: false,
	isActive: false,
	isMaster: false,
	value: RED_MASTER_VALUE
});
export const EMPTY_COORD: any = Map({
	x: null,
	y: null
});
export const EMPTY_SLOT: any = Map({
	value: 0
});
export const DEFAULT_BOARD: any = fromJS([
	[RED_PAWN, EMPTY_SLOT, EMPTY_SLOT, EMPTY_SLOT, BLUE_PAWN],
	[RED_PAWN, EMPTY_SLOT, EMPTY_SLOT, EMPTY_SLOT, BLUE_PAWN],
	[RED_MASTER, EMPTY_SLOT, EMPTY_SLOT, EMPTY_SLOT, BLUE_MASTER],
	[RED_PAWN, EMPTY_SLOT, EMPTY_SLOT, EMPTY_SLOT, BLUE_PAWN],
	[RED_PAWN, EMPTY_SLOT, EMPTY_SLOT, EMPTY_SLOT, BLUE_PAWN]
]);

// move cards
export const MOVE: number = 300;
export const START: number = 400;
export const CENTER: any = Map({
	x: 2,
	y: 2
});
export const BLUE_MOVE_CARD_1: string = 'blueMoveCard1';
export const BLUE_MOVE_CARD_2: string = 'blueMoveCard2';
export const RED_MOVE_CARD_1: string = 'redMoveCard1';
export const RED_MOVE_CARD_2: string = 'redMoveCard2';
export const SWAP_CARD: string = 'swapCard';
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

// modes
export const MODE_HUMAN: string = 'human';
export const MODE_COMPUTER: string = 'computer';
