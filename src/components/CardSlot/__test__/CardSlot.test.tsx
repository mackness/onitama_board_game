import * as React from 'react';
import * as renderer from 'react-test-renderer';
import * as c from '../../../constants/game-constants';
import CardSlot from '../CardSlot';

test('component', () => {
	it('renders without crashing', () => {
		const component = renderer.create(<CardSlot value={c.BLUE} />);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});
});