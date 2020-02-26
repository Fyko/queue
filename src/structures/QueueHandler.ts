import { Collection } from '@discordjs/collection';
import SnowflakeUtil from './SnowflakeUtil';
import { Request , Response } from 'express';

export interface Queue {
	id: string;
	usersToPass: number;
}

export interface Session {
	queue: string;
	id: string;
	ip: string;
	userAgent: string;
	createdAt: Date;
}

export default class QueueHandler {
	public readonly queues: Collection<string, Queue> = new Collection();
	public readonly sessions: Collection<string, Session> = new Collection();
	public readonly snowflakeUtil: SnowflakeUtil = SnowflakeUtil;

	public createSession(req: Request, res: Response): void { 
		
	}
}
