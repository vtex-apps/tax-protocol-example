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
      route: {
        params: { operation },
      },
    },
  } = ctx

  const orderForm = await checkout.getOrderForm()

  if (operation === 'activate') {
    await activateProvider(orderForm, checkout, account)
  } else if (operation === 'deactivate') {
    await deactivateProvider(orderForm, checkout)
  } else {
    ctx.status = 304
  }
  ctx.status = 200
  ctx.body = 'Tax configuration has been changed'
}
