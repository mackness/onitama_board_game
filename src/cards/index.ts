import c from '../constants/game-constants';
import { fromJS } from 'immutable';

export default [
	{
		school: 'mantis',
		color: c.RED,
		card: fromJS([
			[0, 0, 0, 0, 0],
			[0, 0, c.MOVE, 0, 0],
			[0, 0, c.START, 0, 0],
			[0, c.MOVE, 0, c.MOVE, 0],
			[0, 0, 0, 0, 0]
		])
	},
	{
		school: 'ox',
		color: c.RED,
		card: fromJS([
			[0, 0, 0, 0, 0],
			[0, 0, c.MOVE, 0, 0],
			[0, c.MOVE, c.START, c.MOVE, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0]
		])
	},
	{
		school: 'cobra',
		color: c.BLUE,
		card: fromJS([
			[0, 0, 0, 0, 0],
			[0, c.MOVE, 0, c.MOVE, 0],
			[0, 0, c.START, 0, 0],
			[0, 0, c.MOVE, 0, 0],
			[0, 0, 0, 0, 0]
		])
	},
	{
		school: 'horse',
		color: c.BLUE,
		card: fromJS([
			[0, 0, 0, 0, 0],
			[0, c.MOVE, 0, c.MOVE, 0],
			[0, 0, c.START, 0, 0],
			[0, 0, c.MOVE, 0, 0],
			[0, 0, 0, 0, 0]
		])
	},
	{
		school: 'eel',
		color: c.RED,
		card: fromJS([
			[0, 0, 0, 0, 0],
			[0, c.MOVE, 0, c.MOVE, 0],
			[0, 0, c.START, 0, 0],
			[0, 0, c.MOVE, 0, 0],
			[0, 0, 0, 0, 0]
		])
	}
];
