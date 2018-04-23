import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Map } from 'immutable';
import * as c from './constants/game-constants';
import Card from './components/Card';
import BoardSlot from './components/BoardSlot';
import CapturedPieces from './components/CapturedPieces';
import WinnerPanel from './components/WinnerPanel';
import ActivePlayerPanel from './components/ActivePlayerPanel';
import { Board } from './typings';

interface OnitamaProps extends React.Props<Onitama> {
	actions: any;
	board: Board;
	swapCard: any;
	location: any;
	blueMoveCard1: any;
	blueMoveCard2: any;
	redMoveCard1: any;
	redMoveCard2: any;
	activePlayer: number;
	isChoosingMoveCard: boolean;
}

interface OnitamaState {

}

const Board = styled.div`
	border-left: solid 1px #000;
	border-right: solid 1px #000;
	border-top: solid 1px #000;
	display: flex;
	justify-content: space-around;
	margin-right: 20px;
	overflow: hidden;
`;

const Column = styled.div`
	border-right: solid 1px #000;
`;

const FlexColumn = styled.div`
	display: flex;
	margin-bottom: 20px;
	margin-top: 20px;
	width: 425px;
`;

class Onitama extends React.Component<OnitamaProps, OnitamaState> {

	constructor(props: any) {
		super(props);
		this.state = {};
	}

	componentDidMount(): void {
		const mode = this.props.location.state.mode;
		this.props.actions.gameActions.setupInitialGameState(mode);
	}

	moveCardInteraction = (event: any): void => {
		let card = event.currentTarget.dataset.card;
		if (this.props.isChoosingMoveCard) {
			switch (card) {
				case c.BLUE_MOVE_CARD_1:
					this.props.actions.gameActions.handleMoveCardExchange(c.BLUE_MOVE_CARD_1);
					break;
				case c.BLUE_MOVE_CARD_2:
					this.props.actions.gameActions.handleMoveCardExchange(c.BLUE_MOVE_CARD_2);
					break;
				case c.RED_MOVE_CARD_1:
					this.props.actions.gameActions.handleMoveCardExchange(c.RED_MOVE_CARD_1);
					break;
				case c.RED_MOVE_CARD_2:
					this.props.actions.gameActions.handleMoveCardExchange(c.RED_MOVE_CARD_2);
					break;
				default:
					throw new Error('noOP, move card should have matched 1 of the 4 possible move cards');
			}
		}
	}

	render() {
		const {
			blueMoveCard1,
			blueMoveCard2,
			board,
			redMoveCard1,
			redMoveCard2,
			swapCard
		} = this.props;
		return (
			<div>
				<FlexColumn>
					<Card
						card={redMoveCard1}
						interaction={this.moveCardInteraction}
						label={c.RED_MOVE_CARD_1}
					/>
					<Card
						card={redMoveCard2}
						interaction={this.moveCardInteraction}
						label={c.RED_MOVE_CARD_2}
					/>
				</FlexColumn>
				<FlexColumn>
					<Board>
						{board.map((col: any, x: any) => (
							<Column key={x}>
								{col.map((slot: any, y: number) => (
									<BoardSlot
										key={y}
										slot={slot}
										slotCoord={Map({x, y})}
										actions={this.props.actions}
									/>
								))}
							</Column>
						))}
					</Board>
					<Card
						card={swapCard}
						interaction={this.moveCardInteraction}
						label={c.SWAP_CARD}
					/>
				</FlexColumn>
				<FlexColumn>
					<Card
						card={blueMoveCard1}
						interaction={this.moveCardInteraction}
						label={c.BLUE_MOVE_CARD_1}
					/>
					<Card
						card={blueMoveCard2}
						interaction={this.moveCardInteraction}
						label={c.BLUE_MOVE_CARD_2}
					/>
				</FlexColumn>
				<ActivePlayerPanel />
				<CapturedPieces />
				<WinnerPanel actions={this.props.actions} />
			</div>
		);
	}
}

const mapStateToProps = (state: any, props: any) => {
	return {
		board: state.game.get('board'),
		swapCard: state.game.get('swapCard'),
		blueMoveCard1: state.game.get('blueMoveCard1'),
		blueMoveCard2: state.game.get('blueMoveCard2'),
		redMoveCard1: state.game.get('redMoveCard1'),
		redMoveCard2: state.game.get('redMoveCard2'),
		activePlayer: state.game.get('activePlayer'),
		isChoosingMoveCard: state.game.get('isChoosingMoveCard')
	};
};

export default connect(mapStateToProps)(Onitama);
