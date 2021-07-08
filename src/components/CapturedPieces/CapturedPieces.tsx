import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PieceFactory from '../PieceFactory';
import { Slot, Player } from '../../typings';

interface CapturedPiecesProps  {
	capturedPieces: any;
}

const FlexRow = styled.div`
	display: flex;
`;

const Label = styled.span`
	margin-right: 5px;
`;

const _getBackgroundColor = (slot: Slot): string => {
	const player = slot.getIn(['piece', 'player']);
	if (player === Player.BLUE) {
		return '#69a1b0';
	} else if (player === Player.RED) {
		return '#fe5a59';
	} else {
		return '#ccc';
	}
};

const _renderPiece = (slot: any, i: number): JSX.Element =>  {
	return (
		<PieceFactory
			key={i}
			style={{
				margin: ' 0 5px 0 0',
				backgroundColor: _getBackgroundColor(slot)
			}}
			piece={slot.get('piece')}
			size='small'
		/>
	);
};

const CapturedPieces: React.StatelessComponent<CapturedPiecesProps> = ({capturedPieces}) => {
	return (
		<div>
			<FlexRow>
				<Label>blue player:</Label>
				{capturedPieces.get('blue').map(_renderPiece)}
			</FlexRow>
			<FlexRow>
				<Label>red player:</Label>
				{capturedPieces.get('red').map(_renderPiece)}
			</FlexRow>
		</div>
	);
};

const mapStateToProps = (state: any, props: any) => {
	return {
		capturedPieces: state.game.get('capturedPieces')
	};
};

export default connect(mapStateToProps)(CapturedPieces);