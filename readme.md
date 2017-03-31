# Setup Frontend

A kickstart for setting up a frontend base, including:

  ### A better HTML5Boilerplate
  - Modified to make use of Bower files
  - Changed jQuery CDN to use Google CDN
  - Included Modernizr CDN with local fallback
  
  ### Basic file structure
  - Added directories for Sass and JavaScript
  
  ### Bower
  - Includes Bower for dependancy management
  - Bower loads initial: jQuery, jQuery dotdotdot, Font Awesome, Bootstrap Sass and Slick Carousel
  
  ### Gulpfile
  - Includes the basic frontend tools like Autoprefixer, Babel, minify, concat, rename etc.
  
  ### Makefile
  - Run `make` to install the project

### Installation
Clone the project in a directory and run the Makefile. Use `gulp watch` during development.

```sh
$ cd project
$ make
$ gulp watch
```
