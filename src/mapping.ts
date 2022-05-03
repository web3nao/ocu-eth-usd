import {
  LogMedianPrice as LogMedianPriceEvent,
  LogNote as LogNoteEvent
} from "../generated/OCU-ETH-USD/OCU-ETH-USD"
import { LogMedianPrice, LogNote } from "../generated/schema"

export function handleLogMedianPrice(event: LogMedianPriceEvent): void {
  let entity = new LogMedianPrice(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.val = event.params.val
  entity.age = event.params.age
  entity.save()
}

export function handleLogNote(event: LogNoteEvent): void {
  let entity = new LogNote(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.sig = event.params.sig
  entity.usr = event.params.usr
  entity.arg1 = event.params.arg1
  entity.arg2 = event.params.arg2
  entity.data = event.params.data
  entity.save()
}
