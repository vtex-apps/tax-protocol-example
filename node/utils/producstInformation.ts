export const getInfoBySku = async (ctx: Context, body: CheckoutRequest) => {
  const {
    clients: { catalog },
  } = ctx

  /*
  Function that uses Catalog client to retrieve SKU information by its ID.
  It can be used in cases of needing more information about the products, such
  as dimensions, weight and etc.
  */

  return Promise.all(body.items.map(({ sku }) => catalog.getSkuById(sku)))
}
