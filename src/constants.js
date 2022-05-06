/*
 * constants.js
 *
 * Constant values used throughout the plugin.
 */

// Standard packages
const path = require('path')

// Main packages
const { config, context } = require('@microbs.io/core')

/**
 * Absolute path to the directory of this plugin.
 */
module.exports.pluginHome = () => context.get('path.plugins.observability')

/**
 * Shorthand for setting Elastic Cloud API headers.
 */
module.exports.elasticCloudApiHeaders = (elasticCloudApiKey) => {
  return {
    Authorization: `ApiKey ${elasticCloudApiKey || config.get('plugins.elastic-cloud.api_key')}`
  }
}
