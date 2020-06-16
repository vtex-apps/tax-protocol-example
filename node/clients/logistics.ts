import { InstanceOptions, IOContext, RequestTracingConfig } from '@vtex/api'

import { createTracing } from '../utils/tracing'
import VtexCommerce from './vtexCommerce'

const routes = {
  docks: (dockId: string) => `pvt/configuration/docks/${dockId}`,
}

export class Logistics extends VtexCommerce {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, 'logistics', options)
  }

  public getDockById(dockId: string, tracingConfig?: RequestTracingConfig) {
    const metric = 'logistics-getDockById'
    return this.http.get(routes.docks(dockId), {
      metric,
      tracing: createTracing(metric, tracingConfig),
    })
    // olhar a api do logistics para ver o que tem no dockID
  }
}
