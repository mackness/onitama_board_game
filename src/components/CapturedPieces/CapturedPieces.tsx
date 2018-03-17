import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Peice from '../Piece';

interface CapturedPiecesProps  {
	capturedPieces: any;
}

const FlexRow = styled.div`
	display: flex;
`;

const Label = styled.span`
	margin-right: 5px;
`;

const _renderPiece = (value: number, i: number) => (
	<Peice
		key={i}
		color={value}
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