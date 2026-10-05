# React + TypeScript + Vite

## Codespaces API configuration

In Codespaces, `VITE_CODESPACE_NAME` must be defined so the frontend can reach the forwarded API port. Create `octofit-tracker/frontend/.env.local` with the Codespace name (the value of `CODESPACE_NAME`, without a URL or protocol):

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Restart Vite after changing the environment file. The frontend then uses `https://<VITE_CODESPACE_NAME>-8000.app.github.dev`. When the variable is unset for local development, it falls back to `http://localhost:8000`.

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
