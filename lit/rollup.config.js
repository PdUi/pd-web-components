import { glob } from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import summary from 'rollup-plugin-summary';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';

export default {
  input: Object.fromEntries(
		glob.sync('dist/src/**/*.js').map(file => [
			// This remove `dist/` as well as the file extension from each
			// file, so e.g. dist/nested/foo.js becomes nested/foo
			path.relative(
				'dist',
				file.slice(0, file.length - path.extname(file).length)
			),
			// This expands the relative paths to absolute paths, so e.g.
			// dist/nested/foo becomes /project/dist/nested/foo.js
			fileURLToPath(new URL(file, import.meta.url))
		])
	),
  output: {
    dir: 'minified',
    format: 'esm'
  },
  onwarn(warning) {
    if (warning.code !== 'THIS_IS_UNDEFINED') {
      console.error(`(!) ${warning.message}`);
    }
  },
  plugins: [
    replace({'Reflect.decorate': 'undefined', 'preventAssignment': true}),
    resolve(),
    terser({
      ecma: 2017,
      module: true,
      warnings: true,
      mangle: {
        properties: {
          regex: /^__/,
        },
      },
    }),
    summary(),
  ]
};
