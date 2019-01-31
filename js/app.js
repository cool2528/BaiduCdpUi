/*生成密码分享随机密码*/
function getRandomAlphaNum(len){
                var rdmString = "";
                for (; rdmString.length < len; rdmString += Math.random().toString(36).substr(2));
                return rdmString.substr(0, len);
}
function IsElementExist(row){
	let bResult = false;
	for(let key in app.downloadListinfo)
	{
		if(app.downloadListinfo[key].gid === row.gid || app.downloadListinfo[key].name === row.name)
		{
			app.downloadListinfo[key].isRateLimiting = row.isRateLimiting;
			app.downloadListinfo[key].connections =  row.connections;
			app.downloadListinfo[key].downloadSpeed =  row.downloadSpeed;
			app.downloadListinfo[key].name =  row.name;
			app.downloadListinfo[key].progress =  row.progress;
			app.downloadListinfo[key].errorCode =  row.errorCode;
			app.downloadListinfo[key].status =  row.status;
			bResult =  true;
			break;
		}
	}
	return bResult;
}
var app = new Vue({
	el: '#app',
	data: function() {
		return {
				/*控制网盘文件列表是否显示 默认不显示登录成功以后才显示网盘资源*/
				tablelistisShwo:false,
				/*
				当下载完成的列表选择项发生变化时存储的数据
				*/
				downloadSussedSelection: [],
				/*百度网盘登录成功以后获取网盘文件的列表数组*/
				baiduUserInfo:[],
				/*百度网盘登录成功后文件列表选择项变化存储数组*/
				baiduSelectInfo:[],
				//baiduUserInfo:JSON.parse("{\"UserName\":\"Childe5845\",\"UserHeader\":\"https://ss0.bdstatic.com/7Ls0a8Sm1A5BphGlnYG/sys/portrait/item/028e7529.jpg\",\"data\":[{\"isdir\":1,\"name\":\"炫舞挂\",\"Size\":\"0.00 B\",\"nCategory\":6,\"path\":\"/炫舞挂\",\"FileType\":\"\",\"ChangeTime\":\"2017-01-19\",\"fs_id\":\"802369578976238\"},{\"isdir\":1,\"name\":\"我的照片\",\"Size\":\"0.00 B\",\"nCategory\":6,\"path\":\"/我的照片\",\"FileType\":\"\",\"ChangeTime\":\"2012-09-15\",\"fs_id\":\"2674563244\"},{\"isdir\":1,\"name\":\"我的音乐\",\"Size\":\"0.00 B\",\"nCategory\":6,\"path\":\"/我的音乐\",\"FileType\":\"\",\"ChangeTime\":\"2012-09-15\",\"fs_id\":\"2011573783\"},{\"isdir\":1,\"name\":\"我的视频\",\"Size\":\"0.00 B\",\"nCategory\":6,\"path\":\"/我的视频\",\"FileType\":\"\",\"ChangeTime\":\"2012-09-15\",\"fs_id\":\"413281047\"},{\"isdir\":1,\"name\":\"来自：百度相册\",\"Size\":\"0.00 B\",\"nCategory\":6,\"path\":\"/来自：百度相册\",\"FileType\":\"\",\"ChangeTime\":\"2016-07-20\",\"fs_id\":\"777117376249076\"},{\"isdir\":1,\"name\":\"test\",\"Size\":\"0.00 B\",\"nCategory\":6,\"path\":\"/test\",\"FileType\":\"\",\"ChangeTime\":\"2019-01-03\",\"fs_id\":\"868393182768738\"},{\"isdir\":1,\"name\":\"apps\",\"Size\":\"0.00 B\",\"nCategory\":6,\"path\":\"/apps\",\"FileType\":\"\",\"ChangeTime\":\"2013-08-14\",\"fs_id\":\"1720273308\"}]}").data,
				/*分享链接界面是否显示*/
				dlgShareView:false,
				/*分享链接界面标题*/
				dlgShareTitle:"",
				/*分享链接是否公开分享*/
				dlgShareRadio:"1",
				options:[
					{value:'0',label:'永久有效'},
					{value:'7',label:'7天'},
					{value:'1',label:'1天'}
				],
				/*分享时间选择*/
				dlgShareSelect:'0',
				/*分享成功显示分享链接*/
				dlgShareSucceed:false,
				/*分享成功后获取的URL*/
				dlgShareSucceedUrl:"",
				/*已经下载完成的文件列表*/
				downloadSussed:[],
				// downloadSussed:JSON.parse("{\"data\":[{\"connections\":\"13\",\"downloadSpeed\":\"505.59 KB\",\"name\":\"天籁助手-17.09.08版.zip\",\"gid\":\"bd030fd9389e5c24\",\"progress\":90,\"errorCode\":0,\"errorMessage\":\"\",\"status\":\"active\",\"path\":\"d:/pdf//4.1.9/天籁助手-17.09.08版.zip\"}]}").data,
				/*正在下载中的文件列表*/
				downloadListinfo:[],
				// downloadListinfo:JSON.parse("{\"data\":[{\"connections\":\"16\",\"downloadSpeed\":\"3.95 MB\",\"name\":\"WPS Office.zip\",\"gid\":\"e742768bd9877b1e\",\"progress\":0,\"errorCode\":0,\"errorMessage\":\"\"}]}").data,
				/*备份正在下载的列表用来获取已完成下载文件的信息*/
				backupdownloadListinfo:[],
				/*下载失败文件数据列表*/
				downloadErrorList:[],
				// downloadErrorList:JSON.parse("{\"data\":[{\"connections\":\"13\",\"downloadSpeed\":\"505.59 KB\",\"name\":\"天籁助手-17.09.08版.zip\",\"gid\":\"bd030fd9389e5c24\",\"progress\":90,\"errorCode\":0,\"errorMessage\":\"\",\"status\":\"active\",\"path\":\"d:/pdf//4.1.9/天籁助手-17.09.08版.zip\"}]}").data,
				/*下载失败列表选择发生改变时存储的数组*/
				downloadErrorListSelection:[],
				/*正在下载是否显示*/
				downlistShow:true,
				/*下载完成是否显示*/
				downSussedShow:false,
				/*下载失败是否显示*/
				downErrorShow:false,
				/*用户登录成功以后的名字*/
				UserName:"",
				/*用户登录成功后的头像*/
				UerheadImage:"",
				/*头像的宽度高度*/
				UserHeaderWidthHeight:80,
				/*是否启动加载界面*/
				loading:false,
				/*上级目录保存*/
				supperPath:"/",
				/*是否显示右键弹出菜单*/
				viewMenu:false,
				/*百度用户文件列表右键菜单X*/
				MenuX:'',
				/*百度用户文件列表右键菜Y*/
				MenuY:'',
				/*百度用户文件列表右键菜单时保存的行数据信息*/
				RightRow:[],
				/*下载分享链接URL输入框*/
				ShareDownInput:"",
				/*下载分享链接对话框是否显示*/
				ShareDownDlg:false,
				/*已完成下载文件数量显示*/
				completedCount:0,
				/*下载失败的数量*/
				errorCount:0,
				/*当前磁盘已使用的大小*/
				DiskUsed:"",
				/*当前磁盘总大小*/
				DiskTotal:"",
				/*分享链接文件分析表格用户自己选择需要下载的文件*/
				DownloadShareListdata:[],
				/*备份首次加载的数据*/
				BackDownloadShareListdata:[],
				/*当分享下载链接分析表格选项发生变化时存储的数据*/
				DownloadShareListSelection:[],
				/*当前分享链接解析的基础信息*/
				DownloadShareBaseinfo:{},
				/*文件重命名对话框中的文本框*/
				dlgRenameNewName:"",
				/*文件重命名是否显示*/
				dlgRename:false,
				/*重命名对话框标题*/
				dlgRenameTitle:"输入新的文件名",
				/*离线下载输入链接文本框*/
				offline_dlg_input:"",
				/*离线下载对话框*/
				offline_dlg_show:false,
				/*离线下载保存的位置*/
				Offline_save_folder:"/",
				/*离线下载临时保存的位置*/
				Offline_save_tmp_folder:"/",
				/*是否显示离线下载保存的路径对话框*/
				offline_save_dlg:false,
				/*显示当前用户网盘所有文件夹树形数据*/
				offline_tree_data:[],
				/*离线下载文件表格数据*/
				OffilneTable:[],
				/*tab表格激活绑定名称*/
				activeName:"disk",
				/*离线刷新加载动画*/
				Offilne_loading:false,
				/*是否现在菜单*/
				is_show:false,
				MouX:"0px",
				MouY:"0px",
				/*捐助页面*/
				sponsorDlgShow:false,
				/*关于页面*/
				AbuotDlgShow:false,
				/*检测更新*/
				UpdateDlgShow:false,
				/*更新的内容*/
				update_info_msg:"更新时间: 2018-11-16\r\n更新内容:\r\n1. 支持HTTP/HTTPS下载\r\n2. 新增文件清理功能\r\n3. 新增提取码查询功能",
				/*当前版本号*/
				currentversion:"1.0.1",
				/*最新版本号*/
				newVersion:"",
				/*是否可以更新*/
				is_updtate:true
				
		}
	},
	methods: {
		itemClick: function() {
			console.log("1111111")
		},
		showMenuDlg(event){
			this.MouX = event.clientX - 10 + "px";
			this.MouY = event.clientY + 10 + "px";
			this.is_show = !this.is_show;
		},
		toggleSelection: function(rows) {
			if (rows) {
				rows.forEach(row => {
					this.$refs.multipleTable.toggleRowSelection(row,true);
				});
			} else {
				this.$refs.multipleTable.clearSelection();
			}
		},
		/*下载完成列表选择状态*/
		downloadSussedSelectionChange: function(val) {
			this.downloadSussedSelection = val;
		},
		handleSelectionChange:function(val) {
			this.downloadErrorListSelection = val;
		},
		DownloadShareListSelectionChange:function(val){
			this.DownloadShareListSelection = val;
		},
		DownloadShareFileList:function(){
		/*下载当前选中的文件来下载*/
			if(!this.DownloadShareListSelection.length)
			{
				 this.$message({
				  showClose: true,
				  message: "至少选中一个需要下载的文件",
				  type: 'warning'
				});
				return;
			}
			let JsonObjdata = JSON.parse("{\"data\":[],\"info\":{}}");
			JsonObjdata.data = this.DownloadShareListSelection;
			JsonObjdata.info = this.DownloadShareBaseinfo;
			let strSendData = JSON.stringify(JsonObjdata);
			console.log(strSendData);
			DownSelectShareFile(strSendData);
			this.ShareDownDlg = false;
		},
		loginBaidu:function(){
			 window.open("https://pan.baidu.com/","","",false)
		},
		/*切换用户正在下载的列表 1 是正在下载界面  2是已完成的下载列表界面*/
		downShowFunc:function(index){
			switch(index)
			{
				case 1:
				{
					this.downlistShow = true;
					this.downSussedShow = false;
					this.downErrorShow = false;
				}break;
				case 2:
				{
					this.downlistShow = false;
					this.downSussedShow = true;
					this.downErrorShow = false;
					this.completedCount = 0;
				}break;
				case 3:
				{
					this.downlistShow = false;
					this.downSussedShow = false;
					this.downErrorShow = true;
					this.errorCount = 0;
				}
				default:
			}
			
		},
		/*
		更新百度用户文件列表数据
		*/
		updateBaiduList:function(data){
			this.loading = false;
			//setTimeout("app.loading = false;",1000);
			this.baiduUserInfo = JSON.parse(data).data;
			this.UserName = JSON.parse(data).UserName;
			this.UerheadImage = JSON.parse(data).UserHeader;
			//alert(data);
		},
		/*
		百度用户文件列表左键单击事件
		*/
		baiduUserInfoRowClick:function(row,event,column){
			this.viewMenu = false;
			if(row.isdir){
				this.loading = true;
				//supperPath = 
				var dirPath = row.path;
				var pos = dirPath.length - row.name.length;
				var parentPath = dirPath.substr(0,pos);
				this.supperPath = parentPath;
				//alert(parentPath);
				SwitchDirPath(row.path);
			}
		},
		/*切换分享下载链接目录*/
		ShareDownloadRowClick:function(row,event,column){
			if(row.isdir){
				let uk = this.DownloadShareBaseinfo.uk;
				let shareid = this.DownloadShareBaseinfo.shareid;
				let bdstoken = this.DownloadShareBaseinfo.bdstoken;
				let timestamp = this.DownloadShareBaseinfo.timestamp;
				let sign = this.DownloadShareBaseinfo.sign;
				switchShareFolder(row.path,row.cookie,uk,shareid,bdstoken,timestamp,sign);
			}
		},
		RetRootShare:function(){
			 this.DownloadShareListdata = this.BackDownloadShareListdata;
		},
		/*百度用户文件列表右键单击事件*/
		baiduUserinfoRowRightClick:function(row,event){
			//this.$refs.BaiduUserRefTable.clearSelection();
			this.$refs.BaiduUserRefTable.toggleRowSelection(row,true);
			event.preventDefault();
			this.RightRow = row;
			this.MenuX = (event.x-10) +'px';
			this.MenuY = (event.y-90) + 'px';
			this.viewMenu = true;
		},
		/*
		我的网盘文件列表选项发生变化后的回调函数
		*/
		BaiduUserinfoTableChange:function(val){
			this.baiduSelectInfo = val;
		},
		/*路径列表连接被点击*/
		pathlistClick:function(path){
			//alert(path);
			SwitchDirPath(path);
		},
		baiduDown:function(){
			/*下载指定文件*/
			//alert('你准备下载'+this.RightRow.name+'吗?');
			let jsonData = JSON.parse("{\"data\":[]}");
			this.activeName ="download";
			for(let value in this.baiduSelectInfo)
			{
				//alert(this.baiduSelectInfo[value].name);
				jsonData.data.push(this.baiduSelectInfo[value]);
			}
			let strjson = JSON.stringify(jsonData);
			DownloadUserFile(strjson);
			//DownloadUserFile(this.RightRow.path);
		},
		shareUrl:function(){
			/*分享文件*/
			//alert('你准备分享'+this.RightRow.name+'吗?');
			this.dlgShareTitle = this.RightRow.name;
			this.dlgShareView = true;
		},
		DeleteUrl:function(){
			/*删除文件*/
			//alert('你准备删除'+this.RightRow.name+'吗?');
			let jsonData = JSON.parse("{\"data\":[]}");
			
			for(let value in this.baiduSelectInfo)
			{
				//alert(this.baiduSelectInfo[value].name);
				jsonData.data.push(this.baiduSelectInfo[value]);
			}
			let strjson = JSON.stringify(jsonData);
			DeleteBaiduFile(strjson);
		},
		RenameFile:function(){
			/*重命名*/
			this.dlgRename = true;
		},
		RenameFunc:function(name){
			/*调用c++改名函数*/
			this.dlgRename = false;
			BaiduFileRename(this.RightRow.path,name);
		},
		MainClick:function(){
			this.viewMenu = false;
		},
		/*用户头像鼠标右键事件*/
		UserImageRight:function(event){
			event.preventDefault();
		},
		createShareUrl:function(){
			/*创建分享链接*/
			let localshareUrl = "";
			let strPassword = getRandomAlphaNum(4);
			if(this.dlgShareRadio==="1") //私密分享
			{
				localshareUrl = ShareBaiduFile(this.dlgShareRadio,parseInt(this.dlgShareSelect),this.RightRow.fs_id,strPassword);
			this.dlgShareView = false;
				if(JSON.parse(localshareUrl).errno===0)
				{
					this.dlgShareSucceedUrl = JSON.parse(localshareUrl).shorturl;
					this.dlgShareSucceedUrl+="  密码:" + strPassword;
				    this.dlgShareSucceed = true;
				}
			}else if(this.dlgShareRadio==="2") //公开分享
			{
				localshareUrl = ShareBaiduFile(this.dlgShareRadio,parseInt(this.dlgShareSelect),this.RightRow.path);
				this.dlgShareView = false;
				if(JSON.parse(localshareUrl).errno===0)
				{
					this.dlgShareSucceedUrl = JSON.parse(localshareUrl).shorturl;
				    this.dlgShareSucceed = true;
				}
			}
			this.dlgShareView = false;
		},
		CopyShareUrl:function(){
			/*复制分享后的链接*/
		},
		downShareFile:function(){
			/*分享链接按钮被单击*/
			this.DownloadShareListdata = [];
			this.BackDownloadShareListdata = [];
			this.DownloadShareBaseinfo = {};
			this.ShareDownDlg = true;
			this.ShareDownInput ="";
		},
		ParseDownFileUrl:function(){
			/*分析需要下载的URL地址准备下载*/
			//this.ShareDownDlg = false;
			if(!DownShareFile(this.ShareDownInput))
			{
					this.$message({
						  showClose: true,
						  message: '添加下载列表失败请确认是否已经登录了网盘',
						  type: 'error',
						  center: true
						});
			}
			this.BackDownloadShareListdata = [];
		},
		UpateDownloadlist:function(jsonData){
			/*更新下载列表数据*/
				//this.downloadListinfo = JSON.parse(jsonData).data;
				let tmpObj = JSON.parse(jsonData).data;
				if(tmpObj.length)
				{
					for(let key in tmpObj)
					{
						if(!IsElementExist(tmpObj[key]))
						{
							this.downloadListinfo.push(tmpObj[key]);
						}
					}
					
				}else
				{
					this.downloadListinfo = tmpObj;
				}
				console.log("更新下载列表数据" + jsonData);
		},
		handleOpen:function(index,path){
			this.downShowFunc(parseInt(index))
		},
		handClose:function(index,path){
			this.downShowFunc(parseInt(index))
		},
		GetBackupListString:function(){
			/*获取备份中的下载列表来获取已经完成的下载的文件名方便填充已完成文件列表*/
			return JSON.stringify(this.backupdownloadListinfo);
		},
		updatedownloadSussedList:function(data){
			/*更新数据到已下载完成列表*/
			    if(JSON.parse(data).name!=="")
				{
					let row = JSON.parse(data);
					for(let key in this.downloadListinfo)
					{
						if(row.name === this.downloadListinfo[key].name)
						{
							this.downloadListinfo.splice(key,1);
						}
					}
					this.downloadSussed.push(row);
					this.completedCount = this.downloadSussed.length;
				}else
				{
					this.$message({
						  showClose: true,
						  message: '当前下载的文件本地已经存在',
						  type: 'success',
						  center: true
						});
				}
		},
		updatedownloadErrorList:function(data){
			/*更新下载失败的列表数据*/
			console.log("失败的列表数据"+data);
			//this.downloadErrorList = this.downloadErrorList.concat(JSON.parse(data).data);
			let row = JSON.parse(data).data;
			for(let key in this.downloadListinfo)
			{
				if(row.name === this.downloadListinfo[key].name)
				{
					this.downloadListinfo.splice(key,1);
				}
			}
			this.downloadErrorList.push(row);
			this.errorCount = this.downloadErrorList.length;
		},
		StartRow:function(index,row){
		//	alert("id="+index + row.gid);
			AraiaPauseStartRemove("active",row.gid);
			/*恢复下载*/
		},
		PauseRow:function(index,row){
		//	alert("id="+index + row.gid);
			AraiaPauseStartRemove("paused",row.gid);
			/*暂停下载*/
		},
		DeleteRow:function(index,row){
		//	alert("id="+index + row.gid);
			AraiaPauseStartRemove("removed",row.gid);
			/*删除下载*/
		},
		OpenFolderRow:function(index,row){
			/*打开文件所在文件夹*/
			if(!OpenFilePlaceFolder(row.path,1))
			{
				this.showErrorMessage("文件好像不存在或者路径错误");
			}
		},
		CleanSucceed:function(index,row){
			/*清除下载成功的文件记录*/
			row.splice(index,1);
		},
		OpenFolderSucceed:function(index,row){
			/*打开下载成功的文件所在文件夹*/
			if(!OpenFilePlaceFolder(row.path,1))
			{
				this.showErrorMessage("文件好像不存在或者路径错误");
			}
			console.log("打开下载成功的文件所在文件夹"+row.path);
		},
		CleanListSucceed:function(){
			/*清空已经下载完成的列表*/
			this.downloadSussed = [];
		},
		DeleteListSucceed:function(){
			/*删除已经下载文件*/
			if(!this.downloadSussedSelection.length)
			{
				  this.$message({
				  showClose: true,
				  message: "请选择你需要删除的文件",
				  type: 'warning'
				});
				return;
			}
			this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
			  confirmButtonText: '确定',
			  cancelButtonText: '取消',
			  type: 'warning'
			}).then(() => {
				for(let key in this.downloadSussedSelection)
				{
					//console.log(this.downloadSussedSelection[key].path)
					if(!OpenFilePlaceFolder(this.downloadSussedSelection[key].path,3))
					{
						this.showErrorMessage("文件好像不存在或者路径错误");
					}
					this.downloadSussed.splice(key,1);
					this.downloadSussedSelection.splice(key,1);
				}
			  this.$message({
				type: 'success',
				message: '删除成功!'
			  });
			}).catch(() => {
			  this.$message({
				type: 'info',
				message: '已取消删除'
			  });          
			});
		},
		OpenFileSucceed:function(index,row){
			/*打开下载成功的文件*/
			if(!OpenFilePlaceFolder(row.path,2))
			{
				this.showErrorMessage("文件好像不存在或者路径错误");
			}
		},
		allStart:function(){
			/*正在下载全部开始*/
			AraiaPauseStartRemove("allactive","全部恢复");
		},
		allPaused:function(){
			/*正在下载全部暂停*/
			AraiaPauseStartRemove("allpaused","全部暂停");
		},
		allDeleate:function(){
			/*正在下载全部删除*/
			for( let key in this.downloadListinfo)
			{
				AraiaPauseStartRemove("removed",this.downloadListinfo[key].gid);
			}
			this.downloadListinfo = [];
		},
		logout:function(){
			/*退出百度账号*/
			LogOut();
		},
		/*错误信息输出函数*/
		showErrorMessage:function(text){
		  this.$message({
          showClose: true,
          message: text,
          type: 'error'
        });
		},
		/*清除下载失败的*/
		CleanDownloadErrorList:function(){
			this.downloadErrorList = [];
		},
		/*删除下载失败*/
		DeleteDownloadErrorList:function(){
			if(!this.downloadErrorListSelection.length)
			{
				showErrorMessage("请先选择需要删除的文件")
			}
			for(let key in this.downloadErrorListSelection)
			{
				this.downloadErrorListSelection.splice(key,1);
				this.downloadErrorList.splice(key,1);
			}
		},
		updateDownloadShare:function(data){
			/*更新分享下载列表文件*/
			this.DownloadShareListdata = JSON.parse(data).data;
			if(!this.BackDownloadShareListdata.length)
			{
				this.BackDownloadShareListdata = this.DownloadShareListdata;
			}
			this.DownloadShareBaseinfo = JSON.parse(data).info;
			//console.log(data);
		},
		/*分享连接对话框被关闭*/
		ShareDownDlgClose:function(done){
			this.DownloadShareListdata = [];
			this.BackDownloadShareListdata = [];
			this.DownloadShareBaseinfo = {};
			done();
		},
		/*离线下载新建链接任务被单击*/
		NewUrllinkClick:function(){
			this.offline_dlg_show = true;
			if(!this.offline_tree_data.length)
			{
				EnumFolder();
			}
		},
		/*修改离线下载保存的路径*/
		Modify_Offline_Save_Path:function(){
			//this.updateTreeListData();
			this.offline_save_dlg = true;
		},
		/*更新树形列表文件夹数据*/
		updateTreeListData:function(data){
			// let dataJson = "{\"data\":[{\"path\":\"/炫舞挂\",\"label\":\"炫舞挂\"},{\"path\":\"/来自：百度相册\",\"label\":\"来自：百度相册\"},{\"path\":\"/mktest文件\",\"label\":\"mktest文件\"},{\"path\":\"/apps\",\"label\":\"apps\"}],\"炫舞挂\":{\"data\":[{\"path\":\"/炫舞挂/我的音乐\",\"label\":\"我的音乐\"},{\"path\":\"/炫舞挂/百度知道\",\"label\":\"百度知道\"}]},\"来自：百度相册\":{\"data\":[{\"path\":\"/来自：百度相册/贴吧相册\",\"label\":\"贴吧相册\"}]},\"apps\":{\"data\":[{\"path\":\"/apps/北航27系资料共享平台\",\"label\":\"北航27系资料共享平台\"}]}}";
			let arraydata =  JSON.parse(data);
			this.offline_tree_data = arraydata.data;
			for (let key in this.offline_tree_data)
			{
				 let dir = this.offline_tree_data[key].label;
				 for(let i in arraydata)
				 {
					 if(i === dir)
					 {
						this.offline_tree_data[key].children = arraydata[dir].data;
					 }
				 }
			}
			console.log("更新树形列表文件夹数据" + data);
		},
		/*当树形列表框被选择时*/
		TreeNodeSelect:function(data,node){
			this.Offline_save_tmp_folder = data.path;
		},
		/*当用户按下选择更改路径对话框下的确定按钮*/
		selectSavePathSucceed:function(){
			this.offline_save_dlg = false;
			this.Offline_save_folder = this.Offline_save_tmp_folder;
		},
		/*更新离线下载任务列表*/
		updateOfflineTableList:function(data){
			console.log(data);
			this.Offilne_loading = false;
			this.OffilneTable = JSON.parse(data).data;
		},
		/*tab标签*/
		tab_select_click:function(tab,event){
			if(tab.name === "Offdownload" && !this.Offilne_loading)
			{
				this.Offilne_loading = true;
				if(!OffLineDownload("","",1))
				{
					this.showErrorMessage("注意！离线下载需要登录百度账号后才能正常使用");
					this.Offilne_loading = false;
				}
			}
		},
		/*新增离线下载链接任务*/
		AddOfflineTask:function(){
			this.offline_dlg_show = false;
			if(this.offline_dlg_input!=="" && !this.Offilne_loading)
			{
				this.Offilne_loading = true;
				if(!OffLineDownload(this.offline_dlg_input,this.Offline_save_folder+"/",2))
				{
					this.showErrorMessage("注意！离线下载需要登录百度账号后才能正常使用");
					this.Offilne_loading = false;
				}
			}
			this.offline_dlg_input = "";
		},
		/*清除离线下载任务*/
		DeleteOffLineTask:function(index,Taskid){
			this.OffilneTable.splice(index,1);
			let jsonData ="{\"data\":[]}";
			let JsonObj = JSON.parse(jsonData);
			JsonObj.data.push(Taskid);
			jsonData = JSON.stringify(JsonObj);
			console.log(jsonData);
			if(!OffLineDownload(jsonData,"",3))
			{
				this.showErrorMessage("注意！离线下载需要登录百度账号后才能正常使用");
				this.Offilne_loading = false;
			}
		},
		/*刷新离线下载列表*/
		OffLine_refresh:function(){
			if(!this.Offilne_loading)
			{
				this.Offilne_loading = true;
				if(!OffLineDownload("","",1))
				{
					this.showErrorMessage("注意！离线下载需要登录百度账号后才能正常使用");
					this.Offilne_loading = false;
				}
			}
		},
		/*清除所有离线下载任务*/
		AllDeleteOffline:function(){
			let jsonData ="{\"data\":[]}";
			let JsonObj = JSON.parse(jsonData);
			for(let key in this.OffilneTable){
				let Taskid = this.OffilneTable[key].task_id;
				JsonObj.data.push(Taskid);
				this.OffilneTable.splice(key,1);
			}
			jsonData = JSON.stringify(JsonObj);
			console.log(jsonData);
			if(!OffLineDownload(jsonData,"",3))
			{
				this.showErrorMessage("注意！离线下载需要登录百度账号后才能正常使用");
				this.Offilne_loading = false;
			}
		},
		/*赞助页面*/
		sponsor:function(){
			this.is_show = false;
			this.sponsorDlgShow = true;	
		},
		/*关于页面*/
		AboutFunc:function(){
			this.is_show = false;
			this.AbuotDlgShow = true;
		},
		/*更新内容文本框内容发送改变*/
		update_string_change:function(str){
			console.log(str);
		},
		/*检测是否需要更新*/
		is_update_func:function(){
			this.is_show = false;
			this.UpdateDlgShow = true;
		}
	}
})
