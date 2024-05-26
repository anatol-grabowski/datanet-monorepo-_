import { Db, MongoClient } from 'mongodb'
import { parseOptions } from 'mongodb/lib/connection_string'

export class MongodbService {
  private url: string | null
  private client: MongoClient | null
  db: Db | null

  constructor() {
    this.url = null
    this.client = null
    this.db = null
  }

  async connect(url: string) {
    this.url = url
    this.client = await MongoClient.connect(url)
    const parsed = parseOptions(url) // for some reason .connect doesn't set default db?
    this.db = this.client.db(parsed.dbName)
  }
}
