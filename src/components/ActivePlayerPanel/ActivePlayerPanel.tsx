import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Player, Piece } from '../../typings';
import PieceFactory from '../PieceFactory';

interface CapturedPiecesProps  {
	activePlayer: number;
}

const FlexRow = styled.div`
	display: flex;
`;

const Label = styled.span`
	margin-right: 5px;
`;

const _getPieceType = (activePlayer: number): any => {
	if (activePlayer === Player.BLUE) {
		return Piece.BLUE_PAWN;
	} else {
		return Piece.RED_PAWN;
	}
};

const ActivePlayerPanel: React.StatelessComponent<CapturedPiecesProps> = ({activePlayer}) => {
	return (
		<FlexRow>
			<Label>Turn:</Label>
			<PieceFactory piece={_getPieceType(activePlayer)} size='small' />
		</FlexRow>
	);
};

const mapStateToProps = (state: any, props: any) => {
	return {
		activePlayer: state.game.get('activePlayer')
	};
};

export default connect(mapStateToProps)(ActivePlayerPanel);