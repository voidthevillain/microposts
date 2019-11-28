/**
 * EasyHTTP Library
 * Library for making HTTP requests.
 *
 * @version 3.0.0
 * @author Mihai Filip (voidthevillain)
 * @license MIT
 */

class EasyHTTP {
  // HTTP GET REQUEST
  async get(url) {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })

    const resData = await response.json()

    return resData
  }

  // HTTP POST REQUEST
  async post(url, data) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const resData = await response.json()

    return resData
  }

  // HTTP PUT REQUEST
  async put(url, data) {
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    const resData = await response.json()

    return resData
  }

  // HTTP DELETE REQUEST
  async delete(url) {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      }
    })

    const resData = await 'Resource deleted.'

    return resData
  }
}

export const http = new EasyHTTP()