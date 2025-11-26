export default [{
  input: 'index.js',
  external: ['get-stream', 'node:child_process'],
  output: {
    file: 'dist/index.cjs',
    format: 'cjs'
  },
  plugins: []
}];
