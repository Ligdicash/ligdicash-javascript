import {
  AuthenticationError,
  ApplicationAuthenticationError,
  MerchantBalanceLowError,
  MerchantPayoutDisabledError,
  MerchantPayinDisabledError,
  CustomerDoesNotExistError,
  TransactionAlreadyExistError,
  InvoiceNotFoundError,
  InvalidAmountError,
  InvalidTokenError,
  MerchantAccountDoesNotExistError,
  NoPendProcPayout24HError,
  NoDeposit24HError,
  AmountOutOfRangeError,
  IpDeniedError,
  ProcessingError,
  SendingError,
  DataInputError,
  ApiError,
  NoHashError,
  InvalidHashError,
  NoNetworkAccessConfigurationError,
  UnauthorizedMethodError,
  InvalidMethodError,
  FeatureNotTestableError,
} from "../../src/errors";

export type LigdicashErrorType =
  | typeof AuthenticationError
  | typeof ApplicationAuthenticationError
  | typeof MerchantBalanceLowError
  | typeof MerchantPayoutDisabledError
  | typeof MerchantPayinDisabledError
  | typeof CustomerDoesNotExistError
  | typeof TransactionAlreadyExistError
  | typeof InvoiceNotFoundError
  | typeof InvalidAmountError
  | typeof InvalidTokenError
  | typeof MerchantAccountDoesNotExistError
  | typeof NoPendProcPayout24HError
  | typeof NoDeposit24HError
  | typeof AmountOutOfRangeError
  | typeof IpDeniedError
  | typeof ProcessingError
  | typeof SendingError
  | typeof DataInputError
  | typeof ApiError
  | typeof NoHashError
  | typeof InvalidHashError
  | typeof NoNetworkAccessConfigurationError
  | typeof UnauthorizedMethodError
  | typeof InvalidMethodError
  | typeof FeatureNotTestableError;

export type PlatformType = "test" | "live";

export type FeatureType =
  | "payin"
  | "client_payout"
  | "merchant_payout"
  | "status";

export type ApiConfig = {
  apiKey: string;
  authToken: string;
  platform?: PlatformType;
  baseUrl?: string;
};
