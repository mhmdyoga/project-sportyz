import axiosClient from "axios";

const baseApi = axiosClient.create({
  baseURL: "http://localhost:1337",
});
  // get category List
  const getCategory = () => baseApi.get("/api/categories?populate=*");
  // get Products List
  const getAllProducts = () => baseApi.get("/api/products?pagination[start]=0&pagination[limit]=8&populate[image][fields][0]=url&populate[Brands][fields][0]=name");
  // get Product shopPage
  const getProduct = () => baseApi.get("/api/products?populate=*");
  // POST CART
  const postCart = (data: any,token: string) => baseApi.post("/api/carts", data, {
      headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  // remove
  

  


  const BaseApi = {
  getCategory,
  getAllProducts,
  getProduct,
  postCart
};

export default BaseApi;

