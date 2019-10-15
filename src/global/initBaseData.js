import store from './../store/index.js';
export function updateStaff () {
   const dispatch = store.dispatch;
    this.$http.post('/staff/list').then(res => {
        const resData = res.data || {};
        if(resData.code + '' === '0'){
            dispatch({
                type:'getStaff',
                data:resData.data || []
            });
        }
    });

}

export function search (dataset) {
    const dispatch = store.dispatch;
     this.$http.post('/staff/list').then(res => {
         const resData = res.data || {};
        //  var newlist = {};
        //  resData.data.map(year =>(if(year.work_num * 1 === dataset.year * 1){newlist.push(year)});
         if(resData.code + '' === '0'){
            // resData.data.map(element => {
            //     if(element.work_num * 1 === dataset.year * 1)
            //     {
            //         alert(element.work_num);
            //         resData.data.remove(element);
            //     }
            // });
             dispatch({
                type:'getStaff',
                //  data:resData.data || []
                data:trim_nulls(resData.data.map(year =>((year.work_num * 1 >= dataset.from * 1 && year.work_num * 1 <= dataset.to * 1)
                    
                    ?  
                    year : {})))|| []
             });
         }
     });
 
 }
//  function addItems(resData,dataset)
//  {
//     const list = resData
//     resData.map(element => {
//         if(element.work_num * 1 === dataset.year * 1)
//         {
//             list
//         }
//     });
//     return list;
//  }

function trim_nulls(data) {
    var y;
    for (var x in data) {
        y = data[x];
        if (y instanceof Object) y = trim_nulls(y);
        if (y === "null" || y === null || y === "" || typeof y === "undefined" || (y instanceof Object && Object.keys(y).length == 0)) {
            delete data[x];
        }
    }
    return data;
}

export function updateDept() {
    const dispatch = store.dispatch;
    this.$http.post('/dept/list').then(res => {
        const resData = res.data || {};
        if(resData.code + '' === '0'){
            dispatch({
                type:'getDept',
                data:resData.data || []
            });
        }
    })
}
