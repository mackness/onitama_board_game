
import { Map } from 'immutable';

export interface ImmutableMap<T> extends Map<string|number|any, any> {
	get<K extends keyof T>(name: K): T[K];
	set<K extends keyof T | never>(name: K, value: T[K]): ImmutableMap<T>;
}