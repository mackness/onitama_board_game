import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Board } from '../../typings';
import PieceFactory from '../PieceFactory';

interface BoardSlotProps extends React.Props<BoardSlot> {
	actions: any;
	activeSlotCoord: any;
	activePlayer: number;
	board: Board;
	candidateCoords: any;
	coord: any;
	piece: any;
	player: number;
	slotCoord: any;
	slotValue: number;
	slot: any;
}

interface BoardSlotState {

}

const Slot = styled.div`
	align-items: center;
	background-color: transparent;
	border-bottom: 1px solid #000;
	display: flex;
	height: 50px;
	justify-content: center;
	width: 50px;
`;

const ActiveSlot = Slot.extend`
	background-color: #ccc;
`;

const CandidateSlot = Slot.extend`
	background-color: #ccc;
`;

class BoardSlot extends React.Component<BoardSlotProps, BoardSlotState> {

	constructor(props: any) {
		super(props);
		this.state = {};
	}

	_handleSlotInteraction = () => {
		let { activePlayer, coord, player } = this.props;
		if (activePlayer === player) {
			this.props.actions.gameActions.handleSlotInteraction(coord);
		}
	}

	_handleCandidateSlotInteraction  = (event: any) => {
		let { activePlayer, coord, player, activeSlotCoord } = this.props;
		if (activePlayer !== player) {
			this.props.actions.gameActions.handleCandidateSlotInteraction({
				srcCoord: activeSlotCoord,
				targetCoord: coord
			});
		}
	}

	render() {
		const { slot, piece } = this.props;
		const theme = {
			isActive: this.props.slot.get('isActive'),
			isCandidate: this.props.slot.get('isCandidate')
		};
		if (slot.get('isActive')) {
			return (
				<ActiveSlot theme={theme}>
					<PieceFactory piece={piece} size='large' />
				</ActiveSlot>
			);
		} else if (slot.get('isCandidate')) {
			return (
				<CandidateSlot onClick={this._handleSlotInteraction} theme={theme}>
					<PieceFactory piece={piece} size='large' />
				</CandidateSlot>
			);
		} else {
			return (
				<Slot onClick={this._handleSlotInteraction} theme={theme}>
					<PieceFactory piece={piece} size='large' />
				</Slot>
			);
		}
	}
}

const mapStateToProps = (state: any, props: any) => {
	return {
		activePlayer: state.game.get('activePlayer'),
		activeSlotCoord: state.game.get('activeSlotCoord'),
		coord: props.slot.get('coord'),
		player: props.slot.getIn(['piece', 'player']),
		piece: props.slot.getIn(['piece', 'piece'])
	};
};

export default connect(mapStateToProps)(BoardSlot);
