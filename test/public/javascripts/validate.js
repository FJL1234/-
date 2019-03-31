function loginvalidate(name,password) {
  let errors = "";
  if(!(name && name.length > 2 && name.length < 10)){
    errors = errors || {};
    errors.name = "用户名长度要大于2位小于10位";
  }
  if(!(password && password.length > 2 && password.length < 10)){
    errors = errors || {};
    errors.password = "密码的长度要大于2位小于10位";
  }

  return errors;
}

function regvalidate(name,password,confirm) {
  let errors = "";
  if(!(name && name.length > 2 && name.length < 10)){
    errors = errors || {};
    errors.name = "用户名长度要大于2位小于10位";
  }
  if(!(password && password.length > 2 && password.length < 10)){
    errors = errors || {};
    errors.password = "密码长度要大于2位小于10位";
  }
  if(!(confirm && confirm === password)){
    errors = errors || {};
    errors.confirm = "两次输入的密码不一致";
  }

  return errors;
}


if(typeof window === "undefined")
module.exports = {
  loginvalidate,
  regvalidate
}
