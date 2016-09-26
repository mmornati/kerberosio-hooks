var configPrototype = {
  name: "abstract module name",
  define: function (name, value) {
    Object.defineProperty(exports, name, {
        value:      value,
        enumerable: true
    });
  }

}

module.exports.configPrototype = configPrototype;
