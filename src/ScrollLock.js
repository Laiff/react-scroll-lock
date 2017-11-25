import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

/**
 * Prevent default behavior for event
 *
 * @param e
 * @returns {boolean}
 */
const cancelScrollEvent = (e) => {
  e.stopImmediatePropagation()
  e.preventDefault()
  e.returnValue = false
  return false
}

const addScrollEventListener = (elem, handler) => {
  elem.addEventListener('wheel', handler, false)
}

const removeScrollEventListener = (elem, handler) => {
  elem.removeEventListener('wheel', handler, false)
}

class WithScrollLock extends PureComponent {

  static propTypes = {
    children: PropTypes.func.isRequired,
  }

  componentDidMount () {
    this.scrollLock()
  }

  componentDidUpdate () {
    this.scrollLock()
  }

  componentWillUnmount () {
    this.scrollRelease()
  }

  scrollLock () {
    const elem = this.element
    if (elem) {
      addScrollEventListener(elem, this.onScrollHandler)
    }
  }

  scrollRelease () {
    const elem = this.element
    if (elem) {
      removeScrollEventListener(elem, this.onScrollHandler)
    }
  }

  onScrollHandler = (e) => {
    const elem = this.element
    const scrollTop = elem.scrollTop
    const scrollHeight = elem.scrollHeight
    const height = elem.clientHeight
    let wheelDelta = e.deltaY
    let isDeltaPositive = wheelDelta > 0

    if (isDeltaPositive && wheelDelta > scrollHeight - height - scrollTop) {
      elem.scrollTop = scrollHeight
      return cancelScrollEvent(e)
    }
    else if (!isDeltaPositive && -wheelDelta > scrollTop) {
      elem.scrollTop = 0
      return cancelScrollEvent(e)
    }
  }

  lockElem = (el) => this.element = el

  render () {
    const { children, ...rest } = this.props

    return children({
      lockElem: this.lockElem,
      ...rest,
    })
  }
}

export default WithScrollLock