import * as React from 'react';
import * as c from '../../constants/game-constants';
import styled from 'styled-components';

interface CardSlotProps {
	value: number;
	color?: string;
}

const Slot = styled.div`
	background-color: ${(props: any) => props.color}
	height: 30px;
	width: 30px;
	border-bottom: solid 1px #000;
`;

const CardSlot: React.StatelessComponent<CardSlotProps> = ({value, color}) => {
	switch (value) {
		case c.MOVE:
			return <Slot color={color} />;
		case c.START:
			return <Slot color={'#000'} />;
		default:
			return <Slot color={'transparent'} />;
	}
};

export default CardSlot;
