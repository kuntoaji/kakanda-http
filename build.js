// Bundles the app and React into one minified file: build/kakanda-http.js.
// Run with --watch to rebuild on every change.
import * as esbuild from 'esbuild';

const options = {
  entryPoints: ['modules/index.jsx'],
  outfile: 'build/kakanda-http.js',
  bundle: true,
  minify: true,
  format: 'esm',
  target: 'es2022',
  jsx: 'automatic',
  define: { 'process.env.NODE_ENV': '"production"' },
  logLevel: 'info',
};

if (process.argv.includes('--watch')) {
  await (await esbuild.context(options)).watch();
} else {
  await esbuild.build(options);
}
