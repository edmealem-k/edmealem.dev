import nextConfig from "eslint-config-next";

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "test-results/**",
      "playwright-report/**",
      "build/**",
      "out/**",
    ],
  },
  ...nextConfig,
];

export default eslintConfig;
