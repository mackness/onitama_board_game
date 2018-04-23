import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Board } from '../../typings';
import { getSlotValue } from '../../utils';
import Piece from '../Piece';

interface BoardSlotProps extends React.Props<BoardSlot> {
	actions: any;
	activeSlotCoord: any;
	activePlayer: number;
	board: Board;
	candidateCoords: any;
	slotCoord: any;
	slotValue: number;
	slot: any;
}

interface BoardSlotState {

}

const Slot = styled.div`
	align-items: center;
	background-color: ${(props: any) => {
		if (props.theme.isCandidate || props.theme.isActive) {
			return '#ccc';
		} else {
			return 'transparent';
		}
	}}
	border-bottom: 1px solid #000;
	display: flex;
	height: 50px;
	justify-content: center;
	width: 50px;
`;

class BoardSlot extends React.Component<BoardSlotProps, BoardSlotState> {

	constructor(props: any) {
		super(props);
		this.state = {};
	}

	_handleSlotInteraction = (event: any) => {
		let { activePlayer, board, slotCoord, activeSlotCoord } = this.props;
		if (event.currentTarget.classList.contains('candidate') && getSlotValue(board, slotCoord) !== activePlayer) {
			this.props.actions.gameActions.handleCandidateSlotInteraction({
				srcCoord: activeSlotCoord,
				targetCoord: slotCoord
			});
		} else {
			this.props.actions.gameActions.handleSlotInteraction(slotCoord);
		}
	}

	render() {
		return (
			<Slot
				onClick={this._handleSlotInteraction}
				theme={{
					isActive: this.props.slot.get('isActive'),
					isCandidate: this.props.slot.get('isCandidate')
				}}
			>
				<Piece color={this.props.slot.get('value')} />
			</Slot>
		);
	}
}

const mapStateToProps = (state: any, props: any) => {
	return {
		board: state.game.get('board'),
		activePlayer: state.game.get('activePlayer'),
		activeSlotCoord: state.game.get('activeSlotCoord'),
		candidateCoords: state.game.get('candidateCoords')
	};
};

export default connect(mapStateToProps)(BoardSlot);
