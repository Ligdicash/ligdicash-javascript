import { HTTPProvider } from "./providers";
import { ApiConfig } from "./types/globals";
import { StatusResponseType } from "./types/responses";

/**
 * function to retrieve a transaction by token
 *
 * @param {string} token - Token de la transaction.
 * @returns {StatusResponseType} - La transaction correspondante.
 */
export async function getTransaction(
  config: ApiConfig,
  token: string,
  type: "payin" | "payout" = "payin"
): Promise<StatusResponseType> {
  const provider = new HTTPProvider(config);
  let response = await provider.get(
    type === "payin"
      ? `redirect/checkout-invoice/confirm/?invoiceToken=${token}`
      : `withdrawal/confirm/?withdrawalToken=${token}`,
    "status"
  );
  return response as StatusResponseType;
}
