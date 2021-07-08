import * as React from 'react';
import { Piece } from '../../typings';
import styled from 'styled-components';

interface PieceProps {
	piece: any;
	size?: string;
	style?: any;
}

const Pawn = styled.span`
	align-items: center;
	border-radius: 50%;
	background-color: ${(props: any) => props.theme.color}
	display: flex;
	justify-content: center;
	${(props: any) => {
		if (props.theme.size === 'small') {
			return `
				width: 15px;
				height: 15px;
			`;
		} else {
			return `
				width: 20px;
				height: 20px;
			`;
		}
	}}
`;

const Master = Pawn.extend`
	border-radius: 25%;
`;

const PieceFactory: React.StatelessComponent<PieceProps> = ({piece, size, style}) => {
	let p = null;
	switch (piece) {
		case Piece.RED_PAWN:
			p = <Pawn style={...style} theme={{color: '#fe5a59', size}}/>;
			break;
		case Piece.RED_MASTER:
			p = <Master style={...style} theme={{color: '#fe5a59', size}}/>;
			break;
		case Piece.BLUE_PAWN:
			p = <Pawn style={...style} theme={{color: '#69a1b0', size}}/>;
			break;
		case Piece.BLUE_MASTER:
			p = <Master style={...style} theme={{color: '#69a1b0', size}}/>;
			break;
		default:
			p = <Pawn style={...style} theme={{size}}/>;
	}
	return p;
};

export default PieceFactory;
