(function(){
  var localStorageWrapper = function(name) {
    this.name = name;
    if(!localStorage.getItem(name)) {
      localStorage.setItem(name, "[]");
    }
  }

  localStorageWrapper.prototype.get = function(n) {
    if(n === undefined) {
      return JSON.parse(localStorage.getItem(this.name));
    } else {
      var data = JSON.parse(localStorage.getItem(this.name));
      return data[n];
    }

  }

  localStorageWrapper.prototype.search = function(searchTerm) {
    var wholeArray = JSON.parse(localStorage.getItem(this.name));
    for(var i in wholeArray) {
      if(wholeArray[i][searchTerm]) {
        return wholeArray[i][searchTerm];
      }
    }
    return null;
  }

  localStorageWrapper.prototype.set = function(data) {
    return localStorage.setItem(this.name, JSON.stringify(data));
  }

  localStorageWrapper.prototype.add = function(obj) {
    var data = this.get();
    if(data) {
      data.push(obj);
      return this.set(data);
    }
  }

  localStorageWrapper.prototype.remove = function(n) {
    var data = this.get();
    data.splice(n,n);
    return this.set(data);
  }

  localStorageWrapper.prototype.destroy = function() {
    delete localStorage[this.name]
  }

  cdb.admin.localStorage = localStorageWrapper;
}())
