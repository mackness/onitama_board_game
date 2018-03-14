import c from '../constants/game-constants';

export default [
	{
		school: 'mantis',
		color: 'blue',
		player: c.RED,
		card: [
			[0, 0, 0, 0, 0],
			[0, 0, c.MOVE, 0, 0],
			[0, 0, c.START, 0, 0],
			[0, c.MOVE, 0, c.MOVE, 0],
			[0, 0, 0, 0, 0]
		]
	},
	{
		school: 'ox',
		color: 'blue',
		player: c.RED,
		card: [
			[0, 0, 0, 0, 0],
			[0, 0, c.MOVE, 0, 0],
			[0, c.MOVE, c.START, c.MOVE, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0]
		]
	},
	{
		school: 'cobra',
		color: 'green',
		player: c.RED,
		card: [
			[0, 0, 0, 0, 0],
			[0, c.MOVE, 0, c.MOVE, 0],
			[0, 0, c.START, 0, 0],
			[0, 0, c.MOVE, 0, 0],
			[0, 0, 0, 0, 0]
		]
	},
	{
		school: 'horse',
		color: 'green',
		player: c.RED,
		card: [
			[0, 0, 0, 0, 0],
			[0, c.MOVE, 0, c.MOVE, 0],
			[0, 0, c.START, 0, 0],
			[0, 0, c.MOVE, 0, 0],
			[0, 0, 0, 0, 0]
		]
	},
	{
		school: 'eel',
		color: 'red',
		player: c.RED,
		card: [
			[0, 0, 0, 0, 0],
			[0, c.MOVE, 0, c.MOVE, 0],
			[0, 0, c.START, 0, 0],
			[0, 0, c.MOVE, 0, 0],
			[0, 0, 0, 0, 0]
		]
	}
];
