import { getCookie, removeCookie, setCookie } from 'typescript-cookie'
import jwt_decode from 'jwt-decode'
import type { JwtPayload } from 'jwt-decode'

interface JwtResponse extends JwtPayload {
  name: string;
  id: number;
  email: string;
}

interface ValidToken {
  isValid: true;
  decodedToken: JwtResponse;
}

interface InvalidToken {
  isValid: false;
  decodedToken: null;
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

  const validateToken = (): ValidToken | InvalidToken => {

    const decodedToken = decodeToken()
    if (!decodedToken) {
      return {
        isValid: false,
        decodedToken: null
      }
    }

    if (decodedToken && decodedToken?.exp) {
      const tokenDate = new Date(0)
      tokenDate.setUTCSeconds(decodedToken.exp)
      const today = new Date()

      if (tokenDate.getTime() > today.getTime()) {
        return {
          isValid: true,
          decodedToken: decodedToken
        }
      }
    }
    return {
      isValid: false,
      decodedToken: null
    }
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
    validateToken,
    decodeToken
  }
}

