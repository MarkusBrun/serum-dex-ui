
import { BonfidaTrade } from './types';

const baseUrl = 'https://api.dexlab.space'
export default class BonfidaApi {
  static URL = `${baseUrl}/`

  static async get(path: string) {
    try {
      const response = await fetch(this.URL + path)
      if (response.ok) {
        const responseJson = await response.json()
        return responseJson.success
          ? responseJson.data
          : responseJson
          ? responseJson
          : null
      }
    } catch (err) {
      console.log(`Error fetching from Chart API ${path}: ${err}`)
    }
    return null
  }

  static async getRecentTrades(
    marketAddress: string
  ): Promise<BonfidaTrade[] | null> {
    return BonfidaApi.get(`v1/trades/${marketAddress}`)
  }

  static async getOhlcv(
    symbol: string,
    resolution: string,
    from: number,
    to: number
  ): Promise<BonfidaTrade[] | null> {
    return BonfidaApi.get(
      `/history?symbol=${symbol}&resolution=${resolution}&from=${from}&to=${to}`
    )
  }
}

export const BONFIDA_DATA_FEED = `https://tv-api.dexlab.space/v1`