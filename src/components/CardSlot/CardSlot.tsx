import * as React from 'react';
import styled from 'styled-components';
import { MoveCard } from '../../typings';

interface CardSlotProps {
	color?: string;
	type?: number;
}

const Slot = styled.div`
	background-color: ${(props: any) => props.theme.color}
	height: 30px;
	width: 30px;
	border-bottom: solid 1px #000;
`;

const CardSlot: React.StatelessComponent<CardSlotProps> = ({type, color}) => {
	switch (type) {
		case MoveCard.MOVE:
			return <Slot theme={{color}} />;
		case MoveCard.START:
			return <Slot theme={{color: '#000'}} />;
		default:
			return <Slot theme={{color: 'transparent'}} />;
	}
};

export default CardSlot;
