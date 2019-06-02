import response from './responses';

const applyPagination = (req, res, next) => {
  const { page: pageQuery = 0, pageSize: pageSizeQuery = 5 } = req.query;

  const page = parseInt(pageQuery, 10);
  const pageSize = parseInt(pageSizeQuery, 10);

  if (pageQuery && pageSizeQuery) {
    if (!page || page < 0) {
      return response.badRequest(res, {
        issue: 'queryParram',
        message: 'page must be a valid number greater than 0',
      });
    }

    if (!pageSize || pageSize < 0) {
      return response.badRequest(res, {
        issue: 'queryParram',
        message: 'if pageSize is provided it must be a number greater than 0',
      });
    }

    if (pageSize > 25) {
      return response.badRequest(res, {
        issue: 'queryParram',
        message: 'pageSize must be less than 25',
      });
    }

    const offset = Math.abs(pageSize * (page > 0 ? page - 1 : page));
    const limit = Math.abs(offset + pageSize);

    res.locals.applyPagination = () => ({
      offset,
      limit,
    });

    res.locals.paginationData = {
      page,
      pageSize,
    };

    return next();
  }

  res.locals.applyPagination = () => ({
    offset: 0,
    limit: 5,
  });
  res.locals.paginationData = {
    page: 1,
    pageSize: 5,
  };

  return next();
};

export default applyPagination;
