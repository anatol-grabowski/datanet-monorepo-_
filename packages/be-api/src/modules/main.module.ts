import { Module } from 'perfect-di'

import { ApiModule } from './api'
import { ConfigModule } from './config'
import { GraphModule } from './graph'
import { UploadModule } from './upload'
import { UserModule } from './user'

export const MainModule: Module = {
  providers: {
    apiService: { importFrom: 'Api' },
    config: { importFrom: 'Config' },
    graphCtl: { importFrom: 'Graph' },
    routers: {
      dependencies: ['graphCtl', 'uploadCtl'],
      init: (graphCtl, uploadCtl) => [graphCtl.router, uploadCtl.router],
    },
    uploadCtl: { importFrom: 'Upload' },
    userRepo: { importFrom: 'User' },
  },
  submodules: {
    Api: { module: ApiModule },
    Config: { module: ConfigModule },
    Graph: { module: GraphModule },
    Upload: { module: UploadModule },
    User: { module: UserModule },
  },
}
