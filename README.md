# Pepite Frontend

## Licence

Ce projet est sous une licence propriétaire stricte. L'utilisation, la copie, la modification ou la distribution du code sont strictement interdites sans l'autorisation explicite du propriétaire du droit d'auteur, M. Grégoire PAULET. Pour plus de détails, consultez le fichier [LICENSE](LICENSE).

## Développement - Vite

Pour démarrer le serveur de développement Vite :

```sh
npm run dev
```

## Scripts utiles

- `npm run lint`: Exécute ESLint sur tous les fichiers `.ts` et `.tsx`.
- `npm run lint:fix`: Exécute ESLint et corrige automatiquement les problèmes détectables.
- `npm run prettier`: Vérifie si tous les fichiers sont bien formatés.
- `npm run prettier:fix`: Formate automatiquement tous les fichiers du projet.

## Vite build

Pour construire l'application pour la production avec Vite :

```sh
npm run build
```

Le build sera disponible dans le dossier `dist`.

## Extensions VS Code recommandées

Pour un développement plus fluide, il est recommandé d'installer les extensions suivantes pour Visual Studio Code :

- **Orthographe**
  - [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
  - [Code Spell Checker French](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker-french)
- **Lint**
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- **Format**
  - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- **Tests**
  - [Jest](https://marketplace.visualstudio.com/items?itemName=orta.vscode-jest)
- **Autres**
  - [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)
  - [Styled Components](https://marketplace.visualstudio.com/items?itemName=styled-components.vscode-styled-components)
  - [VSCode Icons](https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons)
  - [TypeScript Explorer](https://marketplace.visualstudio.com/items?itemName=mxsdev.typescript-explorer)
  - [TS Error Translator](https://marketplace.visualstudio.com/items?itemName=mattpocock.ts-error-translator)
  - [Import Cost](https://marketplace.visualstudio.com/items?itemName=wix.vscode-import-cost)
  - [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=github.copilot)
  - [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)

Pour installer toutes les extensions recommandées, naviguez vers le dossier `.vscode` et cliquez sur `extensions.json`. Une notification s'affichera, vous permettant d'installer toutes les extensions d'un seul coup.

## Technologies utilisées

- React
- TypeScript
- Material-UI (MUI)
- Vite
- Tanstack React Query
- React Router Dom
