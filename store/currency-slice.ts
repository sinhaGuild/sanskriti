export type CurrencyState = {
    currency: string
    exchangeRate: number | undefined | null
}

export type CurrencyActions = {
    setCurrency: (input: string) => void
    setExchangeRate: (input: number | null | undefined) => void
}

export type CurrencyStore = CurrencyState & CurrencyActions

export const initialCurrencyState: CurrencyState = {
    currency: "USD",
    exchangeRate: null,
}