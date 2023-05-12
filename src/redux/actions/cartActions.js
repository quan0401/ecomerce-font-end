import * as actionTypes from "../constans/cartConstants";

import { getProductById } from "../../service/productService";

export const addToCart = (productId, quantity) => async (dispatch) => {
  const { _id, name, images, price, count } = await getProductById(productId);

  dispatch({
    type: actionTypes.ADD_TO_CART,
    payload: {
      productId: _id,
      name,
      images: images[0] ? images[0] : null,
      price,
      count,
      quantity,
    },
  });
};

// same
// export const addToCart = (productId, quantity) => ({
//   type: actionTypes.ADD_TO_CART,
//   someValue: 0,
// });
