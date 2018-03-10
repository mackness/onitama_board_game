import { List } from 'immutable';
import { ImmutableMap } from './ImmutableMap';

export declare type Board = List<List<number>>;
export declare type Card = List<List<number>>;
export declare type Coords = List<ImmutableMap<string|number|any>>;
export declare type Coord = ImmutableMap<string|number|any>;

export interface ApplicationState {
	board?: Board;
	swapCard?: Card;
	redMoveCard1?: Card;
	redMoveCard2?: Card;
	blueMoveCard1?: Card;
	blueMoveCard2?: Card;
	activeSlotCoord?: Coord;
	candidateCoords?: Coords;
	activePlayer?: number;
	moveHistory?: List<ImmutableMap<string|number>>;
	isChoosingMoveCard?: boolean;
	get: Function;
	set: Function;
	merge: Function;
}