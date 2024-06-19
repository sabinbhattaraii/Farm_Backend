import { Router } from "express";
import userRouter from "./userRoute.js";
import aboutUsRouter from "./aboutRoute.js";

const apiRouter = Router()

const ourRoutes = [
    {
        path : `/user`,
        router : userRouter,
    },
    {
        path : `/aboutus`,
        router : aboutUsRouter,
    },
]

ourRoutes.forEach((route) => {
    apiRouter.use(route.path, route.router);
});

export default apiRouter;