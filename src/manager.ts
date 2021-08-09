import { Context } from './mock/deltachat'

export const context = new Context()

import { DeltaChat, Event } from 'dc_cmd_api/src/deltachat'

export const dc_core = new DeltaChat('ws://localhost:8080/api_ws')

function logEvent(logFn: (...args: any) => void) {
  return (event: Event) =>
    logFn(`[AC ${event.contextId}]`, event.field1, event.field2)
}

dc_core.on('WARNING', logEvent(console.warn))
dc_core.on('ERROR', logEvent(console.error))
dc_core.on('INFO', logEvent(console.info))
