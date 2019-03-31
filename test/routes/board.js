const express = require("express");
const router = express.Router();
const fs = require("fs");
const validate = require('../public/javascripts/validate');


router.get("/",function (req,res) {
  res.locals.user = req.session.user || "";
  fs.access('./message',function (err) {
    if(err){
      fs.mkdir("./message",(err)=>{
        fs.appendFile("./message/topic",(err)=>{})
      })
      res.send("请刷新");
    }else{
      fs.readFile("./message/topic","utf8",(err,data)=>{
        // if(err) next(err);
        res.locals.message = data || "";
        res.render("board");
      })
    }
  })
})

var users = {};

//退出
router.get("/logout",function (req,res) {
  req.session.user = undefined;
  res.redirect("back");
})


//登陆
router.post("/login",function (req,res) {
  const {lname,lpwd} = req.body;
  var errors = validate.loginvalidate(lname,lpwd);
  if(errors){
    res.send(errors);
  }else{
    if(users[lname] && lpwd != users[lname].password ){
     errors = {};
     errors.password = "密码错误";
     res.send(errors);
   }else if(!users[lname]){
     errors = {};
     errors.name = "未注册用户";
     res.send(errors);
   }else {
     req.session.user = {loginname:lname};
     res.send(errors);
    }
  }
})


//注册
router.post("/reg",function (req,res) {
  const {rname,rpwd,cpwd} = req.body;
  var errors = validate.regvalidate(rname,rpwd,cpwd);
  if(errors){
    res.send(errors);
  }else {
   if(JSON.stringify(users) != "{}"){
     // console.log("111");
    if(users[rname]){
      errors = {};
      errors.name = "已存在此用户";
      res.send(errors);
      // console.log("!!!!");
    }else{
      users[rname] = {
        loginname:rname,
        password:rpwd
      };
      req.session.user = {loginname:rname};
      res.send(errors);
    }
  }else{
    users[rname] = {
      loginname:rname,
      password:rpwd
    };
    req.session.user = {loginname:rname};
    res.send(errors);
  }
}
 console.log(users);
})

router.post("/send",function (req,res) {
  const {message} = req.body;
  var d = new Date();
  var time = `${d.getFullYear()} / ${d.getMonth()+1} / ${d.getDate()}  - ${d.getHours()} . ${d.getMinutes()} . ${d.getSeconds()} `
  var data = req.session.user.loginname + ":" + message + ":" + time + "|";
   fs.access('./message',(err)=>{
     fs.appendFile('./message/topic', data, (err)=>{});
   });
   res.redirect("back");
})





module.exports = router;
