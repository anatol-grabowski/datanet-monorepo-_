import { Module } from 'perfect-di'
import { MongodbService } from './services/connection.service'

export const MongodbModule: Module = {
  providers: {
    config: {
      importFrom: null,
    },
    mongodbSvc: {
      dependencies: ['config'],
      doExport: true,
      init: async (config) => {
        const mongoSvc = new MongodbService()
        await mongoSvc.connect(config.mongodbUrl)
        return mongoSvc
      },
    },
  },
}
