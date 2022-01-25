const { default: ConnectionString } = require('mongodb-connection-string-url');

const ATLAS_REGEX = /\.mongodb(-dev)?\.net$/i;
const LOCALHOST_REGEX = /^(localhost|127\.0\.0\.1|0\.0\.0\.0)$/i;
const DIGITAL_OCEAN_REGEX = /\.mongo\.ondigitalocean\.com$/i;

function getDataLake(buildInfo) {
  const res = {
    isDataLake: false,
    dlVersion: null
  };

  if (buildInfo.dataLake) {
    res.isDataLake = true;
    res.dlVersion = buildInfo.dataLake.version;
  }

  return res;
}

function isEnterprise(buildInfo) {
  if (buildInfo.gitVersion && buildInfo.gitVersion.match(/enterprise/)) {
    return true;
  }

  if (buildInfo.modules && buildInfo.modules.indexOf('enterprise') !== -1) {
    return true;
  }

  return false;
}

function getHostnameFromHost(host) {
  return host.split(':')[0];
}

function getHostnameFromUrl(url) {
  if (typeof url !== 'string') {
    return '';
  }

  try {
    const connectionString = new ConnectionString(url);
    const firstHost = connectionString.hosts[0];
    return firstHost.split(':')[0];
  } catch (e) {
    // we assume is already an hostname, will further be checked against regexes
    return getHostnameFromHost(url);
  }
}

function isAtlas(uri) {
  return !!getHostnameFromUrl(uri).match(ATLAS_REGEX);
}

function isLocalhost(uri) {
  return !!getHostnameFromUrl(uri).match(LOCALHOST_REGEX);
}

function isDigitalOcean(uri) {
  return !!getHostnameFromUrl(uri).match(DIGITAL_OCEAN_REGEX);
}

function getBuildEnv(buildInfo) {
  const serverOs = buildInfo.buildEnvironment ?
    buildInfo.buildEnvironment.target_os : null;
  const serverArch = buildInfo.buildEnvironment ?
    buildInfo.buildEnvironment.target_arch : null;

  return { serverOs, serverArch };
}

function getGenuineMongoDB(buildInfo, cmdLineOpts) {
  const res = {
    isGenuine: true,
    serverName: 'mongodb'
  };

  if (cmdLineOpts) {
    if (buildInfo.hasOwnProperty('_t')) {
      res.isGenuine = false;
      res.serverName = 'cosmosdb';
    }

    if (
      cmdLineOpts.hasOwnProperty('errmsg') &&
      cmdLineOpts.errmsg.indexOf('not supported') !== -1
    ) {
      res.isGenuine = false;
      res.serverName = 'documentdb';
    }
  }

  return res;
}

module.exports = { getDataLake, isEnterprise, isAtlas, isLocalhost, isDigitalOcean, getGenuineMongoDB, getBuildEnv };
