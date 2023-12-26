import { createServer } from 'miragejs'
import { PRODUCTS } from './data'

export function initMirageServer() {
  createServer({
    routes() {
      this.get('/api/products', () => PRODUCTS)
    },
  })
}
