import * as React from 'react';
import { connect } from 'react-redux';
import { Map } from 'immutable';
import c from './constants/game-constants';
import BoardSlot from './components/BoardSlot';
import CardSlot from './components/CardSlot';
import Debugger from './components/Debugger';
import CapturedPieces from './components/CapturedPieces';
import { Board, Card } from './typings';

interface OnitamaProps extends React.Props<Onitama> {
	actions: any;
	board: Board;
	swapCard: Card;
	blueMoveCard1: Card;
	blueMoveCard2: Card;
	redMoveCard1: Card;
	redMoveCard2: Card;
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

	handleMoveCardClick = (event: any): void => {
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
		return (
			<div>
				<div className='cards'>
					<div className='card' data-card={c.RED_MOVE_CARD_1} onClick={this.handleMoveCardClick}>
						{this.props.redMoveCard1.map((col: any, x) => (
							<div className='col' key={x}>{col.map((slot: any, y: number) => (<CardSlot key={y} value={slot} />))}</div>
						))}
					</div>
					<div className='card' data-card={c.RED_MOVE_CARD_2} onClick={this.handleMoveCardClick}>
						{this.props.redMoveCard2.map((col: any, x) => (
							<div className='col' key={x}>{col.map((slot: any, y: number) => (<CardSlot key={y} value={slot} />))}</div>
						))}
					</div>
				</div>

				<div className='cards'>
					<div className='card board'>
						{this.props.board.map((col: any, x) => (
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
					<div className='card' data-card='swapCard'>
						{this.props.swapCard.map((col: any, x) => (
							<div className='col' key={x}>{col.map((slot: any, y: number) => (<CardSlot key={y} value={slot} />))}</div>
						))}
					</div>
				</div>

				<div className='cards'>
					<div className='card' data-card={c.BLUE_MOVE_CARD_1} onClick={this.handleMoveCardClick}>
						{this.props.blueMoveCard1.map((col: any, x) => (
							<div className='col' key={x}>{col.map((slot: any, y: number) => (<CardSlot key={y} value={slot} />))}</div>
						))}
					</div>
					<div className='card blueMoveCard2' data-card={c.BLUE_MOVE_CARD_2} onClick={this.handleMoveCardClick}>
						{this.props.blueMoveCard2.map((col: any, x) => (
							<div className='col' key={x}>{col.map((slot: any, y: number) => (<CardSlot key={y} value={slot} />))}</div>
						))}
					</div>
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
