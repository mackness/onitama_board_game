import * as React from 'react';
import styled from 'styled-components';
import CardSlot from '../CardSlot';
import Piece from '../Piece';

interface MoveCardProps {
	card: any;
	interaction: any;
	label: string;
}

const CardMetaRow = styled.div`
	display: flex;
	align-items: center;
	padding-right: 5px;
`;

const Label = styled.span`
	flex-grow: 1;
`;

const MoveCard: React.StatelessComponent<MoveCardProps> = ({card, interaction, label}) => {
	return (
		<div className='card'>
			<div className='card-grid' data-card={label} onClick={interaction}>
				{card.get('card').map((col: any, x: any) => (
					<div className='col' key={x}>{col.map((slot: any, y: number) => (
						<CardSlot
							color={card.get('color')}
							key={y}
							value={slot}
						/>
					))}
					</div>
				))}
			</div>
			<CardMetaRow>
				<Label className='card-label'>{card.get('school')}</Label>
				<Piece color={card.get('player')} size='small' />
			</CardMetaRow>
		</div>
	);
};

export default MoveCard;