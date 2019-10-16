var articleModel = require('./../model/staff.js');
// 获取职员列表
exports.articleList = function (req, res) {
    // const article_name = req.body.article_name;
    // let param = {};
    // if(article_name){
    //     param = {
    //         department_id:dept_id
    //     };
    // }
    articleModel
    .find()
    // .populate('Department','department_name')
    .exec(function (err, staffs) {
      if(err){
        res.status(err.status).end();
      } else {
        res.json({code :0,data:staffs});
      }
    });
}
// 添加职员
exports.addArticle =  function (req, res) {
  const reqBody = req.body;
  if(!reqBody.article_name){
    res.status(200).send({code:124,msg:'miss article_name'}).end();
  }
  if(!reqBody.author_name){
    res.status(200).send({code:125,msg:'miss author_name'}).end();
  }
  const MS = new Date().getTime();
  const uid = (MS + '').slice(-3) * 1 + (Math.random() * (MS + '').slice(0,3) + '').replace('.','') * 1;
      const staff = new articleModel({
          article_name:reqBody.article_name,
          author_name:reqBody.author_name,
          year:reqBody.year,
          field_id:reqBody.field_id,
          se_method:reqBody.se_method,
          research_question:reqBody.research_question,
          research_result:reqBody.research_result
      });
      staff.save(function (err) {
          if(!err){
              res.status(200).send({code:0,msg:'员工添加成功'}).end();
          }
          else{
              res.status(200).send({code:125,msg:'员工添加失败'}).end();
          }
      });

};
// 删除员工
exports.delStaff =  function (req, res) {
  const resBody = req.body;
  if(!resBody.member_id){
    res.status(200).send({msg:'缺少员工id',code:134}).end();
  }
  articleModel.remove({
    member_id:resBody.member_id
  },function (err) {
    if(err){
      res.status(200).send({code:126,msg:'删除职员失败'}).end();
    } else {
      res.status(200).send({code:0,msg:'删除职员成功'}).end();
    }
  });
};
// 编辑员工
exports.editStaff = function (req, res) {
  const reqBody = req.body;
  if(!reqBody.member_id){
    res.status(200).send({code:123,msg:'缺少员工id'}).end();
  }
  articleModel.findOneAndUpdate({member_id:reqBody.member_id},{
    member_name:reqBody.member_name,
    department_id:reqBody.department_id,
    work_num:reqBody.work_num,
      department_name:reqBody.department_name
  },{new:false},function (err, result) {
      if(!err){
        res.status(200).send({code:0,data:result}).end();
      } else {
        res.status(200).send({code:124,msg:'部门编辑失败'}).end();
      }
  })
};