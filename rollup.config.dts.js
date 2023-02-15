import dts from 'rollup-plugin-dts'
import del from 'rollup-plugin-delete'

console.log(process.env.npm_config_taro)

const config = [
  {
    // input: './dist/esm/types/src/packages/nutui.biz.d.ts',
    input: process.env.npm_config_taro
      ? './dist/types/nutui.taro.biz.build.ts'
      : './dist/types/nutui.biz.build.ts',
    output: [{ file: 'dist/types/index.d.ts', format: 'es' }],
    plugins: [
      dts({
        compilerOptions: {
          baseUrl: '.',
          paths: {
            '@/*': ['src/*'],
          },
        },
      }),
      // del({
      //   hook: 'buildEnd',
      //   targets: ['./dist/esm/types', './dist/types/*.build.ts'],
      // }),
    ],
  },
]

export default config
