import * as React from 'react';
import c from '../../constants/game-constants';

interface CardSlotProps {
	value: number;
}

const CardSlot: React.StatelessComponent<CardSlotProps> = ({value}) => {
	switch (value) {
		case c.RED:
			return <div className='slot red'>{value}</div>;
		case c.BLUE:
			return <div className='slot blue'>{value}</div>;
		default:
			return <div className='slot blue'>{value}</div>;
	}
};

export default CardSlot;