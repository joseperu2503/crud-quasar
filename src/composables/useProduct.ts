import { useQuasar } from 'quasar'
import { appApi } from '@/api/appApi'
import { ResponsePaginate } from '@/interfaces/responsePaginate.interface'
import { Product, ProductForm, ProductOperationResponse } from '@/interfaces/product.interface'


export function useProduct() {
  const $q = useQuasar()

  const getProducts = async (page: number) => {
    try {
      const response = await appApi.get<ResponsePaginate<Product>>("/my-products", {
        params: {
          page: page
        }
      })

      return response.data
    } catch (error) {
      $q.notify({ type: 'negative', message: 'An error occurred while loading the products.' })
      throw error;
    }
  }

  const createProduct = async (form: ProductForm) => {
    try {
      const response = await appApi.post<ProductOperationResponse>(`/products`, form)
      $q.notify({ type: 'positive', message: response.data.message })
    } catch (error: any) {
      throw error;
    }
  }

  const getProduct = async (productId: number) => {
    try {
      const response = await appApi.get<Product>(`/products/${productId}`)
      return response.data
    } catch (error) {
      $q.notify({ type: 'negative', message: 'An error occurred. Please try again.' })
      throw error;
    }
  }

  const updateProduct = async (productId: number, form: ProductForm) => {
    try {
      const response = await appApi.put<ProductOperationResponse>(`/products/${productId}`, form)
      $q.notify({ type: 'positive', message: response.data.message })
    } catch (error: any) {
      throw error;
    }
  }

  const deleteProduct = async (id: number) => {
    try {
      let response = await appApi.delete<ProductOperationResponse>(`/products/${id}`)
      $q.notify({ type: 'positive', message: response.data.message })
    } catch (error: any) {
      $q.notify({ type: 'negative', message: 'An error occurred. Please try again.' })
      throw error;
    }
  }

  return {
    getProduct,
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct,
  }
}
