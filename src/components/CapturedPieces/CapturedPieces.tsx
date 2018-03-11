import * as React from 'react';
import { connect } from 'react-redux';
import Peice from '../Piece';

interface CapturedPiecesProps  {
	capturedPieces: any;
}

const CapturedPieces: React.StatelessComponent<CapturedPiecesProps> = ({capturedPieces}) => {
	return (
		<div className='captured-pieces'>
			<div className='captured-pieces-row'>
				<span className='captured-pieces-label'>player 1:</span>
				{capturedPieces.get('blue').map((value: number, i: number) => (
					<Peice
						key={i}
						value={value}
						captured={true}
					/>
				))}
			</div>
			<div className='captured-pieces-row'>
				<span className='captured-pieces-label'>player 2:</span>
				{capturedPieces.get('red').map((value: number, i: number) => (
					<Peice
						key={i}
						value={value}
						captured={true}
					/>
				))}
			</div>
		</div>
	);
};

const mapStateToProps = (state: any, props: any) => {
	return {
		capturedPieces: state.game.get('capturedPieces')
	};
};

export default connect(mapStateToProps)(CapturedPieces);