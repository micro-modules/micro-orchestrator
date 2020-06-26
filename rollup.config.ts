import sourceMaps from "rollup-plugin-sourcemaps";
import typescript from "@rollup/plugin-typescript";

const pkg = require("./package.json");

const libraryName = "micro-orchestrator";

export default {
  input: `src/${libraryName}.ts`,
  output: [
    {
      file: pkg.main,
      name: libraryName,
      format: "umd",
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: "es",
      sourcemap: true,
    },
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash-es')
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  watch: {
    include: "src/**",
  },
  plugins: [
    // Compile TypeScript files
    typescript(),

    // Resolve source maps to the original source
    sourceMaps(),
  ],
};
