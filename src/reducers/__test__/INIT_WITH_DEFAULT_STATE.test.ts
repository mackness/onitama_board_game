import gameReducer, { DEFAULT_STATE } from '../gameReducer';

test('game reducer', () => {
	it('it initializes with default state', () => {
		const reducer = gameReducer(DEFAULT_STATE, {});
		expect(reducer).not.toBe(null);
	});
});
