import BaseController from './BaseController';
import App from '../structures/App';
import { Request, Response } from 'express';

export default class QueueController extends BaseController {
	public constructor(app: App) {
		super('/queue', app);
	}

	public init(): void {
		this.router.get('/:id', this._renderQueue.bind(this));
		this.router.post('/', this._makeQueue.bind(this));
	}

	private async _renderQueue(req: Request, res: Response): Promise<Response | void> {}

	private async _makeQueue(req: Request, res: Response): Promise<Response | void> {}
}
