import { Module } from 'perfect-di'
import { MongodbModule } from '../mongodb'
import { UserRepository } from './services/user.repository'

export const UserModule: Module = {
  providers: {
    config: { importFrom: null },
    mongodbSvc: { importFrom: 'Mongodb' },
    userRepo: {
      dependencies: ['mongodbSvc'],
      doExport: true,
      init: (mongodbSvc) => new UserRepository(mongodbSvc.db),
    },
  },
  submodules: {
    Mongodb: { module: MongodbModule },
  },
}
