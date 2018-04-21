import * as React from 'react';
import * as c from '../../constants/game-constants';

interface CardSlotProps {
	value: number;
	color?: string;
}

const CardSlot: React.StatelessComponent<CardSlotProps> = ({value, color}) => {
	switch (value) {
		case c.MOVE:
			return <div className={`slot slot--${color}`} />;
		case c.START:
			return <div className='slot slot--start' />;
		default:
			return <div className='slot' />;
	}
};

export default CardSlot;