import response from './responses';

const applyPagination = (req, res, next) => {
  const { page: pageQuery = 0, pageSize: pageSizeQuery = 5 } = req.query;

  const page = Math.abs(parseInt(pageQuery, 10));
  const pageSize = Math.abs(parseInt(pageSizeQuery, 10));

  if (page && pageSize) {
    if (pageSize > 25) {
      return response.badRequest(res, {
        issue: 'queryParram',
        message: 'pageSize must be less than 25',
      });
    }

    const offset = pageSize * (page > 0 ? page - 1 : page);
    const limit = offset + pageSize;

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
