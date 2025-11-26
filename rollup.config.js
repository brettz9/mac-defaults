export default [{
  input: 'src/index.js',
  external: ['get-stream', 'node:child_process'],
  output: {
    file: 'dist/index.cjs',
    format: 'cjs'
  },
  plugins: []
}];
