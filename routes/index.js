import { Router } from "express";
import userRouter from "./userRoute.js";

const apiRouter = Router()

const ourRoutes = [
    {
        path : `/user`,
        router : userRouter,
    },
]

ourRoutes.forEach((route) => {
    apiRouter.use(route.path, route.router);
});

export default apiRouter;