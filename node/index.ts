import {
  ClientsConfig,
  ParamsContext,
  RecorderState,
  Service,
  ServiceContext,
} from '@vtex/api'

import { Clients } from './clients/index'
import { orderInvoice } from './handlers/orderInvoice'
import { settings } from './handlers/settings'
import { taxSimulation } from './handlers/taxSimulation'
import { validateCheckoutAuthorization } from './handlers/validateCheckoutAuthorization'

const TIMEOUT_MS = 800

// This is the configuration for clients available in `ctx.clients`.
const clients: ClientsConfig<Clients> = {
  // We pass our custom implementation of the clients bag, containing the Status client.
  implementation: Clients,
  options: {
    // All IO Clients will be initialized with these options, unless otherwise specified.
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
  },
}

declare global {
  // We declare a global Context type just to avoid re-writing ServiceContext<Clients, State> in every handler and resolver
  type Context = ServiceContext<Clients>
}

// It's possible to check the implementation of each handler in the handlers folder
export default new Service<Clients, RecorderState, ParamsContext>({
  clients,
  routes: {
    orderInvoice: [validateCheckoutAuthorization, orderInvoice],
    settings,
    taxSimulation: [validateCheckoutAuthorization, taxSimulation],
  },
})
