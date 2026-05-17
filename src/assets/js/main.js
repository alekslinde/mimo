import "bootstrap";

import "../scss/style.scss";

// combine multiple SVGs into a sprite
// https://webpack.js.org/guides/dependency-management/#requirecontext
require.context("../icons", true, /\.svg$/);
