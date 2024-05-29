import { HTTPProvider } from "./providers";
import { ApiConfig } from "./types/globals";
import { BaseResponseType } from "./types/responses";

export type WithdrawalSendParam =
  | ({
      type: "client"; // Indique si le montant doit d'abord passer par le portefeuille Ligdicash du client.
    } & {
      to_wallet?: boolean; // True si le montant reste dans le portefeuille Ligdicash du client. False si le montant est envoyé sur le compte mobile money du client.
      callback_url?: string; // URL de rappel pour recevoir des notifications sur le statut de la transaction.
      custom_data?: Record<string, any>; // Données personnalisées à envoyer avec la demande de retrait.
    })
  | ({
      type: "merchant"; // Indique si le montant doit être directement envoyé sur le compte mobile money du client.
    } & {
      callback_url?: string; // URL de rappel pour recevoir des notifications sur le statut de la transaction.
      custom_data?: Record<string, any>; // Données personnalisées à envoyer avec la demande de retrait.
    });

export class Withdrawal extends HTTPProvider {
  amount: number = 0;
  description: string = "";
  customer: string = "";

  constructor(
    config: ApiConfig,
    amount: number,
    description: string,
    customer: string
  ) {
    super(config);
    this.amount = amount;
    this.description = description;
    this.customer = customer;
  }

  /**
   * Envoie une demande de retrait d'argent.
   * @param {WithdrawalSendParam} param - Paramètres de la demande de retrait.
   * @returns {Promise<BaseResponseType>} La réponse de la requête.
   */
  async send(params: WithdrawalSendParam): Promise<BaseResponseType> {
    let commande = {
      amount: this.amount,
      description: this.description,
      customer: this.customer,
      custom_data: params.custom_data || {},
      callback_url: params.callback_url || "",
    };
    if (params.type === "client") {
      commande["to_ligdicash"] = params.to_wallet || false;
    }
    let payload = {
      commande: commande,
    };
    const response = await this.post<BaseResponseType>(
      params.type === "client" ? "withdrawal/create" : "straight/payout",
      payload,
      params.type === "client" ? "client_payout" : "merchant_payout"
    );
    return response;
  }
}
