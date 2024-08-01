import { Router as ExpressRouter, Request, Response, NextFunction } from "express";

class Router {
	private router: ExpressRouter;

	constructor() {
		this.router = ExpressRouter();
	}

	public registerRoute(path: string, routeHandler: ExpressRouter): void {
		this.router.use(path, routeHandler);
	}

	public getRouter(): ExpressRouter {
		return this.router;
	}
}

export default Router;
