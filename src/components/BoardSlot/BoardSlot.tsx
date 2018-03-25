import * as React from 'react';
import { connect } from 'react-redux';
import { Board } from '../../typings';
import { getSlotValue, isOpponentSlot } from '../../utils';
import c from '../../constants/game-constants';
import Piece from '../Piece';

interface BoardSlotProps extends React.Props<BoardSlot> {
	actions: any;
	activeSlotCoord: any;
	activePlayer: number;
	board: Board;
	candidateCoords: any;
	slotCoord: any;
	slotValue: number;
}

interface BoardSlotState {

}

class BoardSlot extends React.Component<BoardSlotProps, BoardSlotState> {

	constructor(props: any) {
		super(props);
		this.state = {};
	}

	_getSlotClass = () => {
		switch (this.props.slotValue) {
			case c.RED:
				return 'red';
			case c.BLUE:
				return 'blue';
			default:
				return '';
		}
	}

	_getActiveClass = (slotCoord: any, activeSlotCoord: any) => {
		if (slotCoord.get('x') === activeSlotCoord.get('x') &&
			slotCoord.get('y') === activeSlotCoord.get('y')) {
			return 'active';
		} else {
			return '';
		}
	}

	/**
	 * Is the current slot a candidate slot?
	 * candidate slot algorithm:
	 * - does the current slot coord match one of candidate coords
	 * - is the slot empty OR does the slot belong to the opponent
	 * @param {List} board              - current board.
	 * @param {Map}  slotCoord          - the end coordinate.
	 * @param {Map}  candidateSlotCoord - the end coordinate.
	 */
	_isCandidateSlot = (board: Board, slotCoord: any, candidateCoord: any) => {
		const slotValue = getSlotValue(board, candidateCoord);
		const { activePlayer} = this.props;
		return (
			(slotCoord.get('x') === candidateCoord.get('x')) &&
			(slotCoord.get('y') === candidateCoord.get('y')) &&
			(slotValue === c.EMPTY || isOpponentSlot(activePlayer, board, candidateCoord))
		);
	}

	_getCandidateClass = (board: Board, slotCoord: any, candidateCoords: any) => {
		let className = '';
		this.props.candidateCoords.forEach((candidateCoord: any) => {
			if (this._isCandidateSlot(board, slotCoord, candidateCoord)) {
				className = 'candidate';
			}
		});
		return className;
	}

	_handleSlotClick = (event: any) => {
		let { activePlayer, board, slotCoord, activeSlotCoord } = this.props;
		if (event.currentTarget.classList.contains('candidate') && getSlotValue(board, slotCoord) !== activePlayer) {
			this.props.actions.gameActions.handleCandidateSlotInteraction({
				srcCoord: activeSlotCoord,
				targetCoord: slotCoord
			});
			this.props.actions.gameActions.handleMoveCardExchange();
		} else {
			this.props.actions.gameActions.handleSlotInteraction(slotCoord);
		}
	}

	render() {
		let candidateClass = this._getCandidateClass(
			this.props.board,
			this.props.slotCoord,
			this.props.candidateCoords
		);
		return (
			<div
				className={[
					'slot',
					candidateClass,
					this._getSlotClass(),
					this._getActiveClass(this.props.slotCoord, this.props.activeSlotCoord)
				].join(' ').trim()}
				onClick={this._handleSlotClick}
			>
				<Piece color={this.props.slotValue} />
			</div>
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
