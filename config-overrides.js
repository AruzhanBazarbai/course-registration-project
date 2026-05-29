const {rewireWorkboxInject, defaultInjectConfig} = require('react-app-rewire-workbox');
 
// чтобы самостоятельно настроить конфигурации вебпака интегрируя service-worker.js 

module.exports = function override(config, env) {
  const workboxConfig = {
    ...defaultInjectConfig,
    swSrc: './src/utils/service-worker.js'
  };
  config = rewireWorkboxInject(workboxConfig)(config, env);
  return config;
};