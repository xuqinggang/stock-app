import { formatResponse, getStockSymbol } from "@api/utils";
import { DIMS_THRESHOLD, DIMS_INCLUDE } from "@shared/constant";
import { IDimensions } from "@api/types";

export const get = async () => {
  return formatResponse({
    dims_threshold_enums: DIMS_THRESHOLD,
    dims_include_enums: DIMS_INCLUDE,
  } as IDimensions);
};
