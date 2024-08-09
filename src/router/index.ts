import Router from "./MainRouter";
import pingRouter from "./PongRouter";
import userRouter from "./UserRouter";
import watchRouter from "./WatchRouter";

const routers = new Router();

routers.registerRoute("/", pingRouter);
routers.registerRoute("/users", userRouter);
routers.registerRoute("/watchs", watchRouter);

export default routers;
