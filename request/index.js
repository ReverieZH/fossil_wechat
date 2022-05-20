let ajaxTime=0;

export const request=(params)=>{
    ajaxTime++;
    //显示加载中效果
    wx.showLoading({
        title: "加载中",
        mask: true,
        
    });
    //定义公告url
    const baseUrl="http://127.0.0.1:8000/app"
    return new Promise((resolve,reject)=>{
        wx.request({
           ...params,
           url:baseUrl+params.url,
           success:(result)=>{
               resolve(result);
           },
           fail:(err)=>{
               reject(err)
           },
           complete: () => {
               ajaxTime--;
               if(ajaxTime==0){
                    wx.hideLoading();
               }
           }
        });
    })
}