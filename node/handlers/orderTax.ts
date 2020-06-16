import { json } from 'co-body'

import { parseProviderToVtex } from '../parsers/providerToVtex'
import { parseVtexToProvider } from '../parsers/vtexToProvider'

/*
This handler is responsible for receiving the request from the checkout,
which has an specific format; this request is going to be parsed to have
the format that is expected on the provider side. After that, it will call
the method that uses the provider API. It will give a response with the
taxes information. With that, it's necessary to parse it again to the
format that VTEX expects and this will be assigned to the body
*/
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
