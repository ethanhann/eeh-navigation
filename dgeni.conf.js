'use strict';
// Canonical path provides a consistent path (i.e. always forward slashes) across different OSes
var path = require('canonical-path');
var Package = require('dgeni').Package;


module.exports = new Package('eeh-navigation', [
    require('dgeni-packages/ngdoc'),
    require('dgeni-packages/jsdoc'),
    require('dgeni-packages/nunjucks')
])
    .config(function (log, readFilesProcessor, writeFilesProcessor) {
        log.level = 'info';
        readFilesProcessor.basePath = path.resolve(__dirname);
        readFilesProcessor.sourceFiles = [
            {include: 'src/**/*.js', basePath: 'src'}
        ];
        writeFilesProcessor.outputFolder = 'doc2/src';
    })
    .config(function (templateFinder, templateEngine) {
        // Nunjucks and Angular conflict in their template bindings so change the Nunjucks
        templateEngine.config.tags = {
            variableStart: '{$',
            variableEnd: '$}'
        };
    })
    .config(function (getLinkInfo) {
        getLinkInfo.relativeLinks = true;
    });
