var chooseperson=function(e){chooseperson.init(e)};chooseperson.defaults={htmlId:"",parmOrgData:{},artDialogTitle:"请选择管理人",initDataId:null,initDataName:null,ztreeJsonUrl:"",searchJsonUrl:"",searchTitle:{name:"姓名",numb:"工号",org:"组织"},searchNameKey:"userName",searchRendHtml:null,checkType:2,selectNumber:10,selectPrompt:"最多只能选择：",async:!1,ztreeDataFilter:null,postAutoParam:[],ztreeFun:{Check:null,AsyncSuccess:null,Click:null},view:{},structureStaff:null,structureStaffBackArray:null,callBackExist:null,statusbar:"",callBack:null},chooseperson.init=function(e){chooseperson.opts=$.extend({},this.defaults,e||{}),chooseperson.opts.async&&(chooseperson.asyncInit=!0),chooseperson.initHtmlWrap(),chooseperson.artDialog.init(),chooseperson.search(),chooseperson.ztreeFun=chooseperson.opts.ztreeFun,chooseperson.ztree(chooseperson.ztreeSetting())},chooseperson.ztree=function(e){chooseperson.opts.async?$.fn.zTree.init($("#choosepersonTree"),e):chooseperson.ztreeNodes(e)},chooseperson.ztreeNodes=function(e){$.ajax({dataType:"json",type:"POST",data:chooseperson.opts.parmOrgData,cache:!1,url:chooseperson.opts.ztreeJsonUrl,success:function(o){$.fn.zTree.init($("#choosepersonTree"),e,o),$("#ztreeLoadingTips").hide(),chooseperson.ztreeCheckNode(chooseperson.opts.initDataId,!1,chooseperson.opts.initDataName)}})},chooseperson.ztreeOnCheck=function(e,o,s){},chooseperson.ztreeOnAsyncSuccess=function(e,o,s,t){$("#ztreeLoadingTips").hide(),chooseperson.asyncInit?(chooseperson.asyncInit=!1,chooseperson.ztreeCheckNode(chooseperson.opts.initDataId,!1,chooseperson.opts.initDataName)):chooseperson.ztreeCheckNode("",!1,"")},chooseperson.ztreeOnClick=function(e,o,s,t){},chooseperson.ztreeFilter=function(e,o,s){return chooseperson.opts.ztreeDataFilter?chooseperson.opts.ztreeDataFilter(e,o,s):s},chooseperson.orerunDialog=function(){dialog({title:"提示",icon:"error",content:chooseperson.opts.selectPrompt+chooseperson.opts.selectNumber,ok:!0}).showModal()},chooseperson.ztreeCheckNode=function(e,o,s){function t(e){o?c.checkNode(r[e],!0,!0):c.checkNode(r[e],!1,!0)}if(e&&""!=e){var c=$.fn.zTree.getZTreeObj("choosepersonTree"),r=c.transformToArray(c.getNodes()),n="",a=new Array;if(e.indexOf(",")>0){if(e=e.split(","),s=s.split(","),$("#selecteBox>li").length+$(e).length>chooseperson.opts.selectNumber)return chooseperson.orerunDialog(),!1;$(e).each(function(e,o){a=chooseperson.makeArray(o,s[e],a)});for(l=0;l<r.length;l++)$(e).each(function(e,o){o==r[l].id&&t(l)})}else if(""!=e){if($("#selecteBox>li").length+1>chooseperson.opts.selectNumber)return chooseperson.orerunDialog(),!1;a=chooseperson.makeArray(e,s,a);for(var l=0;l<r.length;l++)e==r[l].id&&t(l)}for(var i=0;i<a.length;i++)if($("#selecteBox>li").length>0){for(var h=!0,p=0;p<$("#selecteBox>li").length;p++)a[i].id==$("#selecteBox>li").eq(p).data("id")&&(h=!1);h&&(null==chooseperson.opts.structureStaff?n+='<li data-id="'+a[i].id+'" data-name="'+a[i].name+'"><a href="javascript:;" class="alinks-line alinks-black" onclick="chooseperson.delselect(this)">'+a[i].name+"</a></li>":n+=chooseperson.opts.structureStaff(a[i].id,a[i].name))}else null==chooseperson.opts.structureStaff?n+='<li data-id="'+a[i].id+'" data-name="'+a[i].name+'"><a href="javascript:;" class="alinks-line alinks-black" onclick="chooseperson.delselect(this)">'+a[i].name+"</a></li>":n+=chooseperson.opts.structureStaff(a[i].id,a[i].name);$("#selecteBox").append(n)}},chooseperson.ztreeSetting=function(){var callbackFun={onCheck:function onCheck(event,treeId,treeNode){chooseperson.ztreeFun.Check?eval("chooseperson.ztreeFun.Check(event,treeId, treeNode)"):eval("chooseperson.ztreeOnCheck(event,treeId, treeNode)")},onAsyncSuccess:function onAsyncSuccess(event,treeId,treeNode,msg){chooseperson.ztreeFun.AsyncSuccess?eval("chooseperson.ztreeFun.AsyncSuccess(event,treeId, treeNode, msg)"):eval("chooseperson.ztreeOnAsyncSuccess(event,treeId, treeNode, msg)")},onClick:function onClick(event,treeId,treeNode,msg){chooseperson.ztreeFun.Click?eval("chooseperson.ztreeFun.Click(event,treeId, treeNode, msg)"):eval("chooseperson.ztreeOnClick(event,treeId, treeNode, msg)")}},_ztreeSettingVal;if(chooseperson.opts.async)switch(chooseperson.opts.checkType){case 1:_ztreeSettingVal={async:{enable:!0,url:chooseperson.opts.ztreeJsonUrl,autoParam:chooseperson.opts.postAutoParam,otherParam:chooseperson.opts.parmOrgData,dataFilter:chooseperson.ztreeFilter,type:"post"},check:{enable:!0,chkStyle:"radio",radioType:"all"},view:chooseperson.opts.view,callback:callbackFun};break;case 2:_ztreeSettingVal={async:{enable:!0,url:chooseperson.opts.ztreeJsonUrl,autoParam:chooseperson.opts.postAutoParam,otherParam:chooseperson.opts.parmOrgData,dataFilter:chooseperson.ztreeFilter,type:"post"},check:{enable:!0},view:chooseperson.opts.view,callback:callbackFun};break;case 3:_ztreeSettingVal={async:{enable:!0,url:chooseperson.opts.ztreeJsonUrl,autoParam:chooseperson.opts.postAutoParam,otherParam:chooseperson.opts.parmOrgData,dataFilter:chooseperson.ztreeFilter,type:"post"},view:chooseperson.opts.view,callback:callbackFun}}else switch(chooseperson.opts.checkType){case 1:_ztreeSettingVal={check:{enable:!0,chkStyle:"radio",radioType:"all"},view:chooseperson.opts.view,callback:callbackFun};break;case 2:_ztreeSettingVal={check:{enable:!0},view:chooseperson.opts.view,callback:callbackFun};break;case 3:_ztreeSettingVal={view:chooseperson.opts.view,callback:callbackFun}}return _ztreeSettingVal},chooseperson.search=function(){function searchAjax(dom){$("#searchLoadingTips").show();var _val=$.trim(dom.val());if(""==_val)return!1;eval("chooseperson.opts.parmOrgData."+chooseperson.opts.searchNameKey+"=_val"),$.ajax({dataType:"json",type:"POST",data:chooseperson.opts.parmOrgData,cache:!1,url:chooseperson.opts.searchJsonUrl,success:function(e){var o="";if(chooseperson.opts.searchRendHtml)o+=chooseperson.opts.searchRendHtml(e,chooseperson.opts.checkType);else for(var s=0;s<e.Result.length;s++)1==chooseperson.opts.checkType?o+='<tr><td><label><input type="radio" class="radio person-search-radio" data-name="'+e.Result[s].CNAME+'" data-id="'+e.Result[s].USEid+'"></label></td><td class="c-t-center"><span class="c-nowrap">'+e.Result[s].CNAME+'</span></td><td><span class="c-nowrap">'+e.Result[s].JOBNUMBER+'</span></td><td><span class="c-nowrap">'+e.Result[s].ORGNAME+"</span></td></tr>":o+='<tr><td><label><input type="checkbox" class="checkbox person-search-checkbox" data-name="'+e.Result[s].CNAME+'" data-id="'+e.Result[s].USEid+'"></label></td><td class="c-t-center"><span class="c-nowrap">'+e.Result[s].CNAME+'</span></td><td><span class="c-nowrap">'+e.Result[s].JOBNUMBER+'</span></td><td><span class="c-nowrap">'+e.Result[s].ORGNAME+"</span></td></tr>";$("#adminSearchTbody").html(o),$("#searchLoadingTips").hide()}})}$("#popMangChoo").on("focus",".list-search-input",function(){$(this).parent().find(".list-search-clear").show(),$(this).parent().next(".search-overlay").is(":visible")||$(this).parent().next(".search-overlay").show()}).on("blur",".list-search-input",function(){var e=$(this);""==e.val()&&$("#adminSearchTbody>tr").length<=0&&(e.parent().find(".list-search-clear").hide(),$(this).parent().next(".search-overlay").hide())}).on("keyup",".list-search-input",function(e){13==(document.all?window.event:e).keyCode&&searchAjax($("#popMangChoo").find("input.list-search-input"))}),$("#popMangChoo").on("click",".list-search-icon",function(){searchAjax($("#popMangChoo").find("input.list-search-input"))}),$("#popMangChoo").on("click",".list-search-clear",function(){$(this).parent().find("input.list-search-input").val("").blur(),$(this).parent().next(".search-overlay").hide(),$("#adminSearchTbody").html("")}),$("#popMangChoo").on("click","#searchCheckboxAll",function(){$(this).is(":checked")?$("#adminSearchTbody").find('input[type="checkbox"]').attr("checked","true"):$("#adminSearchTbody").find('input[type="checkbox"]').removeAttr("checked")}),$("#popMangChoo").on("click",".person-search-checkbox",function(){var e=!0;$(".person-search-checkbox").each(function(){$(this).is(":checked")||($("#searchCheckboxAll").removeAttr("checked"),e=!1)}),e&&$("#searchCheckboxAll").attr("checked","true")})},chooseperson.htmlWrap=function(){return'<div id="popMangChoo" class="c-hide"><div class="c-main auth-org-w"><div class="clearfix"><div class="fl w420 bgc-fff"><div class="c-border list"><div class="fs6 c-shallowblack c-border-b c-position-r"><div class="list-search c-position-r searchuser pr-big"><input type="text" placeholder="搜索部门人名或用户凭证..." class="c-input list-search-input"><i class="iconfont list-search-clear c-hide icon-clear c-shallowgray" title="清空"></i><i class="iconfont list-search-icon icon-search c-shallowgray" title="搜索"></i></div><div class="search-overlay"><div class=""><table class="tb c-100"><thead><tr><th><label><input type="checkbox" class="checkbox" id="searchCheckboxAll"></label></th><th>'+chooseperson.opts.searchTitle.name+"</th><th>"+chooseperson.opts.searchTitle.numb+"</th><th>"+chooseperson.opts.searchTitle.org+'</th></tr></thead><tbody id="adminSearchTbody"></tbody></table><div class="pt-giant c-t-center c-shallowgray fs6 c-hide" id="searchLoadingTips">数据正在加载中。。。</div></div></div></div><div class="ptb-small" style="height:280px; overflow:auto;"><div class="pt-giant c-t-center c-shallowgray fs6" id="ztreeLoadingTips">数据正在加载中。。。</div><ul id="choosepersonTree" class="ztree ztree-slack ztree-slack-arrow"></ul></div></div></div><div class="fl add-del-w"><a class="button button-primary button-rounded button-tiny" href="javascript:;" onclick="chooseperson.rightShift()">选择右移<em class="c-simsun ml5">&gt;</em></a><a class="button button-primary button-rounded button-tiny mt-small" href="javascript:;" onclick="chooseperson.delselectall()"><em class="c-simsun ml5">&lt;</em>清空已选</a></div><div class="fl w420 bgc-fff"><div class="c-border list"><div class="p-mini fs6 c-darkgray c-border-b">选择人员信息</div><div class="ptb10" style="height:280px; overflow:auto;"><ul class="selectedorg c-shallowblack" id="selecteBox"></ul></div></div></div></div></div></div>'},chooseperson.rightShift=function(){var e=chooseperson.choosedPersonVal(),o="",s="";$(e).each(function(e,t){o+=t.id+",",s+=t.name+","}),o=o.substring(0,o.length-1),s=s.substring(0,s.length-1),chooseperson.ztreeCheckNode(o,!1,s)},chooseperson.delselectall=function(){$("#selecteBox>li").each(function(){$(this).remove()})},chooseperson.delselect=function(e){var o=$.fn.zTree.getZTreeObj("choosepersonTree"),s=o.transformToArray(o.getNodes()[0].children);idData=$(e).parent().data("id");for(var t=0;t<s.length;t++)idData==s[t].id&&o.checkNode(s[t],!1,!0);$(e).parent().remove()},chooseperson.makeArray=function(e,o,s){var t=!0;if(s.length>0&&$(s).each(function(o,s){e==s.id&&(t=!1)}),t){var c=new Array;chooseperson.opts.structureStaffBackArray?c=chooseperson.opts.structureStaffBackArray(e,o):(c.id=e,c.name=o),s.push(c)}return s},chooseperson.choosedPersonVal=function(){var e=new Array;$("#adminSearchTbody").find('input[type="checkbox"]').each(function(){$(this).is(":checked")&&(e=chooseperson.makeArray($(this).data("id"),$(this).data("name"),e))});var o=$.fn.zTree.getZTreeObj("choosepersonTree");if(1==chooseperson.opts.checkType||2==chooseperson.opts.checkType){var s=o.getCheckedNodes(!0);if(s.length>chooseperson.opts.selectNumber&&2==chooseperson.opts.checkType)return chooseperson.orerunDialog(),!1;for(var t=0;t<s.length;t++)s[t].isParent||(e=chooseperson.makeArray(s[t].id,s[t].name,e))}else{var c=o.getSelectedNodes();c.length>0&&!s[t].isParent&&(e=chooseperson.makeArray(c[0].id,c[0].name,e))}return e},chooseperson.selectAdminer=function(){for(var e=new Array,o=$("#selecteBox>li"),s=0;s<o.length;s++)e=chooseperson.makeArray(o.eq(s).data("id"),o.eq(s).data("name"),e);return e},chooseperson.artDialog={init:function(){this.obj=dialog({title:chooseperson.opts.artDialogTitle,content:$("#popMangChoo").get(0),ok:function(){if(!(!chooseperson.opts.callBackExist||chooseperson.opts.callBackExist()))return!1;if(chooseperson.opts.callBack){if($("#selecteBox>li").length>0)var e=chooseperson.selectAdminer();chooseperson.opts.callBack(e)}chooseperson.dialogClose()},cancel:function(){chooseperson.dialogClose()},statusbar:chooseperson.opts.statusbar}).showModal()},obj:null},chooseperson.dialogClose=function(){setTimeout(function(){$("#selecteBox").html(""),$("#popMangChoo").find("input.list-search-input").val("").blur(),$("#popMangChoo").find(".search-overlay").hide(),$("#adminSearchTbody").html("")},300)},chooseperson.initHtmlWrap=function(){$("#popMangChoo").length<=0&&$("body").append(this.htmlWrap())},chooseperson.removeHtmlWrap=function(){$("#popMangChoo").length&&$("#popMangChoo").remove()};