import { ForbiddenError } from '@vtex/api'

import { AUTHORIZATION_CODE } from '../utils/constants'

export const validateAuthorization = (ctx: Context) => {
  const {
    req: {
      headers: { authorization },
    },
  } = ctx

  if (!authorization || authorization !== AUTHORIZATION_CODE) {
    throw new ForbiddenError('Authorization token does not match')
  }
}
