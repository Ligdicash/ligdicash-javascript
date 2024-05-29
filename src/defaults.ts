import { PlatformType } from "./types/globals";

/*
 * Définition de l'url de test et de live
 */
const CONF_BASE_URL: Record<PlatformType, string> = {
  test: "https://test.ligdicash.com/pay/v01/",
  live: "https://app.ligdicash.com/pay/v01/",
};

/**
 * Retourne l'URL de base de la plateforme en fonction de son nom.
 *
 * @param {PlatformType} name - Le nom de la plateforme ("test" ou "live").
 * @returns {string | null} - L'URL de base correspondante, ou None si le nom de la plateforme est invalide.
 *
 * @example
 * >>> getPlatformUrl("test")
 * "https://test.ligdicash.com/pay/v01/"
 * >>> getPlatformUrl("invalide")
 * null
 */
export function getPlatformUrl(name: PlatformType): string {
  return CONF_BASE_URL[name];
}
