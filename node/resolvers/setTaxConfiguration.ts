import { AuthenticationError, UserInputError } from '@vtex/api'

import { activateProvider, deactivateProvider } from '../utils/settings'

export async function setTaxConfiguration(
  _: unknown,
  { operation }: SettingsInput,
  ctx: Context
) {
  /*
    This resolver is responsible for activating or deactivating the
    tax service on the order form configuration by using GraphQL
  */

  const {
    clients: { checkout },
    vtex: { account, adminUserAuthToken: userToken, workspace },
  } = ctx

  if (!userToken) {
    throw new AuthenticationError('No authorization provided')
  }

  const orderForm = await checkout.getOrderFormConfiguration()

  if (operation === 'activate') {
    const body = await activateProvider(
      orderForm,
      checkout,
      account,
      workspace,
      userToken
    )
    return body
  }
  if (operation === 'deactivate') {
    const body = await deactivateProvider(orderForm, checkout, userToken)
    return body
  }
  throw new UserInputError(
    "operation must be either 'activate' or 'deactivate'"
  )
}

interface SettingsInput {
  operation: string
}
