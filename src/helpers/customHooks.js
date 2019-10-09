function _interopDefault(ex) {
  return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}

var react = require('react');
var react__default = _interopDefault(react);

var useDidMount = function(f) {
  return react.useEffect(function() {
    return f && f();
  }, []);
};

var useDidUpdate = function(f, conditions) {
  var didMountRef = react.useRef(false);

  react.useEffect(function() {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }

    return f && f();
  }, conditions);
};

var useWillUnmount = function(f) {
  return react.useEffect(function() {
    return function() {
      return f && f();
    };
  }, []);
};

var useMergeState = function(initial) {
  if (initial === void 0) initial = {};

  var ref = react.useState(initial);
  var state = ref[0];
  var set = ref[1];
  return {
    state: state,
    set: function(updater) {
      return set(function(prev) {
        return typeof updater === 'function'
          ? Object.assign({}, prev, updater(prev))
          : Object.assign({}, prev, updater);
      });
    }
  };
};

exports.useDidMount = useDidMount;
exports.useDidUpdate = useDidUpdate;
exports.useWillUnmount = useWillUnmount;
exports.useMergeState = useMergeState;
