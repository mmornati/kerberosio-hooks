class AbstractConfiguration {

  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  getPluginConfig() {
    return undefined;
  }
}

module.exports = AbstractConfiguration;
