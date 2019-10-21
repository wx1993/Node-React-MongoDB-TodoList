import store from './../store/index.js';
export function updateStaff () {
   const dispatch = store.dispatch;
    this.$http.post('/search/list').then(res => {
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
    const param = {
        yearto : dataset.to * 1,
        yearfrom : dataset.from * 1,
        sort : dataset.sort
    };
    const data = {
        url:'/search/list',
        param:param,
        success:'success',
        error:',failed'
    };
    this.$http.post(data.url,data.param).then(res => {
        const resData = res.data || {};
        if(resData.code + '' === '0'){
            dispatch({
                type:'getStaff',
                data:trim_nulls(resData.data.map(info =>(
                    condition(info,dataset)
                    ?  
                    info : {})))|| []
            });
        }
    });
}

function condition(info,dataset){
    if(dataset.select1 * 1 === 0){
        return true
    }else if(dataset.select1 * 1 === 1){
        if(dataset.select2* 1 === 0){
            return (info.se_method.indexOf(dataset.select3) !== -1)
        }else if(dataset.select2* 1 === 1){
            return (info.se_method.indexOf(dataset.select3) === -1)
        }else if(dataset.select2* 1 === 2){
            return (info.se_method.indexOf(dataset.select3) === 0)
        }else if(dataset.select2* 1 === 3){
            return (info.se_method.indexOf(dataset.select3) !== -1)
        }else{
            return (info.se_method.indexOf(dataset.select3) !== -1)
        }
    }else{
        if(dataset.select2* 1 === 0){
            return (info.se_methodology.indexOf(dataset.select3) !== -1)
        }else if(dataset.select2* 1 === 1){
            return (info.se_methodology.indexOf(dataset.select3) === -1)
        }else if(dataset.select2* 1 === 2){
            return (info.se_methodology.indexOf(dataset.select3) === 0)
        }else if(dataset.select2* 1 === 3){
            return (info.se_methodology.indexOf(dataset.select3) !== -1)
        }else{
            return (info.se_methodology.indexOf(dataset.select3) !== -1)
        }
    }
}

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
