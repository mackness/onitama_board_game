import * as React from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import c from './constants/game-constants';
import BoardSlot from './components/BoardSlot';
import CardSlot from './components/CardSlot';
import Debugger from './components/Debugger';
import CapturedPieces from './components/CapturedPieces';
import { Board } from './typings';

interface OnitamaProps extends React.Props<Onitama> {
	actions: any;
	board: Board;
	swapCard: any;
	blueMoveCard1: any;
	blueMoveCard2: any;
	redMoveCard1: any;
	redMoveCard2: any;
	activePlayer: number;
	isChoosingMoveCard: boolean;
}

interface OnitamaState {

}

class Onitama extends React.Component<OnitamaProps, OnitamaState> {

	constructor(props: any) {
		super(props);
		this.state = {};
	}

	componentDidMount(): void {
		this.props.actions.gameActions.setupInitialGameState();
	}

	_handleMoveCardClick = (event: any): void => {
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

	_renderCard = (card: any, id: string) => {
		return (
			<div className='card' data-card={id} onClick={this._handleMoveCardClick}>
				{card.get('card').map((col: any, x: any) => (
					<div className='col' key={x}>{col.map((slot: any, y: number) => (
						<CardSlot
							color={card.get('color')}
							key={y}
							value={slot}
						/>
					))}</div>
				))}
			</div>
		);
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
				<div className='cards'>
					{this._renderCard(redMoveCard1, c.RED_MOVE_CARD_1)}
					{this._renderCard(redMoveCard2, c.RED_MOVE_CARD_2)}
				</div>

				<div className='cards'>
					<div className='board'>
						{board.map((col: any, x: any) => (
							<div className='col' key={x}>
								{col.map((slot: any, y: number) => (
									<BoardSlot
										key={y}
										slotValue={slot}
										slotCoord={Map({x, y})}
										actions={this.props.actions}
									/>
								))}
							</div>
						))}
					</div>
					{this._renderCard(swapCard, c.SWAP_CARD)}

				</div>
				<div className='cards'>
					{this._renderCard(blueMoveCard1, c.BLUE_MOVE_CARD_1)}
					{this._renderCard(blueMoveCard2, c.BLUE_MOVE_CARD_2)}
				</div>
				<CapturedPieces />
				<Debugger state={this.props} />
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
