import { json } from 'co-body'

export async function orderInvoice(ctx: Context, next: () => Promise<any>) {
  // This is where the order taxes are committed

  const body: OrderStatus = await json(ctx.req)

  const { status } = body

  if (status === 'invoiced') {
    /*
    This is where one can implement a logic that depends
    on the order having its status changed to invoiced.
     */
  }

  ctx.status = 200
  ctx.body = { message: 'Order taxes were commited' }

  await next()
}

interface OrderStatus {
  orderId: string
  status: string
}
