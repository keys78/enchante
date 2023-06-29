// import { Request, Response, NextFunction } from 'express';
// import { getFromCache, setInCache } from '../redisCache';

// interface CacheOptions {
//   key: string;
//   expiresIn?: number;
// }

// export const cacheMiddleware = (options: CacheOptions) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { key, expiresIn } = options;

//       // Check if the data exists in the cache
//       const cachedData = await getFromCache(key);
//       if (cachedData) {
//         // If the data is in the cache, return it
//         res.status(200).json(cachedData);
//         return;
//       }

//       // If the data is not in the cache, execute the handler and cache the result
//       const result = await next();

//       // Store the result in the cache
//       await setInCache(key, result, expiresIn);

//       // Return the result to the client
//       res.status(200).json(result);
//     } catch (error) {
//       next(error);
//     }
//   };
// };

import { Request, Response, NextFunction } from 'express';
import { getFromCache, setInCache } from '../redisCache';

interface CacheOptions {
  key: string;
  expiresIn?: number;
}

export const cacheMiddleware = (options: CacheOptions) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { key, expiresIn } = options;

      // Check if the data exists in the cache
      const cachedData = await getFromCache(key);
      if (cachedData) {
        // If the data is in the cache, return it
        res.status(200).json(cachedData);
        return;
      }

      // If the data is not in the cache, execute the handler
      const result = await next();

      // Store the result in the cache
      await setInCache(key, result, expiresIn);

      // Return the result to the client
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
};
