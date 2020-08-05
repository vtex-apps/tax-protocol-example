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
    return activateProvider(orderForm, checkout, account, workspace, userToken)
  }
  if (operation === 'deactivate') {
    return deactivateProvider(orderForm, checkout, userToken)
  }
  throw new UserInputError(
    "operation must be either 'activate' or 'deactivate'"
  )
}

interface SettingsInput {
  operation: string
}
