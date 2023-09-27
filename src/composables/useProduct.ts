import { appApi } from '@/api/appApi'
import { ResponsePaginate } from '@/interfaces/responsePaginate.interface'
import { Product, ProductForm, ProductFormDataResponse, ProductOperationResponse } from '@/interfaces/product.interface'

export function useProduct() {

  const getProducts = async (page: number) => {
    try {
      const response = await appApi.get<ResponsePaginate<Product>>("/products", {
        params: {
          page: page
        }
      })

      return response.data
    } catch (error) {
      throw error;
    }
  }

  const getMyProducts = async (page: number) => {
    try {
      const response = await appApi.get<ResponsePaginate<Product>>("/my-products", {
        params: {
          page: page
        }
      })

      return response.data
    } catch (error) {
      throw error;
    }
  }

  const createProduct = async (form: ProductForm) => {
    try {
      const response = await appApi.post<ProductOperationResponse>(`/products`, form)
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }

  const getProduct = async (productId: number) => {
    try {
      const response = await appApi.get<Product>(`/products/${productId}`)
      return response.data
    } catch (error) {
      throw error;
    }
  }

  const updateProduct = async (productId: number, form: ProductForm) => {
    try {
      const response = await appApi.put<ProductOperationResponse>(`/products/${productId}`, form)
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }

  const deleteProduct = async (productId: number) => {
    try {
      let response = await appApi.delete<ProductOperationResponse>(`/products/${productId}`)
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }

  const getFormData = async () => {
    try {
      let response = await appApi.get<ProductFormDataResponse>(`/products/form-data`)
      return response.data;
    } catch (error: any) {
      throw error;
    }
  }

  return {
    getProduct,
    getMyProducts,
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    getFormData
  }
}
