export const parseVtexToProvider = (checkoutRequest: CheckoutRequest) => {
  // Parse here the checkout request to the expected format
  return checkoutRequest
}

interface CheckoutRequest {
  orderFormId: string
  salesChannel: string
  items: Item[]
  clientEmail: string
  clientData: Client
  shippingDestination: ShippingInformation
  totals: Total[]
  paymentData: Payment[]
}

interface Item {
  id: string
  sku: string
  ean: string
  refId: string
  unitMultiplier: number
  measurementUnit: string
  targetPrice: number
  itemPrice: number
  quantity: number
  discountPrice: number | null
  dockId: string
  freightPrice: number
  brandId: string
}

interface Client {
  email: string
}

interface Total {
  id: string
  name: string
  value: number
}

interface Payment {
  paumentSystem: string
  bin: string
  referenceValue: number
  value: number
  installments?: number
}

interface ShippingInformation {
  country: string
  state: string
  city: string
  neighborhood: string
  street: string
  postalCode: string
}
