import { MainModule } from './modules/main.module'
import { initModule } from 'perfect-di'

async function start() {
  const mod = await initModule(MainModule, { doLog: true })
  console.log(mod)
}

exports.start = start
