import * as React from 'react';
import c from '../../constants/game-constants';

interface PieceProps {
	value: number;
	captured?: boolean;
}

const _getCapturedClass = (captured: boolean|undefined) => {
	return captured ? 'piece--captured' : null;
};

const CardSlot: React.StatelessComponent<PieceProps> = ({value, captured}) => {
	let piece = null;
	switch (value) {
		case c.RED:
			piece = <span className={`piece piece--red ${_getCapturedClass(captured)}`} />;
			break;
		case c.RED_MASTER:
			piece = <span className={`piece piece--red piece--master ${_getCapturedClass(captured)}`} />;
			break;
		case c.BLUE:
			piece = <span className={`piece piece--blue ${_getCapturedClass(captured)}`} />;
			break;
		case c.BLUE_MASTER:
			piece = <span className={`piece piece--blue piece--master ${_getCapturedClass(captured)}`} />;
			break;
		default:
			piece = <span className={`piece ${_getCapturedClass(captured)}`} />;
	}
	return piece;
};

export default CardSlot;