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
  workspace: string,
  userToken: string
) {
  if (orderForm.taxConfiguration) {
    throw new UserInputError('Tax provider already configured')
  }

  const body = {
    ...orderForm,
    taxConfiguration: {
      allowExecutionAfterErrors: false,
      authorizationHeader: AUTHORIZATION_CODE,
      integratedAuthentication: false,
      url: `https://${workspace}--${account}.myvtex.com/app/tax-provider/checkout/simulation`,
    },
  }
  await checkout.setOrderFormConfiguration(body, userToken)

  return body
}

export async function deactivateProvider(
  orderForm: OrderFormConfiguration,
  checkout: Checkout,
  userToken: string
) {
  if (!orderForm.taxConfiguration) {
    throw new UserInputError('Tax provider is not configured')
  }

  const body = {
    ...orderForm,
    taxConfiguration: {
      allowExecutionAfterErrors: false,
      authorizationHeader: AUTHORIZATION_CODE,
      integratedAuthentication: false,
      url: null,
    },
  }
  await checkout.setOrderFormConfiguration(body, userToken)

  return body
}
