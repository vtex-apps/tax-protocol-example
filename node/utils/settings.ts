import { UserInputError } from '@vtex/api'

import { Checkout } from '../clients/checkout'
import { AUTHORIZATION_CODE } from './constants'
/**
 * This method does a POST request to the checkout API
 * so as to activate the tax configuration on a specific
 * account
 */
// eslint-disable-next-line max-params
export async function activateProvider(
  orderForm: OrderFormConfiguration,
  checkout: Checkout,
  account: string,
  workspace: string
) {
  if (orderForm.taxConfiguration) {
    throw new UserInputError('Tax provider already configured')
  }
  return checkout.setOrderFormConfiguration({
    ...orderForm,
    taxConfiguration: {
      allowExecutionAfterErrors: false,
      authorizationHeader: AUTHORIZATION_CODE,
      integratedAuthentication: false,
      url: `https://${workspace}--${account}.myvtex.com/app/tax-provider/checkout/simulation`,
    },
  })
}

export async function deactivateProvider(
  orderForm: OrderFormConfiguration,
  checkout: Checkout
) {
  if (!orderForm.taxConfiguration) {
    throw new UserInputError('Tax provider is not configured')
  }
  return checkout.setOrderFormConfiguration({
    ...orderForm,
    taxConfiguration: {
      allowExecutionAfterErrors: false,
      authorizationHeader: AUTHORIZATION_CODE,
      integratedAuthentication: false,
      url: null,
    },
  })
}
