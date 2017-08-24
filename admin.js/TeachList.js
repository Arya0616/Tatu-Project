function teachList() {
    $.ajax({
        url:"teacherManagement/allTeacherInfo",
        data:{},
        dataType:"json",
        type:"get",
        success:function () {
            
        }
    })
}



function list(pageNo,kindId){
    $.ajax({
        url: "web/video/home",
        data:{
            kindId:kindId,
            pageNo:pageNo
        },
        dataType: "json",
        type: "POST",
        success: function(data) {
            if(data.code==0){
                var info=data.data;
                var cont="<tr></tr>";
                $.each(info,function(i,sinfo){
                    cont+="<tr style='border-bottom: 1px solid;'>";
                    cont+="<td style='width:2%;'><input type='checkbox' class='item-chk' value='"+sinfo.videoId+"' name='cbk'/></td>";
                    cont+="<td style='width:2%;'>"+(i+1)+"</td>";
                    cont+="<td style='width:7%;'>"+sinfo.videoName+"</td>";
                    cont+="<td style='width:7%;':5%'>"+sinfo.kindName+"</td>";
                    cont+="<td style='width:7%;'>"+sinfo.videoSize+"</td>";
                    cont+="<td style='width:7%;'>"+sinfo.durTime+"</td>";
                    cont+="<td style='width:7%;'>"+sinfo.downloadTimes+"</td>";
                    cont+="<td style='width:7%;'>"+sinfo.hasVoice+"</td>";
                    cont+="<td style='width:21%;'>"+sinfo.thumbnail+"</td>";
                    cont+="<td style='width:21%;'>"+sinfo.highResUrl+"</td>";
                    /*if(typeof(sinfo.previewUrl)=="undefined"){
                        cont+="<td></td>";
                     }else {
                         cont+="<td>"+sinfo.previewUrl+"</td>";
                    } */

                    cont+="<td style='width:7%;'>"+sinfo.uploadDate+"</td>";
                    cont+="<td style='width:7%;'>"+sinfo.opId+"</td>";
                    cont+="<td style='10%'>";
                    cont+="<div class='am-btn-toolbar'>" ;
                    cont+="<div class='am-btn-group am-btn-group-xs'>";
                    cont+="<button class='am-btn am-btn-default am-btn-xs am-text-secondary'><a href='web/video/findOne?videoId="+sinfo.videoId+"'><span class='am-icon-pencil-square-o'></span> 编辑</a></button>";
                    cont+="<button class='am-btn am-btn-default am-btn-xs am-text-danger am-hide-sm-only' onclick='del(\""+sinfo.videoId+ "\");'><span class='am-icon-trash-o'></span>删除</button>";
                    cont+="</div></div></td></tr>";

                });

                $("#mylist").html(cont);
                $("#count span").text("共 "+data.page.totalCount+" 条记录 ,页数"+data.page.pageNo+"/"+data.page.totalPage);
                var  cont1="<li><a href='javascript:list(1);'>«</a></li>";
                for(var i=1; i<=data.page.totalPage; i++){
                    if(i==data.page.pageNo){
                        cont1+="<li class='am-active'><a href='javascript:list(\""+i+ "\");'>"+i+"</a></li>";
                    }else{
                        cont1+="<li><a href='javascript:list(\""+i+ "\");'>"+i+"</a></li>";
                    }
                }
                cont1+="<li><a href='javascript:list(\""+data.page.totalPage+ "\");'>»</a></li>";
                $("#pageNum").html(cont1);

            }else if(data.code==1){
                cont+="<p>没有视频</p>";
                $("#mylist").html(cont);
            } else if(data.code=="-2"){

                $("#my-alert1").modal('open');

            }
        }
    })
}