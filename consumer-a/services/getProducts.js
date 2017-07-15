import 'fetch-everywhere';

export const fetchProductsData = async () =>
  fetch(`http://localhost:5000/products`, {
    headers: {
      Accept: 'application/json'
    }
  });
