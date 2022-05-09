# umi-plugin-icon

更简单的 `SVG` 图标使用方案。
> 所使用的 `SVG` 图标需要符合 `iconfont` 要求，图标大小1024x1024px，具体要求可查看 [图标绘制](https://www.iconfont.cn/help/detail?spm=a313x.7781069.1998910419.d68c573b2&helptype=draw)

## 启用方式

配置开启。

## 介绍

无需配置 `webpack loader`，即可在项目中使用 `SVG` 图标。且支持智能提示、按需引入。

## 配置

```ts
export default {
  icons: {
    // 必填
    entry: path.resolve(__dirname, 'your svg dir'),
    // 是否生成 ts 文件，默认 true
    typescript: true,
    // 图标路径别名，默认 @icons
    alias: '@icons',
  },
};
```

`entry` 指定为 `SVG` 图片文件夹，且该文件夹内的目录结构需要是

```
- ROOT_SVG_DIR
  - filled
    - yourSVGIcon.svg
  - outlined
    - yourSVGIcon.svg
```

上面的 `filled`、`outlined` 称为「主题」，分别为「填充」和「线性」，因为同一个图标会有两种展示风格，便于后期拓展。

再修改 `tsconfig.json`，增加 `@icons` 别名，支持智能提示导入。

```json
{
  "compilerOptions": {
    "paths": {
      "@icons": ["./src/.umi/plugin-icons/index.ts"]
    }
  }
}
```

## 使用方式

完成上述配置后，启动项目，将会在 `src/.umi` 生成 `plugin-icons` 文件夹，里面存放的就是可使用的图标组件。在代码中，输入 `<YourSVGIconOutlined />` 即会出现智能提示。

![输入时智能提示](https://static.ltaoo.work/image-20210905165331790.png)

或手动引入

```js
import { YourSVGIconOutlined } from '@icons';

const App = () => {
  return <YourSVGIconOutlined />;
};
```

`@icons` 即上述的内置别名，可通过配置项 `alias` 指定。

## FAQ

### @ant-design/colors、classnames 依赖找不到

如果安装了 `antd`，上面两个包就默认安装了，否则需要手动安装。

```bash
yarn add @ant-design/colors classnames
```

### 输入图标名过程中没有智能提示

确认在 `tsconfig.json` 中配置了 `@icons` 别名，如果确认配置但仍无效，尝试先重启一次 `vscode`。如果还不行，可以先手动引入一次，看 `@icons` 路径是否识别成功，识别成功后，即可智能提示引入。
