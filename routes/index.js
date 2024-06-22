import { Router } from "express";
import userRouter from "./userRoute.js";
import aboutUsRouter from "./aboutRoute.js";
import inquiryRouter from "./inquiryRoute.js";
import contactRouter from "./contactRoute.js";
import reviewRoute from "./reviewRoute.js";
import categoryRouter from "./categoryRoute.js";
import productRouter from "./productRoute.js";
import bookingRouter from "./bookingRoute.js";

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
    {
        path : `/review`,
        router : reviewRoute,
    },
    {
        path : `/category`,
        router : categoryRouter,
    },
    {
        path : `/product`,
        router : productRouter,
    },
    {
        path : `/booking`,
        router : bookingRouter,
    },
]

ourRoutes.forEach((route) => {
    apiRouter.use(route.path, route.router);
});

export default apiRouter;