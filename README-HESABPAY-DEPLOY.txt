D EXCHANGE — NETLIFY + HESABPAY WEBHOOK PACKAGE

Included:
- Existing site files from D_Exchange_FULL_Netlify_PACKAGE.zip (site HTML and image)
- netlify/functions/hesabpay-webhook.mjs
- netlify.toml configured to deploy Netlify Functions
- Supabase gateway source is provided separately in dexchange-gateway-TXID-fixed.zip

Webhook URL after successful production deployment:
https://d-exchange.net/api/hesabpay/webhook

The function's GET response is only a health check. POST requests are forwarded to the existing Supabase Edge Function route:
https://srakzgpwxmxtpxbvnelq.supabase.co/functions/v1/dexchange-gateway/hesabpay/webhook

IMPORTANT:
1. This ZIP has NOT been deployed to Netlify.
2. The Supabase Edge Function must be deployed separately; uploading this ZIP alone does not update Supabase.
3. Do not register the webhook with HesabPay until both Netlify and Supabase are deployed and a non-financial POST test/log check confirms routing.
4. No real payment has been sent or tested.
5. The gateway uses the explicit HesabPay hash fields when present, but the exact HesabPay transaction reference field must be confirmed against a real provider webhook sample before calling it a blockchain TXID.

Deploy using Netlify's Git-connected repository or Netlify CLI from a computer with Node.js. Netlify Drop/static upload may not deploy Functions.
