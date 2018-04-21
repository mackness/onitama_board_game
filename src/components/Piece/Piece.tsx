import * as React from 'react';
import * as c from '../../constants/game-constants';

interface PieceProps {
	color: number;
	size?: string;
}

const _getCapturedClass = (size: string|undefined) => {
	return size === 'small' ? 'piece--small' : null;
};

const CardSlot: React.StatelessComponent<PieceProps> = ({color, size}) => {
	let piece = null;
	switch (color) {
		case c.RED:
			piece = <span className={`piece piece--red ${_getCapturedClass(size)}`} />;
			break;
		case c.RED_MASTER:
			piece = <span className={`piece piece--red piece--master ${_getCapturedClass(size)}`} />;
			break;
		case c.BLUE:
			piece = <span className={`piece piece--blue ${_getCapturedClass(size)}`} />;
			break;
		case c.BLUE_MASTER:
			piece = <span className={`piece piece--blue piece--master ${_getCapturedClass(size)}`} />;
			break;
		default:
			piece = <span className={`piece ${_getCapturedClass(size)}`} />;
	}
	return piece;
};

export default CardSlot;