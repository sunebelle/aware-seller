import api from "../axios";
export const createProduct = (formData) => async () => {
  try {
    const {
      data: { data },
    } = await api.post("/products", formData, {
      withCredentials: true,
      credentials: "include",
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
