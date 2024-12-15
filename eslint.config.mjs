import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';

export default [
    { files: ['**/*.{js,mjs,cjs,jsx}'] },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        languageOptions: {
            globals: {
                process: "readonly",
                "no-mixed-operators": ["off"]
            },
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        rules: {
            "react/prop-types": "off",
            "no-empty": "off",
            "not defined" : "off"
        }
    },
];
