import { AuthenticationError } from '@vtex/api'

export async function getTaxConfiguration(
  _: unknown,
  __: unknown,
  ctx: Context
) {
  /*
    This resolver is responsible for getting the Tax Configuration from the
    Order Form configuration and it can be use to check how it's configured.
    It uses GraphQL and the query can be made by GraphiQL, a route that is
    exposed when linking the app.
  */

  const {
    clients: { checkout },
    vtex: { adminUserAuthToken: userToken },
  } = ctx

  if (!userToken) {
    throw new AuthenticationError('No authorization provided')
  }

  const { taxConfiguration } = await checkout.getOrderFormConfiguration()

  return taxConfiguration
}
