module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    parserOptions: {
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features        sourceType: "module", // Allows for the use of imports        ecmaFeatures: {          jsx: true // Allows for the parsing of JSX        }
    },
    plugins: ['@typescript-eslint', 'react-hooks'],
    settings: {
        react: {
            version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
        },
    },
    extends: [
        'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
        'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
        'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
        'plugin:import/typescript',
        'airbnb-typescript-prettier',
    ],
    rules: {
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        // e.g. "@typescript-eslint/explicit-function-return-type": "off",
        'react/display-name': 0,
        'no-unused-vars': 0,
        'react/no-unused-state': 1,
        'react/prop-types': 0,

        '@typescript-eslint/no-empty-interface': 0,
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/triple-slash-reference': 0,

        'prefer-const': 0,
        '@typescript-eslint/explicit-module-boundary-types': 'off',

        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/no-empty-function': 0,

        'import/no-unresolved': 'off',
        'import/no-mutable-exports': 'off',
        'import/prefer-default-export': 'off',
        'import/no-dynamic-require': 'off',
        'global-require': 'off',
        'import/no-extraneous-dependencies': 'off',

        'react/jsx-props-no-spreading': 'off',
        'react/require-default-props': 'off',
        'react-hooks/rules-of-hooks': 'off', // Checks rules of Hooks
        'react-hooks/exhaustive-deps': 'warn', // Checks effect

        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/media-has-caption': 'off',

        'no-useless-catch': 'off',
        'no-restricted-syntax': 'off',
        'no-continue': 'off',
        'no-nested-ternary': 'off',
        'no-unused-expressions': 'off',
        'consistent-return': 'off',
        'react/no-danger': 'off',
        'no-console': 'off',
        'no-underscore-dangle': 'off',
        '@typescript-eslint/no-unused-vars': 1,
        '@typescript-eslint/no-shadow': 0,
        'no-restricted-syntax': [
            'error',
            {
                selector:
                    "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace|debug)$/]",
                message: 'Unexpected property on console object was called',
            },
        ],
        'no-unsafe-finally': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
        'react/no-array-index-key': 'off',
    },
};
