# squi.css
squish css

an excuse to play around with node streams.
it reads a main.css file and looks for the @imports and then creates readstreams and concats and minfies them into a single all.css file

it concats files in order of their @import


### @import

you can use:

 `@import url('some_url.css');`

 '@import url("some_url.css");'

 '@import "some_url.css";'

 '@import 'some_url.css';'


Single or double quotes don't matter

## todo

better configuration

custom inputs and outputs

normalize paths

tests

maybe make 1 module for concating files, and another for minifying

package as node module

?gulp plugin?
