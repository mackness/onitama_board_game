
import * as React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as c from '../../constants/game-constants';

interface WinnerPanelProps {
	winner: number;
	actions: object;
}

const handleResetGame = (actions: any) => {
	actions.gameActions.resetGame();
};

const Title = styled.h3`
	background: #000;
	color: #fff;
`;

const Panel = styled.div`
	background: #000;
	color: #fff;
	width: 200px;
	padding: 10px;
	text-align: center;
`;

const Button = styled.button`
	background: #fff;
	color: #000;
`;

const WinnerPanel: React.StatelessComponent<WinnerPanelProps> = ({actions, winner}) => {

	if (!winner) {
		return null;
	}

	return (
		<Panel>
			<Title>winner: {winner === c.BLUE ? 'blue won' : 'red won'}</Title>
			<Button onClick={() => handleResetGame(actions)}>reset</Button>
		</Panel>
	);
};

const mapStateToProps = (state: any, props: any) => {
	return {
		winner: state.game.get('winner'),
	};
};

export default connect(mapStateToProps)(WinnerPanel);
