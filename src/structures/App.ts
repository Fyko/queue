import express, { Application } from 'express';
import bodyparser from 'body-parser';
import { renderFile } from 'ejs';
import helmet from 'helmet';
import { join } from 'path';

export default class App {
	public readonly server: Application = express();

	protected readonly port: number;

	public constructor(port: number) {
		this.port = port;
	}

	private _initMiddleware(): this {
		const staticURL = join(process.cwd(), 'public');
		this.server
		.use(bodyparser.json())
		.use(helmet())
		.use(bodyparser.urlencoded({ extended: true }))
		.engine('html', renderFile)
		.use(helmet())
		.use(express.static(staticURL))
		.set('view engine', 'ejs')
		.set('views', join(process.cwd(), 'views'))
		.set('port', process.env.PORT || 3000);

		return this;
	}

	private _initControllers(): void {
		for (const Route of Controllers) {
			const controller = new Route(this);
			this.server.use(controller.path, controller.router);
		}
	}

	public init(): this {

	}
}