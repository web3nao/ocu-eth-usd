import { Address, log } from "@graphprotocol/graph-ts";
import {
  Kiss1Call,
  LogMedianPrice as LogMedianPriceEvent,
} from "../generated/OCU_ETH_USD/OCU_ETH_USD";
import { LogMedianPrice, Whitelist } from "../generated/schema";

function handleLogMedianPrice(event: LogMedianPriceEvent, type: string): void {
  let entity = new LogMedianPrice(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  );
  entity.val = event.params.val;
  entity.age = event.params.age;
  entity.type = type;
  entity.save();
}

export function handleLogMedianPriceEthUsd(event: LogMedianPriceEvent): void {
  handleLogMedianPrice(event, "ethusd");
}

export function handleLogMedianPriceBtcUsd(event: LogMedianPriceEvent): void {
  handleLogMedianPrice(event, "btcusd");
}

//

function handleKiss(call: Kiss1Call, type: string): void {
  log.debug("handling kiss call", []);
  let entity = new Whitelist(
    call.transaction.hash.toHex() + "-" + call.block.number.toString()
  );
  const whitelistAddress = call.inputs.a.toHexString();
  const whitelistType = type;
  log.debug("handling kiss call address: {}, type: {}", [
    whitelistAddress,
    whitelistType,
  ]);

  entity.address = whitelistAddress;
  entity.type = whitelistType;
  entity.save();
}

export function handleKissEthUsd(call: Kiss1Call): void {
  handleKiss(call, "ethusd");
}

export function handleKissBtcUsd(call: Kiss1Call): void {
  handleKiss(call, "btcusd");
}
