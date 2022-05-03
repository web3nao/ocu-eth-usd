import { Address, log } from "@graphprotocol/graph-ts";
import {
  Diss1Call,
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

// kiss & diss

function toggleWhitelistOne(
  address: string,
  type: string,
  kiss: boolean
): void {
  log.debug(
    "handling kiss call for one address | address: {}, type: {}, kiss: {}",
    [address, type, kiss === true ? "true" : "false"]
  );
  let whitelistEntry = Whitelist.load(address);
  if (!whitelistEntry) {
    log.debug("creating new whitelist entry", []);
    whitelistEntry = new Whitelist(address);
    whitelistEntry.type = type;
    whitelistEntry.kiss = kiss;
  } else {
    log.debug("updating existing whitelist entry", []);
    whitelistEntry.kiss = kiss;
  }
  whitelistEntry.save();
}

function handleKiss1(call: Kiss1Call, type: string): void {
  const whitelistAddress = call.inputs.a.toHexString();
  const whitelistType = type;
  toggleWhitelistOne(whitelistAddress, whitelistType, true);
}

function handleDiss1(call: Diss1Call, type: string): void {
  const whitelistAddress = call.inputs.a.toHexString();
  const whitelistType = type;
  toggleWhitelistOne(whitelistAddress, whitelistType, false);
}

export function handleKissEthUsd(call: Kiss1Call): void {
  handleKiss1(call, "ethusd");
}

export function handleKissBtcUsd(call: Kiss1Call): void {
  handleKiss1(call, "btcusd");
}

export function handleDissEthUsd(call: Diss1Call): void {
  handleDiss1(call, "ethusd");
}

export function handleDissBtcUsd(call: Diss1Call): void {
  handleDiss1(call, "btcusd");
}
