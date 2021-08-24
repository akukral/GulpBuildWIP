const gulp = require(`gulp`);

// JS concat and compile
const webpack = require(`webpack`);
const webpackStream = require(`webpack-stream`);
const webpackConfig = require(`./webpack.config.js`);
const uglifyjs = require(`gulp-uglify`);

// CSS concat and compile
const postcss = require(`gulp-postcss`);
const postcssPresetEnv = require(`postcss-preset-env`);
const cssimport = require(`postcss-import`);
const cssnano = require(`cssnano`);
const critical = require(`critical`).stream;

// Image compression
const imagemin = require(`gulp-imagemin`);

// Notificaiton friendly errors
const notify = require(`gulp-plumber-notifier`);

// Browser syc
const browsersync = require(`browser-sync`);

// SITE VARIABLES BELOW
const domain = ``;
const webroot = `./public_html`;

const scriptEntryPoint = `${webroot}/ui/_js/main.js`;
const stylesEntryPoint = `${webroot}/ui/_css/main.css`;

const scriptDestPoint = `${webroot}/ui/js/`;
const stylesDestPoint = `${webroot}/ui/css/`;

// Add more sources in these arrays
const scriptSources = [`${webroot}/ui/_js/**/*.js`];
const styleSources = [`${webroot}/ui/_css/**/*.css`];
const imageSources = [`${webroot}/ui/images/*`];
const templateSources = [`${webroot}/*.html`, `${webroot}/**/*.html`, `${webroot}/*.twig`, `${webroot}/**/*.twig`, `${webroot}/*.php`, `${webroot}/**/*.php`];

gulp.task(`scripts`, gulp.series((done) => {
  console.log(`Scripts Run`);
  gulp.src(scriptEntryPoint)
    .pipe(notify())
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(gulp.dest(scriptDestPoint))
    .pipe(browsersync.reload({
      stream: true,
    }));

  done();
}));

gulp.task(`scriptsBuild`, gulp.series((done) => {
  console.log(`Scripts Build`);
  gulp.src(scriptEntryPoint)
    .pipe(notify())
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(uglifyjs())
    .pipe(gulp.dest(scriptDestPoint));

  done();
}));

gulp.task(`styles`, gulp.series((done) => {
  console.log(`Styles Run`);
  const processors = [
    cssimport(),
    postcssPresetEnv({
      stage: 0,
      features: {
        'nesting-rules': true,
        rem: {
          html: false,
        },
      },
      browsers: [`IE 8`],
    }),
  ];

  gulp.src(stylesEntryPoint)
    .pipe(notify())
    .pipe(postcss(processors))
    .pipe(gulp.dest(stylesDestPoint))
    .pipe(browsersync.reload({
      stream: true,
    }));

  done();
}));

gulp.task(`stylesBuild`, gulp.series((done) => {
  console.log(`Styles Build`);
  const processors = [
    cssimport(),
    postcssPresetEnv({
      stage: 0,
      features: {
        'nesting-rules': true,
        rem: {
          html: false,
        },
      },
      browsers: [`IE 8`],
    }),
    cssnano({
      autoprefixer: {
        grid: true
      }
    }),
  ];

  gulp.src(stylesEntryPoint)
    .pipe(notify())
    .pipe(postcss(processors))
    .pipe(gulp.dest(stylesDestPoint));

  done();
}));

gulp.task(`imagemin`, gulp.series((done) => {
  console.log(`Image Compression`);
  gulp.src(imageSources)
    .pipe(imagemin());
  // .pipe(gulp.dest(`${webroot}`));

  done();
}));

gulp.task(`html`, gulp.series((done) => {
  console.log(`Template Reload`);
  gulp.src(templateSources)
    .pipe(browsersync.reload({
      stream: true,
    }));

  done();
}));

gulp.task(`sync`, gulp.series((done) => {
  if (domain === ``) {
    browsersync.init({
      server: {
        baseDir: webroot,
        // https: true,
      },
    });
  } else {
    browsersync.init({
      proxy: domain,
      // https: true,
    });
  }

  done();
}));

gulp.task('critical', gulp.series((done) => {
  const processors = [
    postcssPresetEnv({
      stage: 0,
      features: {
        'nesting-rules': true,
        rem: {
          html: false,
        },
      },
      browsers: [`IE 9`],
    }),
    cssnano({
      autoprefixer: true,
    }),
  ];

  gulp.src(`${webroot}/critical.html`)
    .pipe(notify())
    .pipe(critical({
      base: webroot,
      css: [`${stylesDestPoint}main.css`],
      dimensions: [
        {
          height: 480,
          width: 768,
        },
        {
          height: 768,
          width: 1024,
        },
      ],
      minify: true,
      penthouse: {
        forceInclude: [`body footer`],
        timeout: 600000,
      },
    }))
    .pipe(postcss(processors))
    .pipe(gulp.dest(stylesDestPoint))
    .pipe(browsersync.reload({
      stream: true,
    }));

  done();
}));

gulp.task(`watch`, gulp.series((done) => {
  console.log(`Watchinig Scripts`);
  gulp.watch(scriptSources, gulp.series([`scripts`]));
  console.log(`Watchinig Styles`);
  gulp.watch(styleSources, gulp.series([`styles`]));
  gulp.watch(`${stylesDestPoint}main.css`, gulp.series([`critical`]));
  console.log(`Watchinig Templates`);
  gulp.watch(templateSources, gulp.series([`html`]));

  done();
}));

gulp.task(`default`, gulp.series([`sync`, `scripts`, `styles`, `watch`]));

gulp.task(`build`, gulp.series([`scriptsBuild`, `stylesBuild`, `critical`, `imagemin`]));

// EOF
