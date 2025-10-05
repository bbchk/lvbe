import express from 'express';
import cors from 'cors'; // What is this for?

// import * as loggingMiddleware from '#src/middleware/logger.js'
// import { errorHandlingMiddleware } from './middleware/error_handling.js'
// import _Error from './utils/error.js'

import { categoryRoutes } from './routes/category.routes.js'
// import { productsRoutes } from './routes/product.routes.js'
// import { userRoutes } from './routes/user.routes.js'

// TODO: properly configure cors to let in only front-end
const app = express()
  .use(express.json())
  .use(cors())
  .use('/categories', categoryRoutes);
// .use('/products', productsRoutes)
// .use('/user', userRoutes)

// TODO: use it in other envs
// if (process.env.NODE_ENV === 'production') {
//   app.use(loggingMiddleware.infoLogger)
// }

// TODO: what's this for?
//no favicon
// app.use(function (req, res, next) {
//   if (req.originalUrl === '/favicon.ico') {
//     return res.status(204)
//   } else {
//     next()
//   }
// })

// app.all('*', (req, res, next) => {
// const err = new _Error(`Can't find ${req.originalUrl} on the server!`, 404)
// const err = new Error(`Can't find ${req.originalUrl} on the server!`, 404)
// next(err)
// })

// TODO: use it in other envs
// if (process.env.NODE_ENV === 'production') {
//   app.use(loggingMiddleware.errorLogger)
// }

// app.use(errorHandlingMiddleware)

export default app;
