import { AuthenticationError, UserInputError } from '@vtex/api'

import { activateProvider, deactivateProvider } from '../utils/settings'

export async function settings(ctx: Context) {
  /*
    This handler is responsible for activating or deactivating the
    tax service on the order form configuration.
  */

  const {
    clients: { checkout },
    vtex: {
      account,
      workspace,
      route: {
        params: { operation },
      },
    },
  } = ctx

  if (!ctx.headers.authorization) {
    throw new AuthenticationError(
      'You must provide a VtexIdclientAutCookie as Authorization header'
    )
  }
  const userToken = ctx.headers.authorization as string
  const orderForm = await checkout.getOrderFormConfiguration()

  if (operation === 'activate') {
    await activateProvider(orderForm, checkout, account, workspace, userToken)
  } else if (operation === 'deactivate') {
    await deactivateProvider(orderForm, checkout, userToken)
  } else {
    throw new UserInputError(
      "operation must be either 'activate' or 'deactivate'"
    )
  }
  ctx.status = 200
  ctx.body = 'Tax configuration has been changed'
}
