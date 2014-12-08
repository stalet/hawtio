## Hawtio 2.x prototype

### To get going:

(use sudo for any global install as needed)

* `npm install -g gulp bower karma`

* `npm install`

* `bower install`

### run the app:

* export PHANTOMJS_BIN=node_modules/phantomjs/bin/phantomjs

* `gulp`

* open: <http://localhost:2772>

### Add a js dependency:

* `bower install --save my-awesome-dep`

* `gulp bower`

* commit the changed index.html, bower.json and karma.conf.js
 
 
### TODO

<https://github.com/hawtio/hawtio/labels/hawtio.next>

