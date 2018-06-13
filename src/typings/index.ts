import { List } from 'immutable';
import { ImmutableMap } from './ImmutableMap';

export enum Piece {
	EMPTY,
	BLUE_PAWN,
	BLUE_MASTER,
	RED_PAWN,
	RED_MASTER
}

export enum Player {
	BLUE,
	RED
}

export enum Mode {
	COMPUTER,
	HUMAN
}

export enum MoveCards {
	SWAP_CARD = 'swapCard',
	BLUE_MOVE_CARD_1 = 'blueMoveCard1',
	BLUE_MOVE_CARD_2 = 'blueMoveCard2',
	RED_MOVE_CARD_1 = 'redMoveCard1',
	RED_MOVE_CARD_2 = 'redMoveCard2'
}

export enum MoveCard {
	EMPTY,
	START,
	MOVE
}

export declare type Board = List<List<number>>;
export declare type SwapCard = List<List<number>>;

export declare type Coord = ImmutableMap<{
	x: number;
	y: number;
}>;

export declare type Slot = ImmutableMap<{
	isActive: number;
	isCandidate: number;
	piece: Piece;
}>;

export interface Card {
	school: string;
	schoolColor: number;
	card: Board;
}

// declare type ApplicationState = ImmutableMap<{
// 	board?: Board;
// 	swapCard?: Card;
// 	redMoveCard1?: Card;
// 	redMoveCard2?: Card;
// 	blueMoveCard1?: Card;
// 	blueMoveCard2?: Card;
// 	activeSlotCoord?: Coord;
// 	candidateCoords?: Coord;
// 	activePlayer?: number;
// 	moveHistory?: List<ImmutableMap<string|number>>;
// 	isChoosingMoveCard?: boolean;
// }>;