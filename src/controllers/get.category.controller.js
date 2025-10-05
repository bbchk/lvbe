import * as service from '#root/services/index.js';
import { asyncErrorHandler } from '#root/utils/async_error_handler.js'

const all = asyncErrorHandler(async (req, res, next) => {
  const categories = await service.category.get.all();
  res.status(200).json(categories);
});

export default { all };

// import _Error from '#src/utils/error.js'

// export const getRootCategories = asyncErrorHandler(async (req, res, next) => {
//   const rootCategories = await categoryService.getRootCategories()
//
//   res.status(200).json(rootCategories)
// })
//
// export const getCategoryByPath = asyncErrorHandler(async (req, res, next) => {
//   const { path: slugPath } = req.params
//
//   const category = await categoryService.getCategoryBySlugPath(slugPath)
//
//   if (!category)
//     return next(new _Error(`Category with path ${slugPath} not found.`, 404))
//
//   res.status(200).json(category)
// })
//
// export const getDirectSubcategoriesByPath = asyncErrorHandler(
//   async (req, res, next) => {
//     const { path: slugPath } = req.params
//
//     const parentCategory = await categoryService.getCategoryBySlugPath(slugPath)
//
//     if (!parentCategory)
//       return next(new _Error(`Category with path ${slugPath} not found.`, 404))
//
//     const ONE_LEVEL_NESTED_DEEP = 1
//     const categories = await categoryService.getSubcategories(
//       parentCategory,
//       ONE_LEVEL_NESTED_DEEP,
//     )
//     res.status(200).json(categories)
//   },
// )
