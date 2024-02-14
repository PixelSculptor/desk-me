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
- ![#0a3b92](https://placehold.co/15x15/0a3b92/0a3b92.png) `#f03c15`
- #3D84A8 (teal blue) - for buttons, call-to-action elements, and headings,
- #F4A261 (light orange) - for secondary buttons, highlights, and important notifications,
- #F2F2F2 (light gray) - for the background to provide a clean and unobtrusive canvas for content,
- #333333 (dark gray) - for text, labels, and descriptions, ensuring readability and contrast with the background,
- #E76F51 (terracotta) - for critical callouts, notifications, and icons to draw attention,
- #FFD700 (gold) - for exceptional elements like selected dates or outstanding bookings. It adds a touch of elegance,
- #FFFFFF (white) for sections with minimal distraction, such as headers and footers,
- #CCCCCC (light gray) - for borders and dividers to maintain a sense of structure
- #E63946 (red) - error color,
- #4CAF50 (green) - success color

# Favicon:
Favicon was created [here](https://icons8.com)