import express, { Application, NextFunction } from "express";
import { createServer, Server as HttpServer } from "http";

export interface ServerConfig {
	port?: number | string;
	middlewares?: NextFunction[];
}

export class Server {
	public app: Application = express();
	public httpServer: HttpServer;
	public PORT: string | number;

	constructor({ port, middlewares }: ServerConfig) {
		this.PORT = port || 3000;
		this.httpServer = createServer(this.app);
		this.use(middlewares);
	}

	start() {
		this.httpServer.listen(this.PORT, () => {
			console.log("[✔ ] App back virtualWatchStore is running", this.PORT);
		});
	}

	useMiddlewares(middlewares: any[]) {
		middlewares.forEach((middleware: any) => {
			this.app.use(middleware);
		});
	}

	use(...args: any) {
		this.app.use(...args);
	}
}
