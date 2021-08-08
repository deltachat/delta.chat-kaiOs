import { Context } from './mock/deltachat'

export const context = new Context()

import { DeltaChat } from 'dc_cmd_api/src/deltachat'

export const dc_core = new DeltaChat('ws://localhost:8080/api_ws')
