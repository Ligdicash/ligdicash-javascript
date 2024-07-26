# Librairie Node.js LigdiCash

Ce projet est une librairie Node.js qui permet de manipuler l'API de LigdiCash.
Vous pourrez éffectuer des Payins, Payouts, des vérifications de transactions et des retraits.

Vous retrouverez la documentation de l'API de LigdiCash sur [https://developers.ligdicash.com/](https://developers.ligdicash.com/).

## Installation

```bash
npm install ligdicash
```

## Initialisation

L'initialisation de la librairie LigdiCash nécessite une clé API et un jeton d'authentification.
Vous pouvez obtenir ces informations en créant un projet API sur la plateforme LigdiCash.

```javascript
import Ligdicash from "ligdicash";

var client = new Ligdicash({
    apiKey: "REV...4I4O",
    authToken: "eyJ0eXAiOiJKV...BJuAY",
    platform: "live",
});
```

## Payin

Le Payin est une transaction qui permet à un client de payer pour un produit ou un service.
Il existe deux types de Payin : avec rédirection et sans rédirection.

### Remplir la facture

```javascript
// Décrire la facture et le client
let invoice = client.Invoice({
    currency: "xof",
    description: "Facture pour l'achat de vêtements sur MaSuperBoutique.com",
    customer_firstname: "Cheik",
    customer_lastname: "Cissé",
    customer_email: "cheikcisse@gmail.com",
    store_name: "MaSuperBoutique",
    store_website_url: "masuperboutique.com",
});

// Ajouter des articles à la facture
invoice.addItem({
    name: "Jogging Adidas noir",
    description: "__description_du_produit__",
    quantity: 3,
    unit_price: 3500,
});

invoice.addItem({
    name: "Veste Gucci motif serpent",
    description: "__description_du_produit__",
    quantity: 1,
    unit_price: 5000,
});

invoice.addItem({
    name: "TVA",
    description: "__description_du_produit__",
    quantity: 1,
    unit_price: 1000,
});
```

### Payin avec rédirection

Le Payin avec rédirection permet de rediriger le client vers une page de paiement sécurisée, conçue par LigdiCash.

```javascript
const response = await invoice.payWithRedirection({
    return_url: "https://masuperboutique.com/success",
    cancel_url: "https://masuperboutique.com/cancel",
    callback_url: "https://backend.masuperboutique.com/callback",
    custom_data: {
        "order_id": "ORD-1234567890",
        "customer_id": "CUST-1234567890",
    },
});

const payment_url = response.response_text;
redirect_user(payment_url);
```

### Payin sans rédirection

Le Payin sans rédirection permet de payer directement sur la page de la boutique, sans être redirigé vers une page de paiement.

```javascript
const response = await invoice.payWithoutRedirection({
    otp: "101353", // OTP reçu par SMS par le client
    customer: "226XXXXXXXX", // Numéro de téléphone utilisé pour générer l'OTP
    callback_url: "https://backend.masuperboutique.com/callback",
    custom_data: {
        "order_id": "ORD-1234567890",
        "customer_id": "CUST-1234567890",
    },
});

const token = response.token;
check_payment_status(token);
```

## Payout

Le Payout est une transaction qui permet à un marchand de rembourser un client ou de lui envoyer de l'argent.

```javascript
const withdrawal = client.Withdrawal(
    100,
    "Remboursement de la commande ORD-1234567890",
    "226XXXXXXXX"
);
const response = await withdrawal.send({
    type: "client",
    to_wallet: true, // true si l'argent doit rester dans le wallet du client, false si l'argent doit être envoyé sur son compte mobile money
    callback_url: "https://backend.masuperboutique.com/callback-payout",
});

const token = response.token;
check_payment_status(token);
```

## Vérification de transaction

La vérification de transaction permet de vérifier l'état d'une transaction.
Vous devez toujours vérifier l'état d'une transaction avant de livrer un produit ou de valider une commande.

Pour obtenir une transaction, vous devez fournir le token de la transaction.

```javascript
const transaction_token = "eyJ0eXAiOiJ...pZCI6IjY"
const transaction = await client.getTransaction(transaction_token, "payin"); // "payin" ou "client_payout" ou "merchant_payout"
const status = transaction.status;
if (status === "completed") {
    // La transaction a été effectuée avec succès
} else if (status === "pending") {
    // La transaction est en cours de traitement
} else {
    // La transaction a échouée
}
```