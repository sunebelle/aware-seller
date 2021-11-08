import api from "../axios";
import { categoryActions } from "../store/category";

export const getAllOrders = () => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await api.get("/cart");
    dispatch(categoryActions.getOrders(data));
  } catch (error) {
    console.log(error);
  }
};
export const getAllCategories = () => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await api.get("/categories");
    dispatch(categoryActions.getCategories(data));
  } catch (error) {
    console.log(error);
  }
};

export const getAllSubCategories = (categoryId) => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await api.get(`/categories/${categoryId}`);
    dispatch(categoryActions.getSubCategories(data));
  } catch (error) {
    console.log(error);
  }
};
