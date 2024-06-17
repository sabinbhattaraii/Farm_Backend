import { Router } from "express";

const apiRouter = Router()

const ourRoutes = [
    {
        path : ``,
        router : ,
    },
]

ourRoutes.forEach((route) => {
    apiRouter.use(route.path, route.router);
});

export default apiRouter;