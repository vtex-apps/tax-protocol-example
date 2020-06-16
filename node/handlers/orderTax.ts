import { json } from 'co-body'

import { parseProviderToVtex } from '../parsers/providerToVtex'
import { parseVtexToProvider } from '../parsers/vtexToProvider'

export const orderTax = async (ctx: Context) => {
  const body = await json(ctx.req)

  const {
    clients: { taxProvider },
  } = ctx

  const orderInformation = parseVtexToProvider(body)

  // Client that will retrieve the tax information from the provider's API
  const payload = taxProvider.getTaxInformation(orderInformation)

  // Parsing the tax information that was retrieved to the correct format
  ctx.body = parseProviderToVtex(payload)
  ctx.status = 200
}
