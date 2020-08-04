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
  refId: string | null
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
  document: string
  corporateDocument: string | null
  stateInscription: string | null
}

interface Total {
  id: string
  name: string
  value: number
}

interface Payment {
  paumentSystem: string
  bin: string | null
  referenceValue: number
  value: number
  installments: number | null
}

interface ShippingInformation {
  country: string
  state: string
  city: string
  neighborhood: string
  street: string
  postalCode: string
}
