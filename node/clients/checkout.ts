import { InstanceOptions, IOContext, RequestTracingConfig } from '@vtex/api'

import { createTracing } from '../utils/tracing'
import VtexCommerce from './vtexCommerce'

const CHECKOUT_ENDPOINT = 'pvt/configuration/orderForm'

export class Checkout extends VtexCommerce {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, 'checkout', {
      ...options,
      headers: {
        ...(ctx.adminUserAuthToken
          ? {
              VtexIdclientAutCookie: ctx.adminUserAuthToken,
            }
          : {}),
      },
    })
  }

  public getOrderFormConfiguration(tracingConfig?: RequestTracingConfig) {
    const metric = 'checkout-getOrderForm'
    return this.http.get<OrderFormConfiguration>(CHECKOUT_ENDPOINT, {
      metric,
      tracing: createTracing(metric, tracingConfig),
    })
  }

  public setOrderFormConfiguration(
    body: OrderFormConfiguration,
    userToken: string,
    tracingConfig?: RequestTracingConfig
  ) {
    const metric = 'checkout-setOrderForm'
    return this.http.post(CHECKOUT_ENDPOINT, body, {
      headers: {
        VtexIdclientAutCookie: userToken,
      },
      metric,
      tracing: createTracing(metric, tracingConfig),
    })
  }
}
