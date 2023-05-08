import { StoreOptions } from '@/typings'

const state = {}

const store: StoreOptions<typeof state> = {
  state,
  _moduleName: 'moduleA'
}

export default store
