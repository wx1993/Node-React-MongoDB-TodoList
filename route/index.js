var dept = require('./../controller/dept.js');
var staff = require('./../controller/article.js');
module.exports = function (app) {
  app.get('/check_connect',function (req,res) {
      res.json({code:0,data:{connect_database:process.env.connect_database}});
  });
  app.post('/search/list',staff.articleList);
  app.post('/search/add',staff.addArticle);
  app.post('/search/del',staff.delStaff);
  app.post('/search/edit',staff.editStaff)

  app.post('/dept/list',dept.deptList);
  app.post('/dept/add',dept.addDept);
  app.post('/dept/del',dept.delDept);
  app.post('/dept/edit',dept.editDept);
};