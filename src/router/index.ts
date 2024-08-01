import Router from "./MainRouter";
import pingRouter from "./PongRouter"
import userRouter from "./UserRouter";

const routers = new Router();
routers.registerRoute("/", pingRouter);
routers.registerRoute("/users", userRouter);


export default routers
