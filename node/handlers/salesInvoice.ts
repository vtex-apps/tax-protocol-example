export async function salesInvoice(ctx: Context, next: () => Promise<any>) {
  // This is where the order taxes are committed

  ctx.status = 200
  ctx.body = { message: 'Order taxes were commited' }

  await next()
}
