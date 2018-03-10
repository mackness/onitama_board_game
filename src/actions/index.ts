import GameActions from './gameActions';

export default class Actions {
	gameActions: any;
	constructor(store: any) {
		this.gameActions = new GameActions(store);
	}
}