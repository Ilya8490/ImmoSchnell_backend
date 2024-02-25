export const successHandler = (res, status, data) => {
    const response = {
      results: data.length,
      success: true,
      status,
      data,
    };
    res.status(status).json(response);
  };

  export const paginatedSuccessHandler = (res, status, data, numberOfItems) => {
    const response = {
      results: data.length,
      numberOfItems: numberOfItems,
      success: true,
      status,
      data,
     
    };
    res.status(status).json(response);
  };
  
 