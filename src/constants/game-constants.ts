import { Map, fromJS } from 'immutable';
import { Piece, Player } from '../typings';
import { sequenceBoard } from '../utils';

// board slots
export const BLUE_PAWN: any = fromJS({
	isCandidate: false,
	isActive: false,
	piece: {
		player: Player.BLUE,
		piece: Piece.BLUE_PAWN
	}
});

export const BLUE_MASTER: any = fromJS({
	isCandidate: false,
	isActive: false,
	piece: {
		player: Player.BLUE,
		piece: Piece.BLUE_MASTER
	}
});

export const RED_PAWN: any = fromJS({
	isCandidate: false,
	isActive: false,
	piece: {
		player: Player.RED,
		piece: Piece.RED_PAWN
	}
});

export const RED_MASTER: any = fromJS({
	isCandidate: false,
	isActive: false,
	piece: Map({
		player: Player.RED,
		piece: Piece.RED_MASTER
	})
});

export const EMPTY_COORD: any = Map({
	x: null,
	y: null
});

export const EMPTY_SLOT: any = fromJS({
	isCandidate: false,
	isActive: false,
	piece: {
		player: undefined,
		piece: undefined
	}
});

export const DEFAULT_BOARD: any = sequenceBoard(fromJS([
	[RED_PAWN, EMPTY_SLOT, EMPTY_SLOT, EMPTY_SLOT, BLUE_PAWN],
	[RED_PAWN, EMPTY_SLOT, EMPTY_SLOT, EMPTY_SLOT, BLUE_PAWN],
	[RED_MASTER, EMPTY_SLOT, EMPTY_SLOT, EMPTY_SLOT, BLUE_MASTER],
	[RED_PAWN, EMPTY_SLOT, EMPTY_SLOT, EMPTY_SLOT, BLUE_PAWN],
	[RED_PAWN, EMPTY_SLOT, EMPTY_SLOT, EMPTY_SLOT, BLUE_PAWN]
]));

export const DEFAULT_CAPTURED_PIECES: any = fromJS({
	red: [EMPTY_SLOT, EMPTY_SLOT, EMPTY_SLOT, EMPTY_SLOT, EMPTY_SLOT],
	blue: [EMPTY_SLOT, EMPTY_SLOT, EMPTY_SLOT, EMPTY_SLOT, EMPTY_SLOT],
});

// move cards
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
	color: '',
	player: '',
	card: [
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0]
	]
});
