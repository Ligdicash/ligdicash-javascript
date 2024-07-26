import { HTTPProvider } from "./providers";
import { ApiConfig } from "./types/globals";
import { StatusResponseType } from "./types/responses";

/**
 * function to retrieve a transaction by token
 *
 * @param {string} token - Token de la transaction.
 * @param {string} type - Type de transaction. Valeurs: payin, client_payout, merchant_payout
 * @returns {StatusResponseType} - La transaction correspondante.
 */
export async function getTransaction(
  config: ApiConfig,
  token: string,
  type: "payin" | "client_payout" | "merchant_payout" = "payin"
): Promise<StatusResponseType> {
  const provider = new HTTPProvider(config);
  let response = await provider.get(
    type === "payin"
      ? `redirect/checkout-invoice/confirm/?invoiceToken=${token}`
      : type === "client_payout"
      ? `withdrawal/confirm/?withdrawalToken=${token}`
      : `straight/payout/confirm/?payoutToken=${token}`,
    "status"
  );
  return response as StatusResponseType;
}
