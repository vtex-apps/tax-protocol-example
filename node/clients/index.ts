import { IOClients } from '@vtex/api'

import { Catalog } from './catalog'
import { Checkout } from './checkout'
import { Logistics } from './logistics'
import { TaxProvider } from './taxProvider'

export class Clients extends IOClients {
  public get checkout() {
    return this.getOrSet('checkout', Checkout)
  }

  public get logistics() {
    return this.getOrSet('logistics', Logistics)
  }

  public get catalog() {
    return this.getOrSet('catalog', Catalog)
  }

  public get taxProvider() {
    return this.getOrSet('taxProvider', TaxProvider)
  }
}
