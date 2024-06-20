import { Router } from "express";
import userRouter from "./userRoute.js";
import aboutUsRouter from "./aboutRoute.js";
import inquiryRouter from "./inquiryRoute.js";
import contactRouter from "./contactRoute.js";

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
    {
        path : `/inquiry`,
        router : inquiryRouter,
    },
    {
        path : `/contact`,
        router : contactRouter,
    },
]

ourRoutes.forEach((route) => {
    apiRouter.use(route.path, route.router);
});

export default apiRouter;