/**
 * Exception de base pour les erreurs liées à l'API Ligdicash.
 */
export abstract class LigdicashError extends Error {
  /**
   * Le code d'erreur associé à l'exception.
   */
  public code: string;

  /**
   * Constructeur de la classe LigdicashError.
   *
   * @param code Le code d'erreur associé à l'exception.
   * @param message Le message d'erreur associé à l'exception.
   */
  constructor(code: string, message: string) {
    super(message);
    this.code = code;
    this.name = message;
  }
}

/**
 * Classe d'erreur pour les erreurs d'authentification Ligdicash.
 */
export class AuthenticationError extends LigdicashError {
  constructor(code: string) {
    super(code, "[AuthenticationError]: api_key ou auth_token invalide");
  }
}

/**
 * Classe d'erreur pour les erreurs d'authentification d'application Ligdicash.
 */
export class ApplicationAuthenticationError extends LigdicashError {
  constructor(code: string) {
    super(
      code,
      "[ApplicationAuthenticationError]: Impossible d'authentifier votre application"
    );
  }
}

/**
 * Classe d'erreur pour les erreurs d'authentification d'application Ligdicash.
 */
export class RecipientOperatorNotIdentifiedError extends LigdicashError {
  constructor(code: string) {
    super(
      code,
      "[RecipientOperatorNotIdentified]: L'opérateur du destinataire n'a pas été identifié"
    );
  }
}

/**
 * Classe d'erreur si le solde du marchand est insuffisant.
 */
export class MerchantBalanceLowError extends LigdicashError {
  constructor(code: string) {
    super(code, "[MerchantBalanceLowError]: Solde Marchand insuffisant");
  }
}

/**
 * Classe d'erreur si le retrait est désactivé pour ce marchand.
 */
export class MerchantPayoutDisabledError extends LigdicashError {
  constructor(code: string) {
    super(
      code,
      "[MerchantPayoutDisabledError]: Payout désactivé pour ce marchand"
    );
  }
}

/**
 * Classe d'erreur si la fonctionnalité de paiement n'est pas activée pour ce marchand
 */
export class MerchantPayinDisabledError extends LigdicashError {
  constructor(code: string) {
    super(
      code,
      "[MerchantPayinDisabledError]: Payin non activé pour ce marchand"
    );
  }
}

/**
 * Classe d'erreur si le client n'est pas enregistré sur la plateforme.
 */
export class CustomerDoesNotExistError extends LigdicashError {
  constructor(code: string) {
    super(
      code,
      "[CustomerDoesNotExistError]: Client non enregistré sur la plateforme"
    );
  }
}

/**
 * Classe d'erreur si la transaction existe déjà.
 */
export class TransactionAlreadyExistError extends LigdicashError {
  constructor(code: string) {
    super(code, "[TransactionAlreadyExistError]: La transaction existe déjà");
  }
}

/**
 * Classe d'erreur si la transaction existe déjà.
 */
export class UnauthorizedCurrencyConversionError extends LigdicashError {
  constructor(code: string) {
    super(
      code,
      "[UnauthorizedCurrencyConversionError]: Conversion de devise non autorisée"
    );
  }
}

/**
 * Classe d'erreur si la facture n'a pas été trouvée.
 */
export class InvoiceNotFoundError extends LigdicashError {
  constructor(code: string) {
    super(code, "[InvoiceNotFoundError]: Facture introuvable");
  }
}

/**
 * Classe d'erreur si le montant est invalide. Il doit être compris entre 20 et 1 000 000.
 */
export class InvalidAmountError extends LigdicashError {
  constructor(code: string) {
    super(
      code,
      "[InvalidAmountError]: Montant invalide. Il doit être compris entre 20 et 1 000 000."
    );
  }
}

/**
 * Classe d'erreur si le Token est invalide.
 */
export class InvalidTokenError extends LigdicashError {
  constructor(code: string) {
    super(code, "[InvalidTokenError]: Token invalide");
  }
}

/**
 * Classe d'erreur si aucun compte marchand sur le réseau spécifié.
 */
export class MerchantAccountDoesNotExistError extends LigdicashError {
  constructor(code: string) {
    super(
      code,
      "[MerchantAccountDoesNotExistError]: Aucun compte marchand sur le réseau spécifié"
    );
  }
}

