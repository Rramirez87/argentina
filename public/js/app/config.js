//defino mi constante para usar en javascript
var _URL = {
  ajax: function(){
          if(window.location.host == 'localhost'){
            return window.location.protocol + "//" + window.location.hostname + "/DESARROLLO/argentina/"
          }else{
            return window.location.protocol + "//" + window.location.hostname + "/DESARROLLO/argentina/"
          }
        }
}
