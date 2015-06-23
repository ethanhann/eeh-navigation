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
            { include: '../src/**/*.js', basePath: '../src' },
            { include: 'content/**/*.ngdoc', basePath: 'content' }
        ];
        writeFilesProcessor.outputFolder = './src/app';
    })
    .config(function (templateFinder, templateEngine) {
        // Nunjucks and Angular conflict in their template bindings so change the Nunjucks
        templateEngine.config.tags = {
            variableStart: '{$',
            variableEnd: '$}'
        };
    })
    .config(function(computePathsProcessor, computeIdsProcessor) {
        computePathsProcessor.pathTemplates.push({
            docTypes: ['overview', 'tutorial'],
            getPath: function(doc) {
                var docPath = path.dirname(doc.fileInfo.relativePath);
                if ( doc.fileInfo.baseName !== 'index' ) {
                    docPath = path.join(docPath, doc.fileInfo.baseName);
                }
                return docPath;
            },
            outputPathTemplate: 'partials/${path}.html'
        });

        computeIdsProcessor.idTemplates.push({
            docTypes: ['overview', 'tutorial', 'e2e-test', 'indexPage'],
            getId: function(doc) { return doc.fileInfo.baseName; },
            getAliases: function(doc) { return [doc.id]; }
        });
    })
    .config(function (getLinkInfo) {
        getLinkInfo.relativeLinks = true;
    });
