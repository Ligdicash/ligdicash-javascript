import { Invoice as Invoice_, InvoiceParam } from "./payin";
import { ApiConfig, PlatformType } from "./types/globals";
import { Withdrawal as Withdrawal_ } from "./payout";
import { getTransaction as getTransaction_ } from "./transaction";

export default class Ligdicash {
  apiKey: string;
  authToken: string;
  baseUrl: string;
  platform: PlatformType;

  constructor(config: ApiConfig) {
    this.apiKey = config.apiKey;
    this.authToken = config.authToken;
    this.platform = config.platform || "test";
    this.baseUrl = config.baseUrl;
  }

  Withdrawal(amount: number, description: string, customer: string) {
    return new Withdrawal_(
      {
        apiKey: this.apiKey,
        authToken: this.authToken,
        platform: this.platform,
        baseUrl: this.baseUrl,
      },
      amount,
      description,
      customer
    );
  }

  Invoice(invoice: InvoiceParam) {
    return new Invoice_(
      {
        apiKey: this.apiKey,
        authToken: this.authToken,
        platform: this.platform,
        baseUrl: this.baseUrl,
      },
      invoice
    );
  }

  getTransaction(
    token: string,
    type: "payin" | "client_payout" | "merchant_payout" = "payin"
  ) {
    return getTransaction_(
      {
        apiKey: this.apiKey,
        authToken: this.authToken,
        platform: this.platform,
        baseUrl: this.baseUrl,
      },
      token,
      type
    );
  }
}
