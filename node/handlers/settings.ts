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
  const {
    clients: { checkout },
    params: { operation },
    vtex: { account, logger },
  } = ctx

  const orderForm = await checkout.getOrderForm()

  if (operation === 'activate') {
    try {
      await activateProvider(orderForm, checkout, account)
    } catch (e) {
      logger.error(e)
      ctx.status = 304
    }
  } else if (operation === 'deactivate') {
    try {
      deactivateProvider(orderForm, checkout)
    } catch (e) {
      logger.error(e)
      ctx.status = 304
    }
  } else {
    ctx.status = 202
  }
  ctx.status = 200
}
