import {
  AmountOutOfRangeError,
  ApiError,
  ApplicationAuthenticationError,
  AuthenticationError,
  CustomerDoesNotExistError,
  DataInputError,
  InvalidAmountError,
  InvalidHashError,
  InvalidMethodError,
  InvoiceNotFoundError,
  IpDeniedError,
  MerchantAccountDoesNotExistError,
  MerchantBalanceLowError,
  MerchantPayinDisabledError,
  MerchantPayoutDisabledError,
  NoDeposit3MError,
  NoHashError,
  NoNetworkAccessConfigurationError,
  NoPendProcPayout24HError,
  ProcessingError,
  RecipientOperatorNotIdentifiedError,
  SendingError,
  TransactionAlreadyExistError,
  UnauthorizedCurrencyConversionError,
  UnauthorizedMethodError,
} from "./errors";
import { FeatureType, LigdicashErrorType, PlatformType } from "./types/globals";

type Wiki_Type = Record<PlatformType, Record<string, LigdicashErrorType>>;

/**
 * Wiki des erreurs possibles pour le Payout Marchand en test ou en live.
 */
const PAYOUT_MARCHAND_WIKI: Wiki_Type = {
  test: {
    "00": AuthenticationError,
    "01": ApplicationAuthenticationError,
    "02": AmountOutOfRangeError,
    "03": MerchantAccountDoesNotExistError,
    "04": NoPendProcPayout24HError,
    "05": RecipientOperatorNotIdentifiedError,
    "06": MerchantAccountDoesNotExistError,
    "07": MerchantAccountDoesNotExistError,
    "08": MerchantBalanceLowError,
    "09": ProcessingError,
    "10": ApiError,
    "11": NoHashError,
    "12": InvalidHashError,
    "13": UnauthorizedCurrencyConversionError,
    "14": IpDeniedError,
  },
  live: {
    "00": AuthenticationError,
    "01": ApplicationAuthenticationError,
    "02": AmountOutOfRangeError,
    "03": MerchantAccountDoesNotExistError,
    "04": NoPendProcPayout24HError,
    "05": RecipientOperatorNotIdentifiedError,
    "06": MerchantAccountDoesNotExistError,
    "07": MerchantAccountDoesNotExistError,
    "08": MerchantBalanceLowError,
    "09": ProcessingError,
    "10": ApiError,
    "11": NoHashError,
    "12": InvalidHashError,
    "13": UnauthorizedCurrencyConversionError,
    "14": IpDeniedError,
  },
};

/**
 * Wiki des erreurs possibles pour le Payout Client en test ou en live.
 */
const PAYOUT_CLIENT_WIKI: Wiki_Type = {
  test: {
    "00": AuthenticationError,
    "01": MerchantPayoutDisabledError,
    "02": CustomerDoesNotExistError,
    "03": MerchantAccountDoesNotExistError,
    "03a": NoPendProcPayout24HError,
    "03b": NoDeposit3MError,
    "04": MerchantBalanceLowError,
    "05": AmountOutOfRangeError,
    "06": IpDeniedError,
    "07": TransactionAlreadyExistError,
    "08": ProcessingError,
    "09": DataInputError,
    "10": ApiError,
    "13": NoHashError,
    "14": InvalidHashError,
  },
  live: {
    "00": AuthenticationError,
    "01": MerchantPayoutDisabledError,
    "02": CustomerDoesNotExistError,
    "03": MerchantAccountDoesNotExistError,
    "03a": NoPendProcPayout24HError,
    "03b": NoDeposit3MError,
    "04": MerchantBalanceLowError,
    "05": AmountOutOfRangeError,
    "06": IpDeniedError,
    "07": TransactionAlreadyExistError,
    "08": ProcessingError,
    "09": DataInputError,
    "10": ApiError,
    "13": NoHashError,
    "14": InvalidHashError,
  },
};

/**
 * Wiki des erreurs possibles pour le Payin en test ou en live.
 */
const PAYIN_WIKI: Wiki_Type = {
  test: {
    "00": AuthenticationError,
    "01": ApplicationAuthenticationError,
    "02": InvalidAmountError,
    "03": IpDeniedError,
    "04": ProcessingError,
  },
  live: {
    "00": AuthenticationError,
    "01": MerchantPayinDisabledError,
    "02": InvalidAmountError,
    "03": IpDeniedError,
    "04": ProcessingError,
    "05": SendingError,
    "06": SendingError,
    "07": NoNetworkAccessConfigurationError,
    "08": DataInputError,
    "09": ApiError,
    "10": NoHashError,
    "11": InvalidHashError,
    "12": InvalidMethodError,
    "13": UnauthorizedMethodError,
  },
};

/**
 * Wiki des erreurs possibles pour le statut d'une transaction en test ou en live.
 */
const STATUS_WIKI: Wiki_Type = {
  test: {
    "00": AuthenticationError,
    "01": ApplicationAuthenticationError,
    "02": InvoiceNotFoundError,
    "03": ProcessingError,
  },
  live: {
    "00": AuthenticationError,
    "01": MerchantPayinDisabledError,
    "02": InvoiceNotFoundError,
    "03": ProcessingError,
    "04": DataInputError,
  },
};

/**
 * Définission des wiki Payin, Payout et Status.
 */
const WIKI: Record<FeatureType, Wiki_Type> = {
  payin: PAYIN_WIKI,
  client_payout: PAYOUT_CLIENT_WIKI,
  merchant_payout: PAYOUT_MARCHAND_WIKI,
  status: STATUS_WIKI,
};

/**
 * Fonction qui retourne L'erreur correspondant au nom de wiki et au code d'erreur donnés et à la plateforme actuelle.
 *
 * @param {string} wikiName - Nom du wiki.
 * @param {string} errorCode - Code d'erreur.
 * @returns {LigdicashErrorType} - Erreur correspondant.
 */
export function getWikiError(
  platform: PlatformType,
  wikiName: FeatureType,
  errorCode: string
): LigdicashErrorType {
  return WIKI?.[wikiName]?.[platform]?.[errorCode] || ApiError;
}
