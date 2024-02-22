import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import externalGlobals from 'rollup-plugin-external-globals';
import sourceMaps from 'rollup-plugin-sourcemaps';
import { terser } from 'rollup-plugin-terser';
import json from 'rollup-plugin-json';

// import pkg from './package.json';
const pkg = require('./package.json')

const commonPlugins = [
    json(),
    typescript({ useTsconfigDeclarationDir: true }),
    // typescript({verbosity:3, clean: true}) // for debugging
    externalGlobals({
        jquery: "$",
        three: "THREE",
        pdfjs: "pdfjs"
    }),
    commonjs(), // so Rollup can convert dependencies to ES modules
    // resolve({browser:true}), // so Rollup can find dependent packages
    // sourceMaps()
];

export default [
    // // minified build
    {
        input: 'src/index.ts',
        output: {
            name: 'RxCore',
            file: 'dist/rxcorefunctions.iife.min.js',
            format: 'iife',
            sourceMap: true, //'inline',
        },
        external: ['three','jquery','pdfjs'],
        plugins: [
            // ...commonPlugins,
            json(),
            typescript({ useTsconfigDeclarationDir: true }),
            // typescript({verbosity:3, clean: true}) // for debugging
            externalGlobals({
                jquery: "$",
                three: "THREE",
                pdfjs: "pdfjs"
            }),
            // resolve({browser:true}), // so Rollup can find dependent packages
            // sourceMaps()
            resolve({browser:true}), // so Rollup can find dependent packages
            commonjs(), // so Rollup can convert dependencies to ES modules
            sourceMaps(),
            terser()
        ]
    },
    // browser-friendly build
    {
        input: 'src/index.ts',
        output: [
            // {
            //     name: 'RxCore',
            //     file: pkg.browser,
            //     format: 'umd',
            //     sourceMap: 'inline',
            // },
            {
                name: 'RxCore',
                file: 'dist/rxcorefunctions.iife.js',
                format: 'iife',
                sourceMap: true //'inline',
            },
        ],
        external: ['three','jquery','pdfjs'],
        plugins: [
            // ...commonPlugins,
            json(),
            typescript({ useTsconfigDeclarationDir: true }),
            // typescript({verbosity:3, clean: true}) // for debugging
            externalGlobals({
                jquery: "$",
                three: "THREE",
                pdfjs: "pdfjs"
            }),
            // resolve({browser:true}), // so Rollup can find dependent packages
            // sourceMaps()
            resolve({browser:true}), // so Rollup can find dependent packages
            commonjs(), // so Rollup can convert dependencies to ES modules
            sourceMaps()
        ]
    },
    // // CommonJS (for Node) and ES module (for bundlers) build.
    // {
    //     input: 'src/index.ts',
    //     output: [
    //         {
    //             file: pkg.main,
    //             format: 'cjs',
    //             sourceMap: true, // 'inline',
    //         },
    //         {
    //             file: pkg.module,
    //             format: 'es',
    //             sourceMap: true, // 'inline',
    //         }
    //     ],
    //     external: ['three','jquery','pdfjs'],
    //     plugins: [
    //         ...commonPlugins,
    //         resolve(), // so Rollup can find dependent packages
    //         sourceMaps()
    //     ]
    // }
];