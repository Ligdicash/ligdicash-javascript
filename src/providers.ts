import fetch from "cross-fetch";
import { getPlatformUrl } from "./defaults";
import { ApiConfig, FeatureType, PlatformType } from "./types/globals";
import {
  InitialLigdicashResponseType,
  IsomorphicResponse,
  LigdicashResponseType,
} from "./types/responses";
import { getWikiError } from "./wiki";

/**
 * Classe de base abstraite pour les requêtes API.
 */
export abstract class Base {
  private apiKey: string;
  private authToken: string;
  baseUrl: string;
  platform: PlatformType;

  /**
   * Initialise une nouvelle instance de la classe Base.
   *
   * @param {Config} config - Configuration de l'API.
   */
  constructor(config?: ApiConfig) {
    this.apiKey = config.apiKey;
    this.authToken = config.authToken;
    this.platform = config.platform || "test";
    this.baseUrl = config.baseUrl || getPlatformUrl(config.platform);
  }

  /**
   * Construit l'URL complète à partir de l'URL de base et de l'URL relative.
   *
   * @param {string} url - L'URL relative.
   * @returns {string} - L'URL complète construite.
   */
  buildUrl(url: string): string {
    return this.baseUrl + url;
  }

  /**
   * Envoie une requête à l'API et renvoie les données de réponse JSON.
   *
   * @param {string} endpoint - L'endpoint de l'API à interroger.
   * @param {RequestInit} options - Options de la requête.
   * @returns Les données de réponse JSON.
   * @throws Erreur si la réponse de la requête n'est pas valide.
   */
  protected async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = this.buildUrl(endpoint);
    const headers = {
      Apikey: this.apiKey,
      Authorization: "Bearer " + this.authToken,
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    const config = {
      ...options,
      headers,
    };

    let response = await fetch(url, config);
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  }
}

/**
 * Une classe pour fournir une interface pour les requêtes HTTP à une API.
 */
export class HTTPProvider extends Base {
  /**
   * Récupère les données de réponse JSON si la réponse HTTP est OK. Sinon, lève une exception.
   *
   * @param {IsomorphicResponse} response - La réponse HTTP à traiter.
   * @param {FeatureType} feature - La fonctionnalité appelée.
   * @throws {LigdicashErrorType} - Si la réponse n'est pas OK, lève une exception personnalisée en fonction de l'erreur renvoyée.
   * @returns {Promise<LigdicashResponseType>} - Les données de réponse JSON.
   */
  async getDataOrRaiseError(
    response: InitialLigdicashResponseType,
    feature: FeatureType
  ): Promise<LigdicashResponseType> {
    const newResponse: LigdicashResponseType = response;
    const resCode: string = response.response_code;
    const resText: string = response.response_text;
    if (resCode == "00") {
      let initialCustomData = response.custom_data;
      if (initialCustomData && initialCustomData.length > 0) {
        let customData = initialCustomData.reduce((acc, cur) => {
          acc[cur.keyof_customdata] = cur.valueof_customdata;
          return acc;
        }, {});
        newResponse.custom_data = customData;
      }
      return newResponse;
    } else {
      let errorMatch = resText.match(/\d{2,3}[a-z]?/i);
      const errorCode = errorMatch ? errorMatch[0] : "";
      const error = getWikiError(this.platform, feature, errorCode);
      throw new error(errorCode);
    }
  }

  /**
   * Envoie une requête GET à l'API et récupère les données de la réponse.
   *
   * @param {string} url - L'URL à laquelle envoyer la requête.
   * @param {FeatureType} feature - La fonctionnalité appelée.
   * @throws {Error | LigdicashErrorType} - Si la réponse n'est pas OK, lève une exception personnalisée en fonction de l'erreur renvoyée.
   * @returns {Promise<LigdicashResponseType>} - Les données de réponse JSON.
   */
  async get<T>(url: string, feature: FeatureType): Promise<T> {
    var response = await this.request<InitialLigdicashResponseType>(url);
    var responseData = await this.getDataOrRaiseError(response, feature);
    return responseData as T;
  }

  /**
   * Envoie une requête POST à l'API et récupère les données de la réponse.
   *
   * @param {IsomorphicResponse} response - La réponse HTTP à traiter.
   * @param {Object} payload - Le corps de la requête HTTP.
   * @param {FeatureType} feature - La fonctionnalité appelée.
   * @throws {Error | LigdicashErrorType} - Si la réponse n'est pas OK, lève une exception personnalisée en fonction de l'erreur renvoyée.
   * @returns {Promise<LigdicashResponseType>} - Les données de réponse JSON.
   */
  async post<T>(
    url: string,
    payload: Object,
    feature: FeatureType
  ): Promise<T> {
    var response = await this.request<InitialLigdicashResponseType>(url, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    var responseData = await this.getDataOrRaiseError(response, feature);
    return responseData as T;
  }
}
