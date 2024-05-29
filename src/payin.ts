import { InvalidOtpError } from "./errors";
import { HTTPProvider } from "./providers";
import { ApiConfig } from "./types/globals";
import { BaseResponseType } from "./types/responses";

export type InvoiceItemParam = {
  name: string;
  description: string | null;
  quantity: number;
  unit_price: number;
};

export type InvoiceParam = {
  currency: string | null;
  description: string | null;
  customer_firstname: string | null;
  customer_lastname: string | null;
  customer_email: string | null;
  store_name: string | null;
  store_website_url: string | null;
};

export type PayWithRedirectionParam = {
  cancel_url?: string; // L'URL de redirection en cas d'annulation du paiement.
  return_url?: string; // L'URL de redirection en cas de succès du paiement.
  callback_url?: string; // L'URL de rappel pour recevoir des notifications sur le statut de la transaction.
  custom_data?: Record<string, any>; // Données personnalisées à envoyer avec la demande de retrait.
};

export type PayWithoutRedirectionParam = {
  otp: string; // Le code à usage unique (OTP) fourni par le client pour confirmer le paiement.
  customer?: string; // Identifiant unique du client effectuant le paiement.
  cancel_url?: string; // L'URL de redirection en cas d'annulation du paiement.
  return_url?: string; // L'URL de redirection en cas de succès du paiement.
  callback_url?: string; // L'URL de rappel pour recevoir des notifications sur le statut de la transaction.
  custom_data?: Record<string, any>; // Données personnalisées à envoyer avec la demande de retrait.
};

/**
 * Représente un article dans une facture.
 * */
export class InvoiceItem {
  name: string;
  description: string = "";
  private _unit_price: number;
  private _quantity: number;
  private _total_price: number;

  constructor(item: InvoiceItemParam) {
    this.name = item.name;
    this.description = item?.description || "";
    this.quantity = item.quantity;
    this.unit_price = item.unit_price;
    this._total_price = item.unit_price * item.quantity;
  }

  get quantity(): number {
    return this._quantity;
  }

  set quantity(value: number) {
    this._quantity = value;
    this._total_price = this.unit_price * value;
  }

  get unit_price(): number {
    return this._unit_price;
  }

  set unit_price(value: number) {
    this._unit_price = value;
    this._total_price = this._quantity * value;
  }

  get total_price(): number {
    return this._total_price;
  }

  format(): Record<string, any> {
    return {
      name: this.name,
      description: this.description,
      quantity: this.quantity,
      unit_price: this.unit_price,
      total_price: this.total_price,
    };
  }
}

/**
 * Représente une facture.
 */
export class Invoice extends HTTPProvider {
  private _items: InvoiceItem[];
  currency: string = "xof";
  description: string = "";
  customer_firstname: string = "";
  customer_lastname: string = "";
  customer_email: string = "";
  store_name: string = "";
  store_website_url: string = "";
  external_id: string = "";
  otp: string = "";
  private _total_amount: number = 0;

  constructor(config: ApiConfig, invoice: InvoiceParam) {
    super(config);
    this.currency = invoice?.currency || "XOF";
    this.description = invoice?.description || "";
    this.customer_firstname = invoice?.customer_firstname || "";
    this.customer_lastname = invoice?.customer_lastname || "";
    this.customer_email = invoice?.customer_email || "";
    this.store_name = invoice?.store_name || "";
    this.store_website_url = invoice?.store_website_url || "";
    this._items = [];
  }

  get items(): InvoiceItem[] {
    return this._items;
  }

  get total_amount(): number {
    return this._total_amount;
  }

  /**
   * Met à jour le montant total de la facture en fonction des articles présents
   */
  setItemsTotalAmount() {
    this._total_amount = this._items.reduce(
      (acc, item) => acc + item.total_price,
      0
    );
  }

  /**
   * Ajoute un article à la facture.
   * @param {InvoiceItemParam} item - L'article à ajouter.
   */
  addItem(item: InvoiceItemParam) {
    this._items.push(new InvoiceItem(item));
    this.setItemsTotalAmount();
  }

  /**
   * Crée le format de facture attendu par l'API pour le payload.
   * @param {string} customer - Identifiant unique du client effectuant le paiement.
   * @returns {Record<string, any>} - Le format de facture attendu par l'API pour le payload.
   */
  formatInvoice(customer: string = ""): Record<string, any> {
    return {
      items: this._items.map((item) => item.format()),
      total_amount: this._total_amount,
      devise: this.currency,
      description: this.description,
      customer: customer || "",
      customer_firstname: this.customer_firstname,
      customer_lastname: this.customer_lastname,
      customer_email: this.customer_email,
      external_id: this.external_id,
      otp: this.otp,
    };
  }

  /**
   * Crée le format de payload attendu par l'API.
   * @param {string} customer - Identifiant unique du client effectuant le paiement.
   * @param {string} cancel_url - L'URL de redirection en cas d'annulation du paiement.
   * @param {string} return_url - L'URL de redirection en cas de succès du paiement.
   * @param {string} callback_url - L'URL de callback.
   * @param {Record<string, any>} custom_data - Données personnalisées à inclure dans la requête de paiement.
   */
  formatPayload(
    customer: string = "",
    cancel_url: string = "" || null,
    return_url: string = "" || null,
    callback_url: string = "",
    custom_data: Record<string, any> = {}
  ): Record<string, any> {
    let actions = {
      callback_url: callback_url,
    };
    if (cancel_url) {
      actions["cancel_url"] = cancel_url;
    }
    if (return_url) {
      actions["return_url"] = return_url;
    }
    return {
      commande: {
        invoice: this.formatInvoice(customer),
        store: {
          name: this.store_name,
          website_url: this.store_website_url,
        },
        actions,
        custom_data: custom_data,
      },
    };
  }

  /**
   * Génère un lien de paiement
   * @param {PayWithRedirectionParam} params
   * @returns {BaseResponseType} - Les données de réponse JSON.
   */
  async payWithRedirection({
    cancel_url = "",
    return_url = "",
    callback_url = "",
    custom_data = {},
  }: PayWithRedirectionParam): Promise<BaseResponseType> {
    let payload = this.formatPayload(
      null,
      cancel_url,
      return_url,
      callback_url,
      custom_data
    );
    let response = await this.post<BaseResponseType>(
      "redirect/checkout-invoice/create",
      payload,
      "payin"
    );
    return response;
  }

  /**
   * Effectue un paiement sans redirection.
   * @param {PayWithoutRedirectionParam} params
   * @returns {BaseResponseType} - Les données de réponse JSON.
   */
  async payWithoutRedirection({
    otp = "",
    customer = "",
    callback_url = "",
    custom_data = {},
  }: PayWithoutRedirectionParam): Promise<BaseResponseType> {
    this.otp = otp;
    let payload = this.formatPayload(
      customer,
      callback_url,
      null,
      null,
      custom_data
    );
    let response = await this.post<BaseResponseType>(
      "straight/checkout-invoice/create",
      payload,
      "payin"
    );
    return response;
  }
}
