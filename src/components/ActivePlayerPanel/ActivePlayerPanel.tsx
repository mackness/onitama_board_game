import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Piece from '../Piece';

interface CapturedPiecesProps  {
	activePlayer: number;
}

const FlexRow = styled.div`
	display: flex;
`;

const Label = styled.span`
	margin-right: 5px;
`;

const ActivePlayerPanel: React.StatelessComponent<CapturedPiecesProps> = ({activePlayer}) => {
	return (
		<FlexRow>
			<Label>Turn:</Label>
			<Piece color={activePlayer} size='small' />
		</FlexRow>
	);
};

const mapStateToProps = (state: any, props: any) => {
	return {
		activePlayer: state.game.get('activePlayer')
	};
};

export default connect(mapStateToProps)(ActivePlayerPanel);