# Binary Rights website

Professional portfolio for **www.stopaibias.com**, using the supplied Binary Rights brand assets. The original repository content is preserved. All website code lives in `website/`; its GitHub Actions workflow lives in `.github/workflows/binary-rights-azure.yml`.

## Included

- Home, Demos, Portfolio, Learning, and About Us, plus a private content editor.
- Six initial portfolio entries grounded in the repository README.
- Mastering the Machine marked **In development**, with no invented URL.
- A demo collection ready for actual app links. No unverified demos are listed.
- Original shield logo and favicon, navy `#071D38`, blue `#07569E`, teal `#04A8B5`, and cyan `#13BAC0`.
- Responsive pages, semantic landmarks, keyboard focus styles, page metadata, and no external fonts, trackers, or embedded third-party scripts.
- GitHub sign-in through Azure Static Web Apps. Only the custom `administrator` role can read private content or publish.
- Azure Blob Storage for published content. Draft items are excluded from the public API. Optimistic concurrency prevents an older editor session from overwriting newer edits.

## Local preview and verification

From the repository root:

```sh
node website/scripts/build.cjs
node --test website/tests/*.test.cjs
python3 -m http.server 8080 --directory website/public
```

Open `http://localhost:8080`. The static preview shows the public site. Azure sign-in and the editor require the Azure runtime and storage configuration. There is no local authentication bypass.

`public/content.json` is the built-in public fallback. Run the build script after changing it; the script regenerates the page HTML and API seed. Never put confidential or unpublished material in this tracked seed file. Editor changes live in Azure storage and do not commit to GitHub. Application code remains in GitHub. Enable storage versioning for recovery.

When the content API is unreachable, public pages display the built-in fallback. This can be older than content last published through the editor. The editor reports storage errors instead of claiming changes were saved.

## Azure setup

The site has not been deployed just by adding these files. Use an Azure subscription and your domain registrar to complete these steps.

1. Create an **Azure Static Web App**, deployment source **Other**, with a blank/custom build preset. Use the supplied workflow instead of generating a duplicate workflow. The deployment uploads `website/public` and builds managed Azure Functions from `website/api`.
2. In that app, copy its deployment token into the GitHub repository Actions secret named `AZURE_STATIC_WEB_APPS_API_TOKEN`. Do not place the token in a source file or chat.
3. Create a general-purpose v2 Azure Storage account with secure transfer required and public blob access disabled. Enable blob versioning and soft delete. Create a **private** container named `binary-rights`. The functions use a storage connection string held in server-side environment settings. Protect and rotate that secret. Managed Static Web Apps functions do not support managed identity; a linked standalone Function App is an alternative if identity-based storage access is needed later.
4. Set these environment variables on the Static Web App:

| Setting | Value |
| --- | --- |
| `CONTENT_STORAGE_CONNECTION_STRING` | The storage account connection string, entered directly in Azure |
| `CONTENT_CONTAINER` | `binary-rights` |
| `ALLOWED_ORIGINS` | `https://www.stopaibias.com,https://stopaibias.com,https://YOUR-AZURE-HOST.azurestaticapps.net` |

Use the actual Azure hostname in the last value, with no trailing slash. Remove any unused origin. The backend restricts publishing to these exact browser origins.

5. Merge the website PR after review, or run **Binary Rights website** manually from `main`. Deployment requires the secret and configured Azure resource. PRs run validation only, so preview editors cannot modify production content.
6. In the Static Web App's **Role management**, create an invitation for your GitHub username using the GitHub provider and role **`administrator`**. Open and accept the invitation while signed into that GitHub account. Signing in alone does not grant editing rights.
7. Open the Azure URL and verify `/admin/`, edit a description, publish, and check it in a separate signed-out browser. Refresh the editor to confirm the change persists. Test a signed-in account with no administrator role and confirm it cannot use `/api/admin/content`.
8. Add `www.stopaibias.com` under **Custom domains**. At your DNS provider create the exact validation records Azure supplies and a `www` CNAME to the app's assigned Azure hostname. Wait for Azure domain validation and TLS provisioning. Configure the apex `stopaibias.com` using Azure's supported apex-domain process, or redirect it to `https://www.stopaibias.com` at a provider that supports HTTPS redirects. Do not guess DNS targets.
9. Verify navigation and editor publishing from `https://www.stopaibias.com`, including a phone-sized screen and keyboard-only use. Confirm the storage container remains private.

## Everyday editing

Use the footer's **Editor sign in** link. Sign in with the invited GitHub account. Edit page text or add a project, demo, or learning app. Portfolio URLs must point to GitHub; app links must use HTTPS. Select **Draft** to keep an item private, **In development** for an unfinished resource, or **Published** once its link is ready. Click **Publish changes**. Wait for **Published successfully** before closing the editor.

To launch Mastering the Machine, open Learning apps, paste the final URL, update its description, change its status to Published, and publish. Additional learning apps use the same form and require no route changes.

## Technical notes

- Static HTML/CSS/JavaScript, with Node.js 22 managed Azure Functions using the v4 programming model.
- Public endpoint: `GET /api/content`.
- Administrator endpoints: `GET /api/admin/content`, `PUT /api/admin/content`.
- The Azure gateway protects the admin API route. The function independently checks the gateway's principal role. Do not deploy this handler behind a gateway that permits clients to supply trusted identity headers.
- Same-origin publishing, JSON-only writes, HTTPS URL validation, escaped rendering, CSP, and ETag conditional writes.
- Administrator page assets are public, but load no private content until authorization succeeds. No secrets are embedded in browser code.
- The editor changes text and links; it does not provide arbitrary HTML editing or media uploads.
- GitHub Actions deploys only from `main`. Unit tests cover authorization, origin validation, drafts, invalid URLs, concurrency conflicts, and storage failures. Live authentication, real Blob Storage, DNS, and TLS must be verified in Azure.

## References

- [Azure Static Web Apps configuration](https://learn.microsoft.com/en-us/azure/static-web-apps/configuration)
- [Authentication and authorization](https://learn.microsoft.com/en-us/azure/static-web-apps/authentication-authorization)
- [Managed Azure Functions](https://learn.microsoft.com/en-us/azure/static-web-apps/apis-functions)
- [Application settings](https://learn.microsoft.com/en-us/azure/static-web-apps/application-settings)
- [Custom domains](https://learn.microsoft.com/en-us/azure/static-web-apps/custom-domain)
