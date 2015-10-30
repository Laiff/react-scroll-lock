/**
 * Created by laiff on 10.12.14.
 */

var ReactDOM = require('react-dom');

/**
 * Prevent default behavior for event
 *
 * @param e
 * @returns {boolean}
 */
var cancelScrollEvent = function (e) {
    e.stopImmediatePropagation();
    e.preventDefault();
    e.returnValue = false;
    return false;
};

var addScrollEventListener = function (elem, handler) {
    elem.addEventListener('wheel', handler, false);
};

var removeScrollEventListener = function (elem, handler) {
    elem.removeEventListener('wheel', handler, false);
};

/**
 * @extends ReactCompositeComponentInterface
 *
 * @mixin ScrollLock
 */
var ScrollLock = {

    componentDidMount: function () {
        this.scrollLock();
    },

    componentDidUpdate: function () {
        this.scrollLock();
    },

    componentWillUnmount: function () {
        this.scrollRelease();
    },

    scrollLock: function () {
        var elem = ReactDOM.findDOMNode(this);
        if (elem) {
            addScrollEventListener(elem, this.onScrollHandler);
        }
    },

    scrollRelease: function () {
        var elem = ReactDOM.findDOMNode(this);
        if (elem) {
            removeScrollEventListener(elem, this.onScrollHandler);
        }
    },

    onScrollHandler: function (e) {
        var elem = ReactDOM.findDOMNode(this);
        var scrollTop = elem.scrollTop;
        var scrollHeight = elem.scrollHeight;
        var height = elem.clientHeight;
        var wheelDelta = e.deltaY;
        var isDeltaPositive = wheelDelta > 0;

        if (isDeltaPositive && wheelDelta > scrollHeight - height - scrollTop) {
            elem.scrollTop = scrollHeight;
            return cancelScrollEvent(e);
        }
        else if (!isDeltaPositive && -wheelDelta > scrollTop) {
            elem.scrollTop = 0;
            return cancelScrollEvent(e);
        }
    }
};

module.exports = ScrollLock;
