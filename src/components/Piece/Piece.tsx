import * as React from 'react';
import c from '../../constants/game-constants';

interface PieceProps {
	value: number;
}

const CardSlot: React.StatelessComponent<PieceProps> = ({value}) => {
	let piece = null;
	switch (value) {
		case c.RED:
			piece = <span className='piece piece--red' />;
			break;
		case c.RED_MASTER:
			piece = <span className='piece piece--red piece--master' />;
			break;
		case c.BLUE:
			piece = <span className='piece piece--blue' />;
			break;
		case c.BLUE_MASTER:
			piece = <span className='piece piece--blue piece--master' />;
			break;
		default:
	}
	return piece;
};

export default CardSlot;