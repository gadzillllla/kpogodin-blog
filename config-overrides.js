const { compose } = require('react-app-rewired');
const rewireCssModules = require('react-app-rewire-css-modules');
const rewireSvgReactLoader = require('react-app-rewire-svg-react-loader');

module.exports = function override(config, env) {
  const rewires = compose(
    rewireCssModules,
    rewireSvgReactLoader,
  );
  return rewires(config, env);
};
