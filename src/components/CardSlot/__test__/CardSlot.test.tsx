import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { MoveCard } from '../../../typings';
import CardSlot from '../CardSlot';

test('component', () => {
	it('renders without crashing', () => {
		const component = renderer.create(<CardSlot type={MoveCard.MOVE} color='#848877' />);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});