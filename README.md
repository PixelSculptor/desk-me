# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list


## Color palette - description:
- ![#0a3b92](https://placehold.co/15x15/0a3b92/0a3b92.png) `#0a3b92` - Primary color
- ![#115dbd](https://placehold.co/15x15/115dbd/115dbd.png) `#115dbd` - Light primary color
- ![#bd3872](https://placehold.co/15x15/bd3872/bd3872.png) `#bd3872` - Secondary color
- ![#e04387](https://placehold.co/15x15/e04387/e04387.png) `#e04387` - Light secondary color
- ![#f2f2f2](https://placehold.co/15x15/f2f2f2/f2f2f2.png) `#f2f2f2` - Background color
- ![#333333](https://placehold.co/15x15/333333/333333.png) `#333333` - Dark text color
- ![#f2f2f2](https://placehold.co/15x15/f2f2f2/f2f2f2.png) `#f2f2f2` - Light text color
- ![#69a50e](https://placehold.co/15x15/69a50e/69a50e.png) `#69a50e` - Accent color
- ![#3e7b05](https://placehold.co/15x15/3e7b05/3e7b05.png) `#3e7b05` - Darker accent color
- ![#ffd700](https://placehold.co/15x15/ffd700/ffd700.png) `#ffd700` - Highlight color
- ![#ffffff](https://placehold.co/15x15/ffffff/ffffff.png) `#ffffff` - Neutral color
- ![#cccccc](https://placehold.co/15x15/cccccc/cccccc.png) `#cccccc` - Border color
- ![#e63946](https://placehold.co/15x15/e63946/e63946.png) `#e63946` - Error color
- ![#4caf50](https://placehold.co/15x15/4caf50/4caf50.png) `#4caf50` - Success color

# Favicon:
Favicon was created [here](https://icons8.com)