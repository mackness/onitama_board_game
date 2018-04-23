import { List } from 'immutable';
import { ImmutableMap } from './ImmutableMap';

export declare type Board = List<List<number>>;
export declare type SwapCard = List<List<number>>;

export declare type Coord = ImmutableMap<{
	x: number;
	y: number;
}>;

export declare type Slot = ImmutableMap<{
	isActive: number;
	isCandidate: number;
}>;

export interface Card {
	school: string;
	schoolColor: number;
	card: Board;
}

export interface ApplicationState {
	board?: Board;
	swapCard?: Card;
	redMoveCard1?: Card;
	redMoveCard2?: Card;
	blueMoveCard1?: Card;
	blueMoveCard2?: Card;
	activeSlotCoord?: Coord;
	candidateCoords?: Coord;
	activePlayer?: number;
	moveHistory?: List<ImmutableMap<string|number>>;
	isChoosingMoveCard?: boolean;
	get: Function;
	set: Function;
	merge: Function;
}