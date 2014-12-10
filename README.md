react-scroll-lock
=================

Scroll lock mixin for React components

### Usage

Simply add mixin in component, witch be lock inner scroll.

``` js
var ScrollLock = require('react-scroll-lock');

React.createClass({
	mixins : [
		ScrollLock
	],

	render : function() {
		return (
			<div> ... </div>
		)
	}
})

```
