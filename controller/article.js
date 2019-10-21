var articleModel = require('../model/article.js');
// 获取职员列表
exports.articleList = function (req, res) {
  const yearto = req.body.yearto;
  const yearfrom = req.body.yearfrom;
  const sortfiled = req.body.sort
    // var prama = {
    //   year:{$gte:2018,$lte:2019}
    // };
    let sort = {};
    if(sortfiled === 'Title')
    {
      sort = {
        article_name :'1'
      }
    }else if(sortfiled === 'Author'){
      sort = {
        author_name :'1'
      }

    }else if(sortfiled === 'Year'){
      sort = {
        year :'1'
      }

    }else if(sortfiled === 'Se_method'){
      sort = {
        se_method :'1'
      }

    }else if(sortfiled === 'Se_methodology'){
      sort = {
        se_methodology :'1'
      }
    }else
    {
      sort = {
        article_name :'1'
      }
    }
    // var query = articleModel.find({});
    if(yearto *1 === 0 && yearfrom* 1 === 0){
      articleModel
      .find({})
      .sort(sort)
      // .populate('Department','department_name')
      .exec(function (err, staffs) {
        if(err){
          res.status(err.status).end();
        } else {
          res.json({code :0,data:staffs});
        }
      });
    }else{
      articleModel
      .find()
      .sort(sort)
      .where('year').gte(yearfrom).lte(yearto)
      // .populate('Department','department_name')
      .exec(function (err, staffs) {
        if(err){
          res.status(err.status).end();
        } else {
          res.json({code :0,data:staffs});
        }
      });
    }
}
// add article
exports.addArticle =  function (req, res) {
  const reqBody = req.body;
  if(!reqBody.article_name){
    res.status(200).send({code:124,msg:'miss article_name'}).end();
  }
  if(!reqBody.se_methodology){
    res.status(200).send({code:125,msg:'miss se_methodology'}).end();
  }
  const MS = new Date().getTime();
  const uid = (MS + '').slice(-3) * 1 + (Math.random() * (MS + '').slice(0,3) + '').replace('.','') * 1;
      const staff = new articleModel({
          article_name:reqBody.article_name,
          author_name:reqBody.author_name,
          year:reqBody.year,
          field_id:reqBody.field_id,
          se_method:reqBody.se_method,
          review:reqBody.review,
          se_methodology:reqBody.se_methodology,
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