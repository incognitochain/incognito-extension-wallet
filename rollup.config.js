import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs'

export default [
    {
        input: 'background/background.js',
        output: [{
            file: 'public/background.js',
            format: 'cjs',
        }, {
            file: 'build/background.js',
            format: 'cjs',
        }],
        plugins: [
            resolve(),
            commonJS({
              include: 'node_modules/**',
            }),
        ]    
    }, {
        input: 'background/content.js',
        output: [{
            file: 'public/content.js',
            format: 'cjs',
        }, {
            file: 'build/content.js',
            format: 'cjs',
        }],
        plugins: [
            resolve(),
            commonJS({
              include: 'node_modules/**',
            })
        ]    
    }
];
