import * as React from 'react';
import { connect } from 'react-redux';

interface DebuggerProps  {
	activeSlotCoord: any;
	candidateCoords: any;
	activePlayer: number;
	moveHistory: any;
	isChoosingMoveCard: boolean;
}

const Debugger: React.StatelessComponent<DebuggerProps> = (
	{activeSlotCoord, candidateCoords, activePlayer, moveHistory, isChoosingMoveCard}
) => {
	const props = { activeSlotCoord, candidateCoords, activePlayer, moveHistory, isChoosingMoveCard };
	return (
		<pre>{JSON.stringify(Object.assign(props), undefined, 2)}</pre>
	);
};

const mapStateToProps = (state: any, props: any) => {
	return {
		activeSlotCoord: state.game.get('activeSlotCoord'),
		candidateCoords: state.game.get('candidateCoords'),
		activePlayer: state.game.get('activePlayer'),
		moveHistory: state.game.get('moveHistory'),
		isChoosingMoveCard: state.game.get('isChoosingMoveCard')
	};
};

export default connect(mapStateToProps)(Debugger);