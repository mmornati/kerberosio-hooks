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

  getImageUrl(config, pathToImage) {
    var image_to_send;
    if (config.image_method === 'URL') {
      image_to_send = config.images_base_url + pathToImage;
    } else if (config.image_method === 'PATH') {
      image_to_send = config.images_base_path + pathToImage;
    }
    return image_to_send;
  }
}

module.exports = AbstractConfiguration;
