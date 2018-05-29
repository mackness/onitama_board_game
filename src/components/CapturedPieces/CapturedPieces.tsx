import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PieceFactory from '../PieceFactory';

interface CapturedPiecesProps  {
	capturedPieces: any;
}

const FlexRow = styled.div`
	display: flex;
`;

const Label = styled.span`
	margin-right: 5px;
`;

const _renderPiece = (slot: any, i: number) => (
	<PieceFactory
		key={i}
		piece={slot.get('piece')}
		size='small'
	/>
);

const CapturedPieces: React.StatelessComponent<CapturedPiecesProps> = ({capturedPieces}) => {
	return (
		<div>
			<FlexRow>
				<Label>player 1:</Label>
				{capturedPieces.get('blue').map(_renderPiece)}
			</FlexRow>
			<FlexRow>
				<Label>player 2:</Label>
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