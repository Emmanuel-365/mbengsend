# Procédure de configuration des variables d'environnement sur Coolify

Pour que votre déploiement Mbengsend fonctionne, vous devez ajouter les variables suivantes dans votre projet Coolify.

## Étape 1 : Accéder aux réglages
1. Allez dans votre projet sur le tableau de bord Coolify.
2. Sélectionnez votre ressource (mbengsend).
3. Allez dans l'onglet **Environment Variables**.

## Étape 2 : Ajouter les variables
Ajoutez chaque ligne ci-dessous. 

**IMPORTANT** : Pour toutes les variables commençant par `NEXT_PUBLIC_`, vous **DEVEZ** cocher la case **"Build Variable"** (en plus de "Runtime Variable"). Sans cela, le frontend ne pourra pas communiquer avec le backend après la compilation.

### Variables du Backend (Medusa & Base de données)
| Clé | Exemple / Valeur |
| :--- | :--- |
| `DATABASE_USERNAME` | `postgres` |
| `DATABASE_PASSWORD` | `postgres` (ou votre mot de passe) |
| `DATABASE_NAME` | `medusa-store` |
| `JWT_SECRET` | `supersecret` |
| `COOKIE_SECRET` | `supersecret` |
| `MEILI_MASTER_KEY` | `meilimasterkey` |
| `JWT_SECRET` | `supersecret` |
| `STRIPE_API_KEY` | `sk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` |
| `STORE_CORS` | `http://localhost:8001` (À mettre à jour avec votre URL finale) |
| `ADMIN_CORS` | `http://localhost:9000,http://localhost:7001` |
| `AUTH_CORS` | `http://localhost:8001,http://localhost:9000` |
| `MINIO_ROOT_USER` | `minioadmin` |
| `MINIO_ROOT_PASSWORD` | `minioadmin` |

### Variables du Frontend (Build Variables obligatoires)
| Clé | Build Var ? | Valeur |
| :--- | :---: | :--- |
| `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` | ✅ OUI | `pk_...` |
| `NEXT_PUBLIC_BASE_URL` | ✅ OUI | `http://localhost:8001` (URL de votre storefront) |
| `NEXT_PUBLIC_MEDUSA_BACKEND_URL` | ✅ OUI | `http://localhost:9000` (URL de votre API) |
| `NEXT_PUBLIC_STRIPE_KEY` | ✅ OUI | `pk_test_...` |
| `NEXT_PUBLIC_DEFAULT_REGION` | ✅ OUI | `cm` ou `us` |
| `NEXT_PUBLIC_STRAPI_URL` | ✅ OUI | `http://localhost:1337` |
| `STRAPI_API_TOKEN` | ❌ NON | `votre_token_strapi` |

### Variables de Strapi
| Clé | Valeur |
| :--- | :--- |
| `STRAPI_APP_KEYS` | `clé1,clé2...` |
| `STRAPI_API_TOKEN_SALT` | `votre_salt` |
| `STRAPI_ADMIN_JWT_SECRET` | `votre_secret` |
| `STRAPI_TRANSFER_TOKEN_SALT` | `votre_salt` |
| `STRAPI_ENCRYPTION_KEY` | `votre_clé` |
| `STRAPI_CORS_ORIGINS` | `http://localhost:8001` |

## Étape 3 : Déploiement
Une fois toutes les variables ajoutées, cliquez sur **Deploy** ou **Redeploy**. Coolify va injecter ces valeurs pendant la construction des images Docker.
