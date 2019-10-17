function checkSex (idcard) {
  if (idcard === undefined || idcard === null) {
    return '男'
  }
  if (parseInt(idcard.substr(16, 1)%2, 10) === 1) {
    return '男'
  } else {
    return '女'
  }
}



function getParameterByName(name, url) {
   
   var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
       results = regex.exec(url);
   if (!results) return null;
   if (!results[2]) return '';
   return decodeURIComponent(results[2].replace(/\+/g, " "));
}

module.exports = {
  checkSex,
  getParameterByName
}
