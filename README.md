[![Build Status](https://github.com/microbs-io/microbs-plugin-elastic-cloud/workflows/Commit/badge.svg?branch=main)](https://github.com/microbs-io/microbs-plugin-elastic-cloud/actions)
[![npm](https://img.shields.io/npm/v/@microbs.io/plugin-elastic-cloud?color=%2300B5AD&label=Latest)](https://www.npmjs.com/package/@microbs.io/plugin-elastic-cloud)
![Apache 2.0](https://img.shields.io/npm/l/@microbs.io/plugin-elastic-cloud?color=%23f6f8fa)

# microbs-plugin-elastic-cloud

## Contents

* [Usage](#usage)
* [Prerequisites](#prerequisites)
* [Configuration](#configuration)


## [](usage)Usage

Before using the `elastic-cloud` plugin you must meet its [prerequisites](#prerequisites).


### `setup`

> Elastic will charge you for your use of Elastic Cloud after a 14-day free trial ([more info](https://www.elastic.co/elasticsearch/service)).


When running [`microbs setup [-o]`](https://microbs.io/docs/usage/cli/#setup), the
`elastic-cloud` plugin creates an Elastic Cloud deployment using the
[Elastic Cloud API](https://www.elastic.co/guide/en/cloud/current/Deployment_-_CRUD.html#create-deployment). Then it deploys `filebeat`, `metricbeat`, and `heartbeat` services to the Kubernetes cluster. These agents autodiscover logs
and metrics from the Kubernetes nodes and pods and ships that data to the
Elastic Cloud deployment.

### `rollout`

The `elastic-cloud` plugin is unaffected by [`microbs rollout`](https://microbs.io/docs/usage/cli#rollout).

### `destroy`

When running [`microbs destroy [-o]`](https://microbs.io/docs/usage/cli/#destroy), the
`elastic-cloud` plugin destroys your Elastic Cloud deployment using the
[Elastic Cloud API](https://grafana.com/docs/grafana-cloud/reference/cloud-api/#delete-stack).
It also removes the services that were deployed to Kubernetes
during `setup`.


## [](prerequisites)Prerequisites

### Install the plugin

microbs installs this plugin automatically when you [install microbs](https://microbs.io/docs/overview/getting-started/).

To reinstall this plugin, run this command:

`microbs plugins install elastic-cloud`

To upgrade this plugin to the latest version, run this command:

`microbs plugins update elastic-cloud`

### Create Elastic Cloud resources

You must create an [Elastic Cloud account](https://cloud.elastic.co/registration)
and obtain an [Elastic Cloud API Key](https://www.elastic.co/guide/en/cloud/current/ec-api-authentication.html)
before using the `elastic-cloud` plugin.


## [](configuration)Configuration

This section documents the `elastic-cloud` plugin configurations for [config.yaml](https://microbs.io/docs/usage/configuration).

### Required fields

#### [](plugins.elastic-cloud.api_key)`plugins.elastic-cloud.api_key`

The value of your [Elastic Cloud API Key](https://www.elastic.co/guide/en/cloud/current/ec-api-authentication.html).

Example: `VnVhQ2ZHY0JDZGJrUW0tZTVhT3g6dWkybHAyYXhUTm1zeWFrdzl0dk5udw==`

#### [](plugins.elastic-cloud.region)`plugins.elastic-cloud.region`

The name of the region in which to deploy your Elastic Cloud deployment.

See the
[available regions](https://www.elastic.co/guide/en/cloud/current/ec-reference-regions.html)
for a list of acceptable values.

Examples: `gcp-us-east1`, `ap-east1`, `westeurope`

#### [](plugins.elastic-cloud.version)`plugins.elastic-cloud.version`

The version of the Elastic Stack to deploy.

Examples: `8.2.0`
