

fis.set('project.ignore', [
    'node_modules/**', 'output/**', 'fis-conf.js', 'app.js',
    '_assets/**',

]);

fis.match('*.js', {
    optimizer: fis.plugin('uglify-js'),
});

//排除echarts,否则压缩出问题,cpu会跑满卡死
fis.match('touch/**/echarts-all-3.js', {
    optimizer:'',
});
fis.match('touch/**/echarts.js', {
    optimizer:'',
});

fis.match('*.css', {
  optimizer: fis.plugin('clean-css')
});

fis.match('*.png', {
  optimizer: fis.plugin('png-compressor')
});

