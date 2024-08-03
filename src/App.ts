import * as express from "express";
import { Server } from "./server";
import cors from "cors";
import { environment } from "./../environment/environment";
import routers from "./router/index";

const middlewares: any[] = [
	express.urlencoded({ extended: false }),
	express.json(),
	cors(),
	function (req: any, res: any, next: any) {
		res.header("Access-Control-Allow-Origin", environment.ALLOWED_ORIGIN);
		res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, REDIRECT");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
		next();
	},
];

export class AppModule {
	constructor(private server: Server) {
		this.server = new Server({ port: environment.PORT, middlewares });
		this.route();
	}

	route() {
		this.use("/public", express.static("public"));
		this.use("/api", routers.getRouter());
	}

	bootstrap() {
		this.server.start();
	}

	use(...args: any): void {
		this.server.use(...args);
	}
}
