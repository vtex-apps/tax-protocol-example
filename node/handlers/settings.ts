import { UserInputError } from '@vtex/api'

import { Checkout } from '../clients/checkout'
import { AUTHORIZATION_CODE } from '../utils/constants'

const activateProvider = async (
  orderForm: OrderFormConfiguration,
  checkout: Checkout,
  account: string
) => {
  if (orderForm.taxConfiguration) {
    throw new UserInputError('Tax provider already configured')
  }
  return checkout.setOrderForm({
    ...orderForm,
    taxConfiguration: {
      allowExecutionAfterErrors: false,
      authorizationHeader: AUTHORIZATION_CODE,
      integratedAuthentication: false,
      url: `https://master--${account}.myvtex.com/app/tax-provider/checkout/order`,
    },
  })
}

const deactivateProvider = async (
  orderForm: OrderFormConfiguration,
  checkout: Checkout
) => {
  if (!orderForm.taxConfiguration) {
    throw new UserInputError('Tax provider is not configured')
  }
  return checkout.setOrderForm({
    ...orderForm,
    taxConfiguration: {
      allowExecutionAfterErrors: false,
      authorizationHeader: AUTHORIZATION_CODE,
      integratedAuthentication: false,
      url: null,
    },
  })
}

export const settings = async (ctx: Context) => {
  /*
    This handler is responsible for activating or deactivating the
    tax service on the order form configuration.
  */
  const {
    clients: { checkout },
    params: { operation },
    vtex: { account },
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
}
