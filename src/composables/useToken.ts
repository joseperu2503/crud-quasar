import { getCookie, removeCookie, setCookie } from 'typescript-cookie'
import jwt_decode from 'jwt-decode'
import type { JwtPayload } from 'jwt-decode'

interface JwtResponse extends JwtPayload {

}

export function useToken() {

  const saveToken = (token: string) => {
    setCookie('token', token, { expires: 365, path: '/' })
  }

  const getToken = () => {
    const token = getCookie('token')
    return token
  }

  const removeToken = () => {
    removeCookie('token')
  }

  const validToken = () => {
    const decodedToken = decodeToken()
    if (!decodedToken) {
      return false
    }

    if (decodedToken && decodedToken?.exp) {
      const tokenDate = new Date(0)
      tokenDate.setUTCSeconds(decodedToken.exp)
      const today = new Date()
      return tokenDate.getTime() > today.getTime()
    }
    return false
  }

  const decodeToken = () => {
    const token = getToken()
    if (!token) {
      return null
    }
    const decodedToken = jwt_decode<JwtResponse>(token)
    return decodedToken
  }

  return {
    saveToken,
    getToken,
    removeToken,
    validToken,
    decodeToken
  }
}
