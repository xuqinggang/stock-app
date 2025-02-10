import _ from "lodash-es";
import STOCKlIST from "@python/datas/stock-list.json";
import STOCKlISTHIST from "@python/datas/stock-list-hist.json";
import STOCKlISTINCOME from "@python/datas/stock-list-income.json";
import STOCKlISTMARKET from "@python/datas/stock-list-market.json";
import STOCKlISTPARTNER from "@python/datas/stock-list-partner.json";

console.log(
  "xxx",
  STOCKlIST.length,
  STOCKlISTHIST.length,
  STOCKlISTINCOME.length,
  STOCKlISTMARKET.length,
  STOCKlISTPARTNER.length
);

export function updateStockList() {
  // _.xorWith()
}
