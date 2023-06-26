// export const paginateResults = async (model: mongoose.Model<any>, query: any, page: string | number, limit: string | number) => {
//     const parsedPage = parseInt(`${page}`, 10);
//     const parsedLimit = parseInt(`${limit}`, 10);
  
//     const totalResults = await model.countDocuments(query);
//     const totalPages = Math.ceil(totalResults / parsedLimit);
//     const skipCount = (parsedPage - 1) * parsedLimit;
  
//     const results = await model.find(query)
//       .skip(skipCount)
//       .limit(parsedLimit)
//       .exec();
  
//     return {
//       totalPages,
//       currentPage: parsedPage,
//       limit: parsedLimit,
//       totalResults,
//       results,
//     };
//   };


//   export const getAllProducts: RequestHandler = async (req, res, next) => {
//     try {
//       const page = req.query.page?.toString() || '1';
//       const limit = req.query.limit?.toString() || '10';
  
//       const paginatedResults = await paginateResults(ProductModel, {}, page, limit);
  
//       res.status(200).json(paginatedResults);
//     } catch (error) {
//       next(error);
//     }
//   };