/**
 * Classe d'erreur si aucun paiement en attente ou traité au cours des dernières 24 heures.
 */
export class NoPendProcPayout24HError extends LigdicashError {
  constructor(code: string) {
    super(
      code,
      "[NoPendProcPayout24HError]: Aucun paiement en attente ou traité au cours des dernières 24 heures"
    );
  }
}

/**
 * Classe d'erreur si aucun paiement en attente ou traité au cours des 3 derniers mois.
 */
export class NoDeposit3MError extends LigdicashError {
  constructor(code: string) {
    super(
      code,
      "[NoDeposit3MError]: Aucun paiement en attente ou traité au cours des 3 derniers mois"
    );
  }
}

/**
 * Classe d'erreur si aucun dépôt au cours des dernières 24 heures.
 */
export class NoDeposit24HError extends LigdicashError {
  constructor(code: string) {
    super(
      code,
      "[NoDeposit24HError]: Aucun dépôt au cours des dernières 24 heures."
    );
  }
}

/**
 * Classe d'erreur si le montant demandé est hors de l'interval [20;1000000].
 */
export class AmountOutOfRangeError extends LigdicashError {
  constructor(code: string) {
    super(
      code,
      "Le montant demandé est en dehors de l'intervalle [20;1000000]."
    );
  }
}

/**
 * Classe d'erreur si l'adresse IP est refusée.
 */
export class IpDeniedError extends LigdicashError {
  constructor(code: string) {
    super(code, "[IpDeniedError]: Adresse IP refusée.");
  }
}

/**
 * Classe d'erreur si une erreur s'est produite pendant le traitement.
 */
export class ProcessingError extends LigdicashError {
  constructor(code: string) {
    super(
      code,
      "[ProcessingError]: Une erreur s'est produite pendant le traitement."
    );
  }
}

/**
 * Classe d'erreur si une erreur s'est produite lors de l'envoi.
 */
export class SendingError extends LigdicashError {
  constructor(code: string) {
    super(code, "[SendingError]: Une erreur s'est produite pendant l'envoi.");
  }
}

/**
 * Classe d'erreur s'il y'a une erreur de saisie de données.
 */
export class DataInputError extends LigdicashError {
  constructor(code: string) {
    super(code, "[DataInputError]: Données incorrectes.");
  }
}

/**
 * Classe d'erreur s'il y'a une erreur d'API.
 */
export class ApiError extends LigdicashError {
  constructor(code: string) {
    super(code, "[ApiError]: Erreur d'API.");
  }
}

/**
 * Classe d'erreur si aucun hash n'a été fourni.
 */
export class NoHashError extends LigdicashError {
  constructor(code: string) {
    super(code, "[NoHashError]: Aucun hash fourni.");
  }
}

/**
 * Classe d'erreur si le hash est invalide.
 */
export class InvalidHashError extends LigdicashError {
  constructor(code: string) {
    super(code, "[InvalidHashError]: Hash invalide.");
  }
}

/**
 * Classe d'erreur si aucun accès réseau n'est configuré.
 */
export class NoNetworkAccessConfigurationError extends LigdicashError {
  constructor(code: string) {
    super(
      code,
      "[NoNetworkAccessConfigurationError]: Aucun accès réseau configuré."
    );
  }
}

/**
 * Classe d'erreur si la méthode HTTP n'est pas autorisée.
 */
export class UnauthorizedMethodError extends LigdicashError {
  constructor(code: string) {
    super(code, "[UnauthorizedMethodError]: Methode non autorisée.");
  }
}

/**
 * Classe d'erreur si la méthode HTTP est invalide.
 */
export class InvalidMethodError extends LigdicashError {
  constructor(code: string) {
    super(code, "[InvalidMethodError]: Methode invalide.");
  }
}

/**
 * Classe d'erreur si la méthode HTTP est invalide.
 */
export class InvalidOtpError extends LigdicashError {
  constructor() {
    super("invalid_otp", "Code OTP invalide.");
  }
}

/**
 * Classe d'erreur si la fonctionnalité ne peut pas être utilisée sur la plateforme de test.
 */
export class FeatureNotTestableError extends LigdicashError {
  constructor(feature_name: string) {
    super(
      "featurenottestable",
      `Fonctionnalité de ${{
        feature_name,
      }} non accessible sur la plateforme test.`
    );
  }
}
