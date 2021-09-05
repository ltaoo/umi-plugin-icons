import { resolve } from 'path';

import { IApi } from '@umijs/types';
import { chokidar, chalk } from '@umijs/utils';
import {
  reactIconsGeneratorFromSVGDir,
  singleReactIconGenerator,
} from 'easy-icons';

const iconStyles = `
.anticon {
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.anticon > * {
  line-height: 1;
}

.anticon svg {
  display: inline-block;
}

.anticon::before {
  display: none;
}

.anticon .anticon-icon {
  display: block;
}

.anticon[tabindex] {
  cursor: pointer;
}

.anticon-spin::before,
.anticon-spin {
  display: inline-block;
  -webkit-animation: loadingCircle 1s infinite linear;
  animation: loadingCircle 1s infinite linear;
}

@-webkit-keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}`;

export default function svgIconsPlugin(api: IApi) {
  api.describe({
    key: 'icons',
    config: {
      schema(joi) {
        return joi.object({
          entry: joi.string().required(),
          output: api.paths.absTmpPath,
          typescript: joi.boolean().default(true),
          alias: joi.string().default('@icons'),
        });
      },
    },
  });

  const { icons } = api.userConfig;
  const iconsOutput = resolve(api.paths.absTmpPath!, 'plugin-icons');

  if (icons === undefined) {
    return;
  }
  const { entry, typescript = true, alias = '@icons' } = icons;

  if (entry === undefined) {
    console.log(chalk.red('Please set icons.entry as SVG dir.'));
  }

  api.addHTMLStyles(() => {
    return [
      {
        content: iconStyles,
      },
    ];
  });

  api.chainWebpack(config => {
    config.resolve.alias.set(alias, iconsOutput);
    return config;
  });

  api.modifyBabelPresetOpts(opts => {
    return {
      ...opts,
      import: (opts.import || []).concat([
        {
          libraryName: alias,
          libraryDirectory: 'icons',
          camel2DashComponentName: false,
        },
      ]),
    };
  });

  api.onGenerateFiles(() => {
    reactIconsGeneratorFromSVGDir({
      entry,
      output: iconsOutput,
      typescript,
    });
  });

  async function growthGenerateIcon(SVGPath: string) {
    const { identifier } = await singleReactIconGenerator({
      SVGPath,
      output: iconsOutput,
      typescript,
    });
    console.log(chalk.green(`${identifier} generated.`));
  }

  chokidar
    .watch(entry, {
      ignoreInitial: true,
      ignored: /(^|[\/\\])\../,
    })
    .on('add', growthGenerateIcon)
    .on('change', growthGenerateIcon);
}
