import * as React from 'react';
import styled from 'styled-components';
import { Mode } from '../../typings';

interface GameSettingsProps extends React.Props<GameSettingsProps> {
	actions: any;
	history: any;
}

const SettingsContainer = styled.div`
	display: flex;
	flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 300px;
    height: 600px;
`;

const Button = styled.button`
	color: #000;
`;

const navigate = (history: any, mode: any) => {
	history.push({
		pathname: '/game',
		state: { mode }
	});
};

const GameSettings: React.StatelessComponent<GameSettingsProps> = ({ actions, history }) => {
	return (
		<SettingsContainer>
			<Button onClick={() => navigate(history, Mode.COMPUTER)}>computer</Button>
			<Button onClick={() => navigate(history, Mode.HUMAN)}>human</Button>
		</SettingsContainer>
	);
};

export default GameSettings;