import { json } from 'co-body'

import { parseProviderToVtex } from '../parsers/providerToVtex'
import { parseVtexToProvider } from '../parsers/vtexToProvider'
// import { getInfoBySku } from '../utils/producstInformation'

/*
This handler is responsible for receiving the request from the checkout,
which has an specific format; this request is going to be parsed to have
the format that is expected on the provider side. After that, it will call
the method that uses the provider API. It will give a response with the
taxes information. With that, it's necessary to parse it again to the
format that VTEX expects and this will be assigned to the body
*/
export async function taxSimulation(
  ctx: Context,
  next: () => Promise<unknown>
) {
  const body: CheckoutRequest = await json(ctx.req)

  const {
    vtex: { workspace, account },
    clients: { taxProvider },
  } = ctx

  // Example of using Catalog Client to retrieve SKU information by ID
  // const productItems = await getInfoBySku(ctx, body)

  const orderInformation = parseVtexToProvider(body)

  // Client that will retrieve the tax information from the provider's API
  const payload = taxProvider.getTaxInformation(orderInformation)

  // Parsing the tax information that was retrieved to the correct format
  const expectedResponse = parseProviderToVtex(payload)

  // Mounting the response body
  ctx.body = {
    hooks: [
      {
        major: 1,
        url: `https://${workspace}--${account}.myvtex.com/app/tax-provider/oms/invoice`,
      },
    ],
    itemTaxResponse: expectedResponse,
  }

  // Necessary so the Checkout can understand body's format
  ctx.set('Content-Type', 'application/vnd.vtex.checkout.minicart.v1+json')

  await next()
}
