# rubble

nhost 諸々設定

```
yarn create next-app rubble --typescript
```

src/作成、配下に諸々移動
mantine 諸々インストール

### tailwindcss

```
yarn add -D tailwindcss postcss autoprefixer
yarn add -D prettier prettier-plugin-tailwindcss
```

```
npx tailwindcss init -p
```

tailwind.config.js 修正  
globals.css 修正

### eslint

```
yarn add -D eslint-config-prettier
```

.eslintrc.json 修正

```
touch .prettierrc
touch .prettierignore
touch .eslintignore
```

### import 整列

```
yarn add -D eslint-plugin-import eslint-plugin-unused-imports
```

.eslintrc.json 修正

### jest/testing-library

```
yarn add -D jest @testing-library/react @testing-library/jest-dom
touch jest.config.js
```

pre-commit の修正  
package.json script 追加

### husky

```
yarn add -D husky lint-staged
```

```
npx husky-init
```

pre-commit の修正  
package.json script 追加

### storybook

gh-pages ブランチを作成して storybook を配置

https://marukeso.github.io/rubble/
