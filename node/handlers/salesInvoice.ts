export const salesInvoice = async (ctx: Context) => {
  // This is where the order taxes are committed

  ctx.status = 200
  ctx.body = { message: 'Order taxes were commited' }
}
