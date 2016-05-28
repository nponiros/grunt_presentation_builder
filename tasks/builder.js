'use strict';

const pbuilder = require('presentation-builder');

module.exports = function(grunt) {
  grunt.registerMultiTask('pbuilder', 'Compiles slides into a presentation', function() {
    const options = this.options(); // eslint-disable-line no-invalid-this
    const filesSrc = this.filesSrc; // eslint-disable-line no-invalid-this
    const gruntFile = grunt.file;
    const processTemplate = grunt.template.process;

    const layouts = pbuilder.prepareFilenameToLayoutsMap(gruntFile, gruntFile.expand(options.layouts));
    const nameToContentMap = pbuilder.prepareFilenameToContentMap(filesSrc, gruntFile, options);
    const renderedSlides = pbuilder.renderSlides.get(options, nameToContentMap, layouts, processTemplate);

    const index = grunt.file.read(options.index);
    const data = Object.assign(
        {},
        options.layoutAttributes, {
          slides: renderedSlides
        }
    );
    const processed = grunt.template.process(index, {data});
    grunt.file.write(options.outputDir + 'index.html', processed);
  });
};
