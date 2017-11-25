react-scroll-lock
=================

Scroll lock mixin for React components

### Usage

``` jsx
import ScrollLock from 'react-scroll-lock'

class NeedToLockScroll extends PureComponent {

  render () {
    return (
      <ScrollLock someProp={this.props.someProp}>
        {({ lockElem, someProp}) => (
	  <div ref={lockElem}>
	    {someProp}
	  </div>
        )}
      </ScrollLock>
    )
  }
}
```
