import * as React from 'react';
import * as c from '../../constants/game-constants';
import styled from 'styled-components';

interface PieceProps {
	color: number;
	size?: string;
}

const Piece = styled.span`
	align-items: center;
	border-radius: 50%;
	background-color: ${(props: any) => props.theme.color}
	display: flex;
	height: ${(props: any) => props.theme.size === 'small' ? '15px' : '20px'};
	justify-content: center;
	width: ${(props: any) => props.theme.size === 'small' ? '15px' : '20px'};
`;

const PieceMaster = Piece.extend`
	border-radius: 25%;
`;

const PieceComponent: React.StatelessComponent<PieceProps> = ({color, size}) => {
	let piece = null;
	switch (color) {
		case c.RED:
			piece = <Piece theme={{color: '#fe5a59', size}}/>;
			break;
		case c.RED_MASTER_VALUE:
			piece = <PieceMaster theme={{color: '#fe5a59', size}}/>;
			break;
		case c.BLUE:
			piece = <Piece theme={{color: '#69a1b0', size}}/>;
			break;
		case c.BLUE_MASTER_VALUE:
			piece = <PieceMaster theme={{color: '#69a1b0', size}}/>;
			break;
		default:
			piece = <Piece theme={{color: 'transparent', size}}/>;
	}
	return piece;
};

export default PieceComponent;
