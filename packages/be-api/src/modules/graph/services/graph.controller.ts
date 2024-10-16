import * as asyncHandler from 'express-async-handler'
import * as express from 'express'

async function getUser(idToken?: string) {
  if (idToken == null) return null
  const { OAuth2Client } = require('google-auth-library')
  const CLIENT_ID = process.env.GOOGLE_AUTH_CLIENT_ID
  const client = new OAuth2Client(CLIENT_ID)
  const ticket = await client.verifyIdToken({
    audience: CLIENT_ID,
    idToken,
  })
  const payload = ticket.getPayload()
  return payload
}

export class GraphController {
  router?: express.Router

  constructor(private readonly mongo) {
    this.createRouter()
  }

  private createRouter() {
    const router = express.Router()

    router.get(
      '/:name',
      asyncHandler(async (req, res) => {
        const user = await getUser(req.headers.authorization?.split(' ')[1])
        const name = decodeURIComponent(req.params.name)
        const jsonGraph = await this.loadGraph(name, user?.sub)
        res.json({ graph: jsonGraph })
      }),
    )

    router.post(
      '/:name',
      asyncHandler(async (req, res) => {
        const user = await getUser(req.headers.authorization?.split(' ')[1])
        const name = decodeURIComponent(req.params.name)
        await this.saveGraph(name, req.body.graph, user?.sub)
        res.json({ saved: true })
      }),
    )

    const parentRouter = express.Router()
    parentRouter.use('/graph', router)
    this.router = parentRouter
  }

  private async loadGraph(name, userId: string) {
    const query = {
      $or: [{ isPublic: true }, { ownerId: userId }],
      name,
    }
    const doc = await this.mongo.db.collection('graphs').findOne(query)
    if (!doc) return { edges: [], nodes: [] }
    return doc.graph
  }

  private async saveGraph(name, graph, userId: string) {
    const query = {
      $or: [{ isPublic: true }, { ownerId: userId }],
      name,
    }
    const doc = {
      graph,
      isPublic: false,
      name,
      ownerId: userId,
    }
    await this.mongo.db.collection('graphs').replaceOne(query, doc, { upsert: true })
  }
}
