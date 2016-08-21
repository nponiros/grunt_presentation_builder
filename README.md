# grunt-presentation-builder

> Create HTML presentations from multiple slide files, uses [presentation-builder](https://github.com/nponiros/presentation_builder)

## Getting Started

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-presentation-builder --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-presentation-builder');
```

## Features

* Support for nested slides (Framework dependant)
* Writing slides using markdown (uses [markdown-it](https://www.npmjs.com/package/markdown-it))
* Sections in markdown files which can be positioned in different parts of a layout
* Usage of [grunt templates](http://gruntjs.com/api/grunt.template) in the layouts/index.html file (only with `<%= %>` currently)
* Slide files with front matter (uses [front-matter](https://www.npmjs.com/package/front-matter))
* Usage of layout files to avoid writing the layout as part of the markdown

## pbuilder Task

_Run this task with the `grunt pbuilder` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide. The files passed to the tasks are the slides for the presentation.

### Options

#### layoutAttributes

Type: `Object`

The properties defined for this object will be available for usage in the defined layouts and the index file.
If a file's front matter defines a property with the same name, then the front matter property will have precedence.

#### slides

Type: `Array<String> | Array<Object>`

An array containing the file names for the slides without the extension. The array is used to define the order in which the slides should be shown in the presentation. You can pass an object with a `slides` property to create nested slides. Currently only one level of nesting is supported.

#### outputDir

Type: `String`

The directory in which the built presentation is created.

#### index

Type: `String`

An index.html file containing any markup, scripts, stylesheets needed by the presentation framework you use. In order to have the created slides added to the index file, use `<%= slides %>` at the position you want the slides to be rendered.

#### layouts

Type: `Array<String>`

An array of layout files. Supports globbing patterns. The way layout files are written is framework specific.

#### nestedSlidePrefix

Type: `String`

HTML tag to be used as a wrapper for nested slides. Default is `<section>` which works for reveal.js.

#### nestedSlideSuffix

Type: `String`

Closing tag for the __nestedSlidePrefix__ option. Default is `</section>`.

#### sectionSplitter

Type: `RegExp`

Regular expression used to detect sections in the slide files. Default is `/---(.*)---/g`.

#### slideResolutionFullPath

Type: `Boolean`

Changes the way slides given in the `slides` option are matched to slides read in the `files` property. Default is `false`. See [presentation-builder](https://github.com/nponiros/presentation-builder/#slide-resolution) for more information.

#### markdownRendererOptions

Type: `Object`

Options to configure the markdown renderer. See [markdown-it](https://github.com/markdown-it/markdown-it#init-with-presets-and-options) for possible options. Note that `default` is used as preset and this cannot be changed.

### Usage example

```js
pbuilder: {
  targetName: {
    options: {
      layoutAttributes: {
        title: 'Layouts', // Title in index.html head
        footer: 'Copyright....' // footer for all slides
      },
      slides: [
        'slide1',
        'slide2',
        slides: [ // nested slides
          'slide3',
          'slide4'
        ]
      ],
      index: './index.html',
      outputDir: 'build/',
      layouts: ['./layouts/*.html', './some/other/layout.html'],
      sectionSplitter: /---(.*)---/g,
      nestedSlidePrefix: '<section>',
      nestedSlideSuffix: '</section>'
    },
    files: [{
      expand: true,
      cwd: './slides/',
      src: ['*.md']
    }]
  }
}
```

You can check out the demos for more comprehensive examples on how to use the builder.

### Demos

* [pbuilder with reveal.js](https://github.com/nponiros/grunt_presentation_builder_revealjs_demo)

If you have a demo using grunt-presentation-builder, then open a pull request to add a link to your demo or just open an issue with the link.

### Slide files

A slide (markdown file) can have a front matter and one or more sections. Example slide file:

    ---
    title: Slide title
    layout: layout_name
    ---

    ---section1---
    Contents for the first section

    ---section2---
    Contents for the second section

The 4 first lines of the file define the front matter. Any attribute defined there can later be used in a layout. For example in order to reference the title use: `<%= title %>`.
Attributes in the front matter override attributes with the same name defined in the layoutAttributes options property.

The names between the dashes define sections. For example the first section can be referenced as such: `<%= sections.section1 %>`.
In case a file defines no sections then you can use `<%= sections.content %>` to get the contents of the file in the template.
Each section gets through a markdown parser (markdown-it) before it is given to the template.

There is a special section with name **code_editor** which does not get parsed. The contents of that section are given to the template as is and it is meant to be used for a code editor in the slide. You can have a look at the **code_demo** presentation in the [pbuilder with reveal.js](https://github.com/nponiros/grunt_presentation_builder_revealjs_demo) to see how it is used.

## License

[MIT License](./LICENSE)
