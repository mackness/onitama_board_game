import * as React from 'react';
import styled from 'styled-components';
import CardSlot from '../CardSlot';
import Piece from '../Piece';

interface MoveCardProps {
	card: any;
	interaction: any;
	label: string;
}

const Card = styled.div`
	background-color: #000;
	border-bottom-left-radius: 3px;
	border-bottom-right-radius: 3px;
	margin: auto 10px auto 0;
`;

const CardMetaRow = styled.div`
	align-items: center;
	display: flex;
	padding-right: 5px;
`;

const Label = styled.span`
	flex-grow: 1;
    display: block;
    color: #fff;
    padding: 5px 7px;
	font-size: 14px;
	font-weight: bold;
`;

const CardGrid = styled.div`
	background-color: #fff;
	border-left: solid 1px #000;
	border-top: solid 1px #000;
	display: flex;
	height: 154px;
	justify-content: space-around;
	overflow: hidden;
`;

const Column = styled.div`
	border-right: solid 1px #000;
`;

const MoveCard: React.StatelessComponent<MoveCardProps> = ({card, interaction, label}) => {
	return (
		<Card>
			<CardGrid data-card={label} onClick={interaction}>
				{card.get('card').map((col: any, x: any) => (
					<Column key={x}>
						{col.map((slot: any, y: number) => (
							<CardSlot
								color={card.get('color')}
								key={y}
								value={slot}
							/>
						))}
					</Column>
				))}
			</CardGrid>
			<CardMetaRow>
				<Label>{card.get('school')}</Label>
				<Piece color={card.get('player')} size='small' />
			</CardMetaRow>
		</Card>
	);
};

export default MoveCard;