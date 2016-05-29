'use strict';

const pbuilder = require('presentation-builder');

module.exports = function(grunt) {
  grunt.registerMultiTask('pbuilder', 'Compiles slides into a presentation', function() {
    const options = this.options(); // eslint-disable-line no-invalid-this
    const filesSrc = this.filesSrc; // eslint-disable-line no-invalid-this
    const gruntFile = grunt.file;
    const processTemplate = function(template, data) {
      return grunt.template.process(template, {data});
    };

    const layouts = pbuilder.prepareFilenameToLayoutsMap(gruntFile.expand(options.layouts), gruntFile.read);
    const nameToContentMap = pbuilder.prepareFilenameToContentMap(filesSrc, gruntFile.read, options);
    const renderedSlides = pbuilder.renderSlides(nameToContentMap, layouts, processTemplate, options);

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
