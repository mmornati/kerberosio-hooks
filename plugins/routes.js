class AbstractRoutes {

  constructor(url, getCode, postCode) {
    this.url = url;
    this.GET = getCode;
    this.POST = postCode;
  }

  getUrl() {
    return this.url;
  }

  getGetCode() {
    return this.GET;
  }

  getPostCode() {
    return this.POST;
  }

}

module.exports = AbstractRoutes;
