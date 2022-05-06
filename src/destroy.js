// Main packages
const { config, context, logger, state, utils } = require('@microbs.io/core')

// Plugin packages
const constants = require('./constants')
const rollout = require('./rollout')

/**
 * Validate configuration.
 */
const validate = () => {
  const requiredFields = [
    'plugins.elastic-cloud.api_key',
  ]
  if (!utils.configHas(requiredFields)) {
    logger.error()
    logger.error(`You must set these variables in ${context.get('path.config')} to destroy Elastic Cloud:`)
    logger.error()
    logger.error(required)
    process.exit(1)
  }
}

module.exports = async () => {
  validate()

  // Remove the Beats services from Kubernetes
  await rollout({ action: 'delete' })

  // Destroy the Elastic Cloud deployment
  if (!state.get('plugins.elastic-cloud.deployment_id'))
    return logger.warn('There is no plugins.elastic-cloud.deployment_id to remove.')
  logger.info('')
  logger.info(`Removing Elastic Cloud deployment: 'microbs-${config.get('deployment.name')}' [deployment_id=${state.get('plugins.elastic-cloud.deployment_id')}]`)
  var response
  try {
    response = await utils.http({
      method: 'post',
      url: `https://api.elastic-cloud.com/api/v1/deployments/${state.get('plugins.elastic-cloud.deployment_id')}/_shutdown`,
      headers: constants.elasticCloudApiHeaders()
    })
  } catch (err) {
    logger.error(err.message)
  }
  if (response.data.orphaned) {
    state.set('plugins.elastic-cloud.deployment_id', `${state.get('plugins.elastic-cloud.deployment_id')}-destroyed`)
    state.save()
    logger.info('...acknowledged. Elastic Cloud deployment will be destroyed in ~5 minutes.')
  } else if (response.status == 404) {
    logger.info(`...Elastic could not find the deployment. It might have been destroyed already.`)
  } else {
    logger.debug(response.status)
    logger.debug(response.data)
  }
}
