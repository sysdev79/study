
// function declaration
// ES5 class 흉내
function todo(){
    // execute code
}

var dongyeon = function company(){
    // execute code
}

var company = function(){
    // execute code
}

(function dongyeon(){
    // execute code
}());

(function(){
    // execute code
}());

(
    function()
    {
        // execute code
    }()
);

//////////////////////////////////////////////////////////////////////////////////////////

// ES6
class person{
    constructor(varA, varB)
    {
        this.varA = varA;
        this.varB = varB;
    }

    #privateVar = "privateValue";
    publicVar = "publicValue";
}

var jongil = new person("aa","bb");
console.log(jongil.publicVar);

var mkCount = 9999;
// Date Format Change
Date.prototype.format = function (f) {
	if (!this.valueOf()) return " ";

	var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
	var d = this;

	return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function ($1) {
		switch ($1) {
			case "yyyy":
				return d.getFullYear();
			case "yy":
				return (d.getFullYear() % 1000).zf(2);
			case "MM":
				return (d.getMonth() + 1).zf(2);
			case "dd":
				return d.getDate().zf(2);
			case "E":
				return weekName[d.getDay()];
			case "HH":
				return d.getHours().zf(2);
			case "hh":
				return ((h = d.getHours() % 12) ? h : 12).zf(2);
			case "mm":
				return d.getMinutes().zf(2);
			case "ss":
				return d.getSeconds().zf(2);
			case "ms":
				return d.getMilliseconds().zf(3);
			case "a/p":
				return d.getHours() < 12 ? "오전" : "오후";
			default:
				return $1;
		}
	});
};

String.prototype.string = function (len) {
	var s = '',
		i = 0;
	while (i++ < len) {
		s += this;
	}
	return s;
};
String.prototype.zf = function (len) {
	return "0".string(len - this.length) + this;
};
Number.prototype.zf = function (len) {
	return this.toString().zf(len);
};

function DLinkedList() {
	this.head = null;
	this.tail = null;
	this.length = 0;
}

DLinkedList.prototype.append = function (argLineName, argRoutName, argRoutCode) {
	var node = this.search(argRoutName);
	if (node == null) 
	{
		node = new this.Node(argLineName, argRoutName, argRoutCode);
		if (this.head == null) 
		{
			this.head = node;
			this.tail = node;
		} 
		else 
		{
			var curr;
			if (this.length == 1) 
			{
				curr = this.head;
			} 
			else 
			{
				curr = this.tail;
			}
			curr.next = node;
			node.prev = curr;
			this.tail = node;
		}
		this.length++;
	}
	return this;
	//return node;
}

DLinkedList.prototype.objCopy = function(copyNode)
{
	var node = copyNode.head;
	while(node)
	{
		this.append(node.lineName, node.routName, node.routCode);
		var tmpNode = this.search(node.routName);
		
        tmpNode.prodID = node.prodID;
        tmpNode.productBCD = node.productBCD;
		tmpNode.rZigBCD = node.rZigBCD;
		tmpNode.vZigBCD = node.vZigBCD;
		tmpNode.dataProc = true;
		tmpNode.judgement = node.judgement;
		tmpNode.modelId = node.modelId;
		node = node.next;
	}
	return this;
}

DLinkedList.prototype.insert = function (argLineName, argRoutName, argRoutCode, argStdRoutName) {
	if (this.head == null) 
	{
		this.append(argLineName, argRoutName, argRoutCode);
	} 
	else 
	{
		var curr = this.search(argStdRoutName);
		var node = new this.Node(argLineName, argRoutName, argRoutCode);

		if (curr == this.head) 
		{
			node.next = curr;
			curr.prev = node;
			this.head = node;
		} 
		else 
		{
			var currPrevNode = curr.prev;
			currPrevNode.next = node;

			node.prev = currPrevNode;
			node.next = curr;

			curr.prev = node;
		}
	}
	this.length++;

	return this;
}

DLinkedList.prototype.delete = function (routName) {
	if (routName == "") return;

	var curr = this.search(routName);
	if (curr != null) 
	{
		if(curr == this.tail)
		{
			var currPrevNode = curr.prev;
			currPrevNode.next = null;
			this.tail = currPrevNode;
		}
		else if (curr != this.head) 
		{
			var currPrevNode = curr.prev;
			var currNextNode = curr.next;
			currPrevNode.next = currNextNode;
			currNextNode.prev = currPrevNode;
			
		} 
		else 
		{
			this.head = null;
		}

		delete curr;
	}

	this.length--;
}

DLinkedList.prototype.search = function (routName) {
	var curr = this.head;
	while (curr != null) 
	{
		if (curr.routName == routName) {
			return curr;
		}
		curr = curr.next;
	}
	return null;
}

DLinkedList.prototype.propertyCopy = function(argOriginObj, argCopyObj)
{
	var originObj = argOriginObj;	
	var copyObj = argCopyObj;
	for(var property in originObj)
	{
		copyObj[property] = originObj[property]
	}
	return copyObj;
}

DLinkedList.prototype.Node = function (argLineName, argRoutName, argRoutCode) {
	this.prev = null; //이전 공정
	this.next = null; //다음 공정

	this.lineName = argLineName; //라인이름
	this.routName = argRoutName; //공정이름
	this.routCode = $XT(argLineName + "." + argRoutName + ".State.PROC_ID").value;; //공정 코드
	this.eqpId = $XT(argLineName + "." + argRoutName + ".State.EQP_ID").value;

	this.prodID = "";
	this.productBCD = "";
	this.rZigBCD = "";
	this.vZigBCD = "";
    this.zigFlag = false;

	this.judgement = "";
	this.makeDt = new Date();
	this.cycleTime = "0";
	
	this.modelId = fnGetTagValue($XT(argLineName + "." + argRoutName + ".Process.Model_Name"));
	this.qtyOK = "0";
	this.qtyNG = "0";
	this.nar = "0";
	this.yield = "0";
	this.compFlag = false;
	this.useRout = true; //공정 사용여부
	this.workMode = fnGetTagValue($XT("COMMON." + argLineName + ".ProcMode"));
	this.dataProc = false;

	if (this.routCode == "P015560B010" || this.routCode == "P015560M010" || this.routCode == "P015560H010" || this.routCode == "P01556AC010" || this.routCode == "P018040M010") {
		this.firstRout = true;
	}

	//로딩 공정
	if (this.routCode == "P015560B010" || this.routCode == "P015560M010" || this.routCode == "P015560M100" || this.routCode == "P015560H010") {
		this.loadRout = true;
	}

	//Lot Point 설정
	if (this.routCode == "P015560B010" || this.routCode == "P015560B020" || this.routCode == "P015560B090" ||this.routCode == "P015560B120" ||this.routCode == "P015560B150" ||
		this.routCode == "P015560M010" || this.routCode == "P015560M100" || this.routCode == "P015560M110" || this.routCode == "P015560M150" ||
		this.routCode == "P015560H010" || this.routCode == "P015560H130" ||
		this.routCode == "P01556AC010" || this.routCode == "P01556AC150" || this.routCode == "P01556AC360" ||
		this.routCode == "P018040M010" || this.routCode == "P018040M070" || this.routCode == "P018040M110" || this.routCode == "P018040M260"
	) 
	{
		this.lotPoint = true;
		if (this.routCode == "P015560B010" || this.routCode == "P015560B090" || this.routCode == "P015560B120" || this.routCode == "P015560B150" ||
			this.routCode == "P015560M010" || this.routCode == "P015560M100" || this.routCode == "P015560M150" ||
			this.routCode == "P015560H010" || this.routCode == "P015560H130" ||
			this.routCode == "P01556AC150" ||	
			this.routCode == "P018040M010" || this.routCode == "P018040M070" || this.routCode == "P018040M110") 
		{
			this.rawmatTuib = true;
		} 
		else 
		{
			this.rawmatTuib = false;
		}
	}

	//불량취출 공정
	if (this.routCode == "P015560B080" || this.routCode == "P015560B230" ||
		this.routCode == "P015560M090" || this.routCode == "P015560M130" ||
		this.routCode == "P015560H120" || this.routCode == "P015560H170" ||
		this.routCode == "P01556AC070" || this.routCode == "P01556AC140" || this.routCode == "P01556AC270" || this.routCode == "P01556AC340" ||
		this.routCode == "P018040M060" || this.routCode == "P018040M100" || this.routCode == "P018040M170" || this.routCode == "P018040M250"
	) 
	{
		this.badRout = true;
	}

	//양품취출 :P31025 P41016 - 마지막 공정에 포함되어서 해당 플래그는 제외 결과처리는 동일하다.
	if (this.routCode == "P01556AC350") {
		this.okRout = true;
	}

	//반전공정
	if(this.routCode == "P018040M150")
	{
		this.reverseRout = true;
	}

	//무조건 OK 처리 되는 구간
	if (this.routCode == "P015560H100" || this.routCode == "P015560B190") {
		this.onlyOK = true;
	}

	//수동공정
	if (this.routCode == "P015560B090" || this.routCode == "P015560B120" || this.routCode == "P015560B150" ||
		this.routCode == "P01556AC150" ||
		this.routCode == "P018040M010" || this.routCode == "P018040M030" || this.routCode == "P018040M070" ||
		this.routCode == "P018040M110" || this.routCode == "P018040M190"
	) 
	{
		this.manualRout = true;
		//브레이크라인 수동 공정에서 앞선 공정의 불량발생한 제품을 취출하기 위해
		//수동 & 불량 취출 공정
		if(this.routCode == "P015560B120" || this.routCode == "P015560B150")
		{
			this.manualStop = true;
		}
		else
		{
			this.manualStop = false;
		}
	}

	//마지막 공정
	if (this.routCode == "P015560B240" ||
		this.routCode == "P015560M140" ||
		this.routCode == "P015560H120" || this.routCode == "P015560H170" ||
		this.routCode == "P01556AC360" ||
		this.routCode == "P018040M260"
	) 
	{
		if(this.modelId == "MTA656")
		{
			if(this.routCode == "P015560H120")
			{
				this.lastRout = true;
			}
		}
		else
		{
			this.lastRout = true;
		}
	}

	//공정 측정시간 쉬프트
	if (this.routCode == "P01556AC280" || this.routCode == "P01556AC290" || this.routCode == "P01556AC300" ||
		this.routCode == "P018040M230" || this.routCode == "P018040M240") {
		this.getTimeRout = true;
		this.mesureTime = "";
		if (this.routCode == "P018040M230") {
			this.procTag = "ProcData_86";
		} else if (this.routCode == "P018040M240") {
			this.procTag = "ProcData_26";
		} else if (this.routCode == "P01556AC280" || this.routCode == "P01556AC290" || this.routCode == "P01556AC300") {
			this.procTag = "ProcData_106"
		}
	}

	// 쉬프트 데이터 PLC Write 공정
	if (this.routCode == "P018040M260" || this.routCode == "P01556AC360") {
		this.putTimeRout = true;
		this.procTag = "ProcData_2";
	}

	//특정 공정의 모델 전용
	if (this.routCode == "P01556AC120" || this.routCode == "P01556AC130" || this.routCode == "P01556AC140" || this.routCode == "P01556AC150" ||
		this.routCode == "P01556AC180" || this.routCode == "P01556AC190" || this.routCode == "P01556AC200" || this.routCode == "P01556AC210" || 
		this.routCode == "P01556AC230" || this.routCode == "P01556AC240" || this.routCode == "P01556AC250" 
	) 
	{
		this.modelEx = true;
		if (this.routCode == "P01556AC150" || this.routCode == "P01556AC190" ) 
		{
			this.ExModel = "MTA656";
		} 
		else 
		{
			this.ExModel = "MTA556";
		}
	}
	//작업미시행, 스캐너가 동작을 해야하는 공정 예외 처리
	if((this.routCode == "P01556AC200" || this.routCode == "P01556AC240" || this.routCode == "P01556AC250") && this.modelId == "MTA656")
	{
		this.modelExOK = true;
	}

	// 재작업 가능 공정
	if (this.routCode == "P015560B050" || this.routCode == "P015560B070" || this.routCode == "P015560B100" ||
		this.routCode == "P015560B130" || this.routCode == "P015560B140" || this.routCode == "P015560B160" || this.routCode == "P015560B170" ||
		this.routCode == "P015560B190" || this.routCode == "P015560B200" || this.routCode == "P015560B210" || this.routCode == "P015560B220" ||
		this.routCode == "P015560M030" || this.routCode == "P015560M050" || this.routCode == "P015560M080" || this.routCode == "P015560M120" || 
		this.routCode == "P015560M140" || 
        this.routCode == "P015560H030" || this.routCode == "P015560H050" || this.routCode == "P015560H070" || this.routCode == "P015560H090" ||
		this.routCode == "P015560H100" || this.routCode == "P015560H110" || this.routCode == "P015560H140" || this.routCode == "P015560H150" ||
		this.routCode == "P01556AC010" || this.routCode == "P01556AC020" || this.routCode == "P01556AC030" || this.routCode == "P01556AC040" ||
		this.routCode == "P01556AC050" || this.routCode == "P01556AC060" || this.routCode == "P01556AC080" || this.routCode == "P01556AC090" ||
		this.routCode == "P01556AC100" || this.routCode == "P01556AC110" || this.routCode == "P01556AC130" || this.routCode == "P01556AC160" ||
		this.routCode == "P01556AC170" || this.routCode == "P01556AC180" || this.routCode == "P01556AC190" || this.routCode == "P01556AC200" ||
		this.routCode == "P01556AC210" || this.routCode == "P01556AC220" || this.routCode == "P01556AC230" || this.routCode == "P01556AC240" ||
		this.routCode == "P01556AC250" || this.routCode == "P01556AC260" || this.routCode == "P01556AC280" || this.routCode == "P01556AC290" ||
		this.routCode == "P01556AC300" || this.routCode == "P01556AC310" || this.routCode == "P01556AC320" || this.routCode == "P01556AC330" ||
		this.routCode == "P018040M020" || this.routCode == "P018040M050" || this.routCode == "P018040M090" || this.routCode == "P018040M120" ||
		this.routCode == "P018040M140" || this.routCode == "P018040M150" || this.routCode == "P018040M160" || this.routCode == "P018040M180" || 
		this.routCode == "P018040M210" || this.routCode == "P018040M220" || this.routCode == "P018040M230" || this.routCode == "P018040M240" || 
		this.routCode == "P018040M260"
	) 
	{
		this.reworkRout = true;
		if(this.routCode == "P015560B130" || this.routCode == "P015560B140")
		{
			// 브레이크 라인의 특수성으로 재작업도 무조건 작업허가 
			this.specialRework = true;
		}
	}

	//그룹 공정 및 전용모델 공정
	if(this.routCode == "P01556AC020" || this.routCode == "P01556AC030")
	{
		this.routGroup = true;
		this.prevRoutCode = "P01556AC010";
		this.nextRoutCode = "P01556AC040";

		this.routGroupName = this.routName.substring(0, this.routName.length-1);
	}
	else if(this.routCode == "P01556AC050" || this.routCode == "P01556AC060")
	{
		this.routGroup = true;
		this.prevRoutCode = "P01556AC040";
		this.nextRoutCode = "P01556AC070";

		this.routGroupName = this.routName.substring(0, this.routName.length-1);
	}
	else if(this.routCode == "P01556AC280" || this.routCode == "P01556AC290" || this.routCode == "P01556AC300")
	{
		this.routGroup = true;
		this.prevRoutCode = "P01556AC270";
		this.nextRoutCode = "P01556AC310";

		this.routGroupName = this.routName.substring(0, this.routName.length-1);
	}
	else if(!this.firstRout)
	{
		var nowRoutSeq = parseInt(this.routCode.substring(this.routCode.length-3, this.routCode.length));
		var preSeq = nowRoutSeq <= 100 ? ("0" + (nowRoutSeq - 10)) : (nowRoutSeq - 10);	
		if(this.modelId == "MTA656")
		{
			if(this.routCode == "P01556AC150")
			{
				this.prevRoutCode = "P01556AC110";
			}
			else if(this.routCode == "P01556AC190")
			{
				this.prevRoutCode = "P01556AC170";
			}
			else if(this.routCode == "P01556AC220")
			{
				this.prevRoutCode = "P01556AC200";
			}
			else if(this.routCode == "P01556AC240")
			{
				this.prevRoutCode = "P01556AC220";
			}
			else if(this.routCode == "P015560M060")
			{
				this.prevRoutCode = "P015560M010"
			}
			else
			{
				this.prevRoutCode = this.routCode.substring(0, this.routCode.length-3) + preSeq;
			}
		}	
		else if(this.modelId == "MTA556")
		{
			if(this.routCode == "P01556AC160")
			{
				
				this.prevRoutCode = "P01556AC140";
			}
			else if(this.routCode == "P01556AC200")
			{
				this.prevRoutCode = "P01556AC180";
			}
			else
			{
				this.prevRoutCode = this.routCode.substring(0, this.routCode.length-3) + preSeq;
			}
		}
		else
		{
			this.prevRoutCode = this.routCode.substring(0, this.routCode.length-3) + preSeq;
		}
	}
}

/*=====================================================스카다 태그 제어========================================================================*/

/*
Description : 이벤트 등록 함수
           단일 또는 다중 태그에 대한 이벤트 동록
FuncationCall : fnAddEvent(eventTarget, eventType, eventCallBack)
               eventTarget: 이벤트 등록할 태그배열
               eventType: 이벤트 유형
               eventCallBack: 이벤트 발생 시 동작될 함수
*/

function fnAddEvent(eventTarget, eventType, eventCallBack, objType) 
{
	if (typeof eventTarget == "string") 
	{
		$XT(eventTarget).addEventListener(eventType, eventCallBack);
	} else {
		eventTarget.forEach(function (target, index) {
			if (objType == "T") {
				$XT(target).addEventListener(eventType, eventCallBack);
			} else if (objType == "I") {
				$XI(target).addEventListener(eventType, eventCallBack);
			}

		});
	}
	fnWriteLog("[시스템][이벤트] => 등록");
	return true;
}

/*
Description : 태그 초기화 함수
           태그에 대한 초기값 셋팅
           추후 각 태그별 초기값을 각가 설정가능하도록 수정예정
FuncationCall : fnInitTag(tagList, initValue)
               tagList : 초기화할 태그리스트
               initValue : 초기값
*/
function fnInitTag(tagList, initValue) {
	for (var i = 0; i < tagList.length; i++) {
		$XT(tagList[i]).value = initValue;
	}
	fnWriteLog("[시스템][초기화] => TagValue 초기화");
	return true;
}

/*
   Description : 가상바코드 생성
*/
function fnCreateBCD(realBarcode) {
	var date = new Date();
	return realBarcode + "-" + date.format("yyyyMMddHHmmss");
}

/*=====================================================공통함수========================================================================*/

//문자열 분리
function fnSubString(str, chr) {
	return str.substring(str.indexOf(chr) + 1, str.length - 1);
}


//value 기준으로 정렬
//ASC: orderTpye = A, DESC : orderType = D
function fnObjSort(routDict, orderType) 
{
	var sortArr = []
	for (var routName in routDict) {
		sortArr.push([routName, routDict[routName]]);
	}
	if(orderType == "A")
	{
		sortArr.sort(function (a, b) {
			return (a[1] < b[1] ? -1 : (a[1] > b[1] ? 1 : 0));
		});
	}
	else
	{
		sortArr.sort(function (a, b) {
			return (a[1] > b[1] ? -1 : (a[1] < b[1] ? 1 : 0));
		});

	}
	var orderDict = {};
	for (var idx in sortArr) {
		orderDict[sortArr[idx][0]] = sortArr[idx][1];
	}
	
	return orderDict;
}

function fnDeleteRout(argZigBCD, argprodID) 
{
	//지그 바코드 사용완료로 업데이트
	DBProcZigData({
		VBCD: argZigBCD
		,PROC_FALG:"U"
	});
	routMemory[argprodID] = null;
	return delete routMemory[argprodID];
}

/*=====================================================착완공 프로세스========================================================================*/

//효율 계산 및 태그 입력 함수
function fnCalcOEE(argLine, argRout, dbProc) {
	var routList = routInfo[argLine];
	var firstRoutName = "";
	var lastRoutName = "";
	
	for(var routName in routList)
	{
		var rout = routList[routName];
	
		if(rout.F_ROUT)
		{
			firstRoutName = routName;
		}
		
		if(rout.L_ROUT)
		{
			lastRoutName = routName;
		}
	}
	
	var totCount = $XT(argLine + "." + argRout + ".Event.Total_Count").value;
	var ngCnt = $XT(argLine + "." + argRout + ".Event.NG_Count").value;

	var playTime = $XT(argLine + "." + argRout + ".Display.PlayTime").value; //장비동작시간
	var stopTime = $XT(argLine + "." + argRout + ".Display.StopTime").value; //정지시간
	var pmTime = $XT(argLine + "." + argRout + ".Display.PmTime").value; //계획정지시간

	var loadTime = (playTime + stopTime) - pmTime;  //부하시간
	var upTime = loadTime-stopTime; //가동시간

	var planCycleTime =  $XT("COMMON." + argLine + ".PlanCycleTime").value;//계획 사이클타임
	var todayPlan = $XT("COMMON." + argLine + ".TodayPlan").value;
	
	$XT(argLine + "." + argRout + ".Display.LoadTime").value = loadTime;
	$XT(argLine + "." + argRout + ".Display.UpTime").value = upTime;

	var playRate = 0.0;
	var goodRate = 0.0;
	var presRate = 0.0;
	var totRate = 0.0;

	if (totCount > 0) 
	{
		goodRate = Math.round(((totCount - ngCnt) / totCount) * 100) ; //양품율
	}
	if (upTime > 0 && loadTime > 0) 
	{
		playRate = Math.round((upTime / loadTime) * 100) ; //가동율
	}
	if (upTime > 0) 
	{
		presRate = Math.round((upTime / (planCycleTime * todayPlan)) * 100) ; //진도율
	}
	totRate = Math.round( (playRate * presRate * goodRate) / 10000 ); //설비종합효율

	$XT(argLine + "." + argRout + ".Display.PlayRate").value = playRate
	$XT(argLine + "." + argRout + ".Display.GoodRate").value = goodRate
	$XT(argLine + "." + argRout + ".Display.PresRate").value = presRate
	$XT(argLine + "." + argRout + ".Display.TotRate").value =  totRate
	
	//라인 효율
	if(argRout == lastRoutName)
	{
		var totNgCount = 0;
	
		for(var routName in routList)
		{
			var rout = routList[routName]
			if(!rout.L_ROUT)
			{
				//마지막 공정을 제외한 불량수량
				totNgCount += $XT(argLine + "." + routName + ".Event.NG_Count").value;
			}
		}
		// ( 마지막 공정 양품 / (마지막공정 양품 + 마지막공정을 제외한 불량의 총수량) ) * 100
		var  tmpGoodRate = Math.round($XT(argLine + "." + argRout + ".Event.Good_Count").value / ( $XT(argLine + "." + argRout + ".Event.Good_Count").value + totNgCount ) * 100) 

		$XT("COMMON." + argLine + ".GoodRate").value = tmpGoodRate
		$XT("COMMON." + argLine + ".PlayRate").value = playRate
		$XT("COMMON." + argLine + ".PresRate").value = presRate
		$XT("COMMON." + argLine + ".TotRate").value =  Math.round( (playRate * presRate * tmpGoodRate) / 10000 ); //설비종합효율

		if(dbProc)
		{
			DBProcOEEData(argLine, argRout);
			fnWriteLog("생산 효율 DB저장")
		}
	}
}


//중간 재투입 데이터 생성
function fnMakeImitationData(argRoutNode)
{
	var routNode = argRoutNode;
	fnWriteLog("[" + routNode.routName + "][중간 투입] => 데이터 생성 시작");
	//중간 재투입
	var lineInfo = routInfo[routNode.lineName];
	for(var routName in lineInfo)
	{
		var routCode = lineInfo[routName].CODE;
		if(routCode < routNode.routCode && routNode.prevRoutCode == routCode)
		{
			var tmpNode = routMemory[routNode.prodID].search(routName);
			if(tmpNode == null)
			{
				routMemory[routNode.prodID].insert(routNode.lineName, routName, routCode, routNode.routName);
				tmpNode = routMemory[routNode.prodID].search(routName);

				tmpNode.prodID = routNode.prodID;
				tmpNode.productBCD = routNode.productBCD;
				tmpNode.rZigBCD = routNode.rZigBCD;
				tmpNode.vZigBCD = routNode.vZigBCD;
				tmpNode.judgement = tmpNode.badRout ? "NT" : "OK";
				tmpNode.zigFlag = fnChkZig(tmpNode.prodID);
				tmpNode.dataProc = true;
				
				if(tmpNode.lotPoint)
				{
					DBProcLotData(tmpNode);
				}
			}
			console.log(tmpNode);
			routNode = tmpNode;
		}	
	}
	fnWriteLog("[" + routNode.routName + "][중간 투입] => 데이터 생성 종료");
}	

/*
Descaription : 그룹태그에서 특정 태그를 찾아온다.
FunctionCall : fnGetTagList(container, tagList, tagName);
            tagList = 동적으로 만든 태그 Dict
             container = 찾은 태그를 담을 객체 (array)
            tagName = 찾을 태그, 배열형태(array)
*/
function fnGetSearchTag(container, tagList, tagName) {
	for (var key in tagList) {
		if (typeof tagList[key] == "object") {
			fnGetSearchTag(container, tagList[key], tagName);
		} else {
			var tmpTagName = key.split('.')[3];
			//찾고자 하는 태그가 하나인 경우 indexOf가 먹히지 않음
			//length = 1를 통한 처리 추가
			if (tagName.length == 1) {
				if (tagName[0] == tmpTagName) {
					container.push(key);
				}
			} else {
				if (tagName.indexOf(tmpTagName) > -1) {
					container.push(key);
				}
			}
		}
	}
	return container;
}

function fnGetTagValue(obj)
{
	if(obj == null)
	{
		fnWriteLog("태그 없음 : " + obj.fullName);
		return "";
	}
	else
	{
		var objVal = obj.value;
		if (typeof objVal === 'undefined' || objVal == null || objVal == "") {
			return "";
		} else {
			var ful_str = "";
			// 바코드에 포함되어 들어오는 STX,ETX,CR,LF 제거
			for (var i = 0; i < objVal.length; i++) {
				var _ch = objVal[i].charCodeAt();
				// 2번-stx, 3번-ext, 7번-BEL 10번-LF, 13번-CR, 32-space
				if (_ch == 2 || _ch == 3 || _ch == 7 || _ch == 10 || _ch == 13) {
				} else {
					ful_str = ful_str + objVal[i];
				}
			}
			ful_str = ful_str.replace(/(^\s*)|(\s*$)/g, ""); //오른쪽공백

			return ful_str;
		}

	}
}
/*==================================================================================================
| 부하를 감소시키기 위해 DataBase에 대한 접근을 최대한 제한하기 위한, 내부적인 메모리 구조를 생성 로직
| DoublyLinkedList를 통해 Node를 연결하여, 공정의 데이터 흐름을 제어
| 장비로부터 수신된 LotNo을 Key로 제품별 제어
==================================================================================================*/
/* fnGetRoutMemory : 생성된 내부메모리 구조를 return
         lineName : 라인명
         routName : 공정명
         mode: R=리커버리, N=노말
         argBCD: 리커버리 모드의 경우, key로 사용될 LotNo */
function fnGetRoutMemory(lineName, routName) 
{
    var prodID = fnGetTagValue($XT(lineName + "." + routName + ".Process.Lot_ID"));
	fnWriteLog("[" + routName + "][공정메모리] => 리딩된 BCD: " + prodID);
	if(prodID == "")
	{
		return null;
	}

	var routCode = routCodeDict[routName];
	if (routCode == "P015560B010" || routCode == "P015560M010" || routCode == "P015560H010" || routCode == "P018040M010") {
		//사용된 지그에 대한 데이터 초기화 및 DB업데이트
		if (prodID in routMemory) 
		{
			if (routMemory[prodID].head.next != null && routMemory[prodID].length > 1) {
				//지그 바코드 사용완료 업데이트 및 메모리초기화
				var delResult = fnDeleteRout(routMemory[prodID].head.vZigBCD, prodID);
				fnWriteLog("[" + routName + "][내부자료구조] => Zig 초기화: " + delResult);
			}
		}
	}

	/* ==========================================================================================
	| 공정별로 작업완료에 대한 착완공이 종료되기전까지 LotNo을 가지고 있다는 전제하에 수행로직
	| 설비로부터 읽어진 바코드를 키값으로 객체가 없다면, 새로운 객체를 생성
	| 만약, 키값을 기준으로 객체가 있다면 기존 객체에 linkedlist 형태로 이어준다.
	=============================================================================================*/
	var routNode = null;
	/* 전역객체의 키값 여부 확인 */
	if (prodID in routMemory) {
		//신규생성이 아닌경우에 대한 처리
		//생성되어 있는 현재 공정을 찾음
		routNode = routMemory[prodID].search(routName);
		if (routNode == null) 
		{
			//현재 공정에 대한 정보가 없는 경우 생성
			routMemory[prodID].append(lineName, routName, routCodeDict[routName])
			routNode = routMemory[prodID].search(routName);
			
			//바코드 처리
			routNode.prodID = prodID;
			routNode.rZigBCD = routNode.prev.rZigBCD;
			routNode.vZigBCD = routNode.prev.vZigBCD;
			routNode.modelId = fnGetTagValue($XT(routNode.lineName + "." + routNode.routName + ".Process.Model_Name"));
		}
		else
		{
			if(routNode.judgement != "")
			{
				routNode.workMode = "R";
			}
			return routNode;
		}
	} 
	else 
	{
		var newLinkedList = new DLinkedList();
		routMemory[prodID] = newLinkedList.append(lineName, routName, routCodeDict[routName]);
		routNode = routMemory[prodID].search(routName);
		routNode.modelId = fnGetTagValue($XT(routNode.lineName + "." + routNode.routName + ".Process.Model_Name"));

		fnWriteLog("[" + routName + "][내부자료구조] => 신규 생성: " + routNode);
		/*=======================================================================================
		| 리커버리모드가 아닌경우에 대한 바코드 처리
		| PLC로부터 읽은 LotNo이 zig인경우 가상바코드 생성
		| zig 사용관리를 위해서 zigData DataBase에 저장
		| LotTracking을 위해서 zig LotNo을 DataBase에 저장
		=======================================================================================*/
		//리딩 바코드가 지그인 경우
		if (fnChkZig(prodID))
		{
    		//작업중인 공정의 바코드값 할당
			routNode.prodID = prodID;
			routNode.rZigBCD = prodID;
			routNode.vZigBCD =  fnCreateBCD(prodID);

			//ZIG DATA DB 처리
			DBProcZigData({
				VBCD: routNode.vZigBCD,
				RBCD: routNode.rZigBCD,
				ROUTCD: routNode.routCode,
				END_YN: "N",
				PROC_FLAG: "I"
			});
		} 
		else 
		{
			//ZIG DATA DB 처리
			var rZBCD = "";
			var routType = routNode.routCode.substring(0,8);
			if(mkCount == 0)
			{
				mkCount = 9999;
			}
			switch(routType)
			{
				case "P015560B":
					rZBCD = "BRK-" + mkCount++;
					break;
				case "P015560M":
					rZBCD = "ARM-" + mkCount++;
					break;
				case "P015560H":
					rZBCD = "MTA-" + mkCount++;
					break;
				case "P01556AC":
					rZBCD = "MTA-" + mkCount++;
					break;
				case "P018040M":
					rZBCD = "BTA804-" + mkCount++;
					break;
			}
			fnWriteLog(rZBCD);
			
			routNode.prodID = prodID;
			routNode.vZigBCD = fnCreateBCD(rZBCD);
			routNode.rZigBCD = rZBCD;
			
            if(routNode.length == 1)
            {
                //제품을 인식한 경우 zig바코드 처리
                DBProcZigData({
                    VBCD: crtVBCD,
                    RBCD: rZBCD,
                    ROUTCD: routNode.routCode.substring(0,4) + "01",
                    END_YN: "N",
					PROC_FLAG: "I"
                });
            }
		}
    }
    routNode.zigFlag = fnChkZig(prodID);
	routNode.workMode = $XT("COMMON." + lineName + ".ProcMode").value;
	//중간 재투입
	if (!routNode.firstRout && routNode.prev == null) 
	{
		routNode.workMode = "R";
		fnMakeImitationData(routNode);
		//중간 데이터 처리
		DBProcMidTuinProcData(routNode);
	}
	return routNode;
}

function fnWatchDogConn(connection){
	connection.forEach(function (element){
		var lineName = element.split('.')[0];
		var routName = element.split('.')[1];
		var connTag = $XT(element);

		if(fnChkDevConn(lineName))
		{			
			console.log("애니메이션 true");
			//fnWriteLog(lineName + "/" + devConnResult);
			$XT("COMMON." + lineName + ".RAIL_YN").value = true;
			if(connTag.value)
			{
				if(!$XT(lineName + "." + routName + ".Procchk.frompc_pcready").value)
				{
					$XT(lineName + "." + routName + ".Procchk.frompc_pcready").value = true;
				}
				if($XT(lineName + "." + routName + ".Procchk.frompc_1sec").value)
				{
					$XT(lineName + "." + routName + ".Procchk.frompc_1sec").value = false;
				}
				else
				{
					$XT(lineName + "." + routName + ".Procchk.frompc_1sec").value = true;
				}
			}
			else
			{
				$XT(lineName + "." + routName + ".Procchk.frompc_pcready").value = false;
			}
		}
		else
		{			
			console.log("애니메이션 false");
			$XT("COMMON." + lineName + ".RAIL_YN").value = false;
			$XT(lineName + "." + routName + ".Display.R").value = false;
			$XT(lineName + "." + routName + ".Display.G").value = false;
			$XT(lineName + "." + routName + ".Display.Y").value = false;
		}
	});
}

function fnWatchDogOEE(oneSecTags) 
{
	// oee 저장을 위한 타임 체크 변수 감소(1시간 기준 초단위)
	var dbProc = false;
	var oeeTimeOut = $XT("COMMON.OeeTimeOut");
	oeeTimeOut.value = oeeTimeOut.value - 1;

	if(oeeTimeOut.value == 0)
	{
		dbProc = true;
	}

	oneSecTags.forEach(function (element) {
		var lineName = element.split('.')[0];
		var routName = element.split('.')[1];

		if(fnChkDevConn(lineName))
		{
			//마지막 공정의 StateDown 값을 확인
			//플레이, 스탑 Time을 갱신
			if ($XT(lineName + "." + routName + ".State.Down").value) 
			{
				$XT(lineName + "." + routName + ".Display.StopTime").value += 1;
				$XT(lineName + "." + routName + ".Display.PlayTime").value += 1;
			} 
			else if ($XT(lineName + "." + routName + ".State.EQP_State").value == "N") 
			{
				$XT(lineName + "." + routName + ".Display.PlayTime").value += 1;
			} 
			else if ($XT(lineName + "." + routName + ".State.EQP_State").value == "P") 
			{
				$XT(lineName + "." + routName + ".Display.PmTime").value += 1;
			}

			if ($XT(lineName + "." + routName + ".State.Down").value) {} 
			else if ($XT(lineName + "." + routName + ".State.Proc_State").value == "I") 
			{
				$XT(lineName + "." + routName + ".Display.IdleTime").value += 1;
			} 
			else if ($XT(lineName + "." + routName + ".State.Proc_State").value == " R") 
			{
				$XT(lineName + "." + routName + ".Display.RunTime").value += 1;
			}

			fnCalcOEE(lineName, routName, dbProc);
		}
		else
		{
			
			if ($XT("_System.DateTime.Day").value != $XT("COMMON.Day").value) 
			{
				$XT("COMMON.Day").value = $XT("_System.DateTime.Day").value;
				//설비 시간값 초기화
				$XT(lineName + "." + routName + ".Display.IdleTime").value = 0;
				$XT(lineName + "." + routName + ".Display.PlayTime").value = 0;
				$XT(lineName + "." + routName + ".Display.PmTime").value = 0;
				$XT(lineName + "." + routName + ".Display.StopTime").value = 0;
				$XT(lineName + "." + routName + ".Display.RunTime").value = 0;
			}
		}
	});
	
	if(oeeTimeOut.value == 0)
	{
		oeeTimeOut.value = 3600;
	}
}

function fnEventAlarmState(event)
{
	var tagName = event.target.name;
	var stateVal = event.target.value;
	var lineName = event.target.fullName.split('.')[0];
	var routName = event.target.fullName.split('.')[1];

	if(tagName == "Alarm_Code")
	{
		DBProcAlarmInfo(lineName, routName, $XT(lineName + "." + routName + ".Event.Alarm_Code").value);
		DBProcEQPAlarm(lineName, routName);
	}
	
	if(lineName != "LINE_3" && lineName != "LINE_4")
	{
		DBProcAlarmHisr(lineName, routName);
	}	
}


// 알람발생, 장비상태변화, 공정상태변화 이벤트
// 알람발생 - 알람이력DB 저장, 장비상태DB UP, 장비상태변화 이력 DB저장
// 장비상태변화 - 장비상태DB UP
// 공정상태변화 - 장비상태DB UP
function fnEventEqpState(event) 
{
	var tagName = event.target.name;
	var stateVal = event.target.value;
	var lineName = event.target.fullName.split('.')[0];
	var routName = event.target.fullName.split('.')[1];

	var opText = "Normal";
	var alarmLv = $XT(lineName + "." + routName + ".Event.Alarm_Level").value;
	var eqpState = $XT(lineName + "." + routName + ".State.Proc_State").value;

	//통신이 연결되어 있는 경우
	if( fnChkDevConn(lineName) )
	{
		switch (eqpState) 
		{
			case "N":
				if (alarmLv == 2 || alarmLv == 1) {
					$XT(lineName + "." + routName + ".State.Down").value = true;
					opText = "Down";
				} else if (alarmLv == 0) {
					$XT(lineName + "." + routName + ".State.Down").value = false;
					opText = "Normal";
				} else {
					$XT(lineName + "." + routName + ".State.Down").value = false;
					opText = "-";
				}
				break;
			case "P":
				opText = "PM";
				break;
			default:
				if (alarmLv == 2 || alarmLv == 1) {
					$XT(lineName + "." + routName + ".State.Down").value = true;
					opText = "Down";
				} else if (alarmLv == 0) {
					$XT(lineName + "." + routName + ".State.Down").value = false;
					opText = "Normal";
				} else {
					$XT(lineName + "." + routName + ".State.Down").value = false;
					opText = "-";
				}
				break;
		}
		$XT(lineName + "." + routName + ".Display.OpTxt").value = opText;


		var procText = "-";
		var procState = $XT(lineName + "." + routName + ".State.Proc_State").value
		switch (procState) 
		{
			case "I":
				//전체 신호 초기화
				if(lineName != "LINE_3" && lineName != "LINE_4")
				{
					// PLC와 착완공을 진행하는 경우
					if(fnChkPLCConnection(lineName).length == 0)
					{
						$XT(lineName + "." + routName + ".Procchk.frompc_bar").value = false;
						$XT(lineName + "." + routName + ".Procchk.frompc_ok").value = false;
						$XT(lineName + "." + routName + ".Procchk.frompc_ng").value = false;
						$XT(lineName + "." + routName + ".Procchk.frompc_complete").value = false;
					}
				//fnWriteLog("[시스템][" + routName + "] => 착완공 신호 초기화");
				}
				procText = "IDLE";
				break;
			case "R":
				procText = "RUN";
				break;
			case "E":
				procText = "EMPTY";
				break;
			case "S":
				procText = "SKIP";
				break;
			case "P":
				procText = "PAUSE";
				break;
			case "A":
				procText = "ALARM";
				break;
			default:
				break;
		}
		$XT(lineName + "." + routName + ".Display.StateTxt").value = procText;

			
		if(lineName != "LINE_3" && lineName != "LINE_4")
		{
			DBProcEQPState(lineName, routName);
		}

	}
}

function fnEventChkModelName(event) {
	var e = event.target;
	var tagName = e.name;
	var tagFullName = e.fullName;
	var tagVal = e.value;
	var lineName = tagFullName.split('.')[0];
	var routName = tagFullName.split('.')[1];

	if ($XT(lineName + "." + routName + ".Display.ChkModel").value == '' || tagVal == '') {
		return;
	}

	if (tagVal == $XT(lineName + "." + routName + ".Display.ChkModel").value) {
		$XT(lineName + "." + routName + ".Display.chkM").value = false;
	} else {
		$XT(lineName + "." + routName + ".Display.chkM").value = true;
	}
}

/*
   Description : change 이벤트 콜백함수
              착완공 신호 처리 및 각 신호별 로직처리
*/
function fnEventTransfer(event) {
	var e = event.target;
	var tagName = e.name;
	var tagFullName = e.fullName;
	var tagValue = e.value;

	var nameSplit = tagFullName.split('.');
	var lineName = nameSplit[0];
	var routName = nameSplit[1];
	
	/* ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
	 | 착완공이 발생하는 라인 모든 설비에 대한 MES ON 상태 체크	|
	 | 하나라도 OFF 상태이면 착완공 미진행					|
	 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
	var chkRoutConn = fnChkPLCConnection(lineName);
	if(chkRoutConn.length == 0)
	{
		/*ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
		｜ 송수신 이벤트에 대한 플래그 값으로 true 또는 false라는 전제하에 수행 |    
		｜ 이때 플래그가 참인 경우에만 로직적 처리가 들어가기 때문에            |  
		｜ 현재공정에 대한 생성 또는 추적을 한다.                         |  
		 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/
		if (tagValue) 
		{
			//한 제품(바코드)에 대한 공정의 데이터 생성
			var routNode = fnGetRoutMemory(lineName, routName);
			if(routNode == null)
			{
				//$XT(lineName + "." + routName + ".Procchk.frompc_ng").value = true;
				fnSystemErrMsg("설비 에러 발생", "바코드 리딩 에러", lineName + "라인-" + routName + "공정에서 바코드 리딩 에러발생 확인하세요.");
				fnWriteLog("[" + routName + "][착완공-바코드 누락] 신호 미전송");
			}
			else
			{
				switch (tagName) 
				{
					case "topc_bar":
						$XT(lineName + "." + routName + ".Procchk.frompc_bar").value = true;
						fnWriteLog("[" + routNode.prodID + "][" + routName + "][착완공-바코드리딩1] => PLC송신 -> SCADA");
						//재작업 모드
						if ($XT("COMMON." + lineName + ".ProcRoutYN").value == "Y" && $XT("COMMON." + lineName + ".ProcMode").value == "R") 
						{
							if ($XT(lineName + "." + routName + ".Display.RoutYN").value) 
							{
								//바코드리딩 착완공의 결과에 따라 작업허가 또는 배출 신호 처리
								if (fnEventBCDRead(routNode)) {
									$XT(lineName + "." + routName + ".Procchk.frompc_ok").value = true;
									fnWriteLog("[" + routNode.prodID + "][" + routName + "][" + routNode.prodID + "][착완공-작업허가1] => 동적라우팅 작업허가 : SCADA송신 -> PLC)");
								} 
								else 
								{
									$XT(lineName + "." + routName + ".Procchk.frompc_ng").value = true;
									fnWriteLog("[" + routNode.prodID + "][" + routName + "][" + routNode.prodID + "][착완공-작업패스1] => 재작업 작업패스 : SCADA송신 -> PLC");
								}
							} 
							else 
							{
								if(routNode.badRout)
								{
									if($XT(routNode.lineName + "." + routNode.routName + ".Display.RoutJudge").value == "NG")
									{
										$XT(lineName + "." + routName + ".Procchk.frompc_ok").value = true;
										fnWriteLog("[" + routNode.prodID + "][" + routName + "][" + routNode.prodID + "][착완공-작업허가1] => 재작업 작업허가 : SCADA송신 -> PLC)");
									}
									else if($XT(routNode.lineName + "." + routNode.routName + ".Display.RoutJudge").value == "OK")
									{
										$XT(lineName + "." + routName + ".Procchk.frompc_ng").value = true;
										fnWriteLog("[" + routNode.prodID + "][" + routName + "][" + routNode.prodID + "][착완공-작업허가1] => 재작업 작업패스 : SCADA송신 -> PLC)");
									}
								}
								else
								{
									$XT(lineName + "." + routName + ".Procchk.frompc_ng").value = true;
									fnWriteLog("[" + routNode.prodID + "][" + routName + "][" + routNode.prodID + "][착완공-작업허가1] => 재작업 작업패스 : SCADA송신 -> PLC)");
								}
							}
						} 
						//노말 생산 모드
						else 
						{
							//바코드리딩 착완공의 결과에 따라 작업허가 또는 배출 신호 처리
							if (fnEventBCDRead(routNode)) 
							{
								$XT(lineName + "." + routName + ".Procchk.frompc_ok").value = true;
								fnWriteLog("[" + routNode.prodID + "][" + routName + "][" + routNode.prodID + "][착완공-작업허가1] => 작업허가 : SCADA송신 -> PLC)");
							} 
							else 
							{
								$XT(lineName + "." + routName + ".Procchk.frompc_ng").value = true;
								fnWriteLog("[" + routNode.prodID + "][" + routName + "][" + routNode.prodID + "][착완공-작업패스1] => 작업패스 : SCADA송신 -> PLC");
							}
						}
					
						$XT(lineName + "." + routName + ".Procchk.frompc_bar").value = false;
						fnWriteLog("[" + routNode.prodID + "][" + routName + "][" + routNode.prodID + "][착완공-바코드리딩2] => SCADA신호 OFF");
						fnWriteLog("================================================================================");
						
						break;
						//작업허가 처리
					case "topc_ok":
						fnWriteLog("[" + routNode.prodID + "][" + routName + "][" + routNode.prodID + "][착완공-작업허가2] => PLC송신 -> SCADA수신");
						//불량 취출이며 재작업 아닐경우 공정인 경우만 수행
						if (routNode.badRout) 
						{
							fnEventPermission(routNode);
						}
						$XT(lineName + "." + routName + ".Procchk.frompc_ok").value = false;
						fnWriteLog("[" + routNode.prodID + "][" + routName + "][" + routNode.prodID + "][착완공-작업허가3] => SCADA 신호 OFF");
						fnWriteLog("================================================================================");
						break;
						//작업배출 처리
					case "topc_ng":
						fnWriteLog("[" + routName + "][착완공-작업패스2] => PLC송신 -> SCADA");
						fnEventEmission(routNode);
						break;
						//작업완료 처리
					case "topc_complete":
						if(routNode.firstRout)
						{
							if($XT(lineName + "." + routName + ".Procchk.topc_pass").value)
							{
								var delResult = fnDeleteRout(routMemory[routNode.prodID].head.vZigBCD, routNode.prodID);
								fnWriteLog("[" + routNode.prodID + "][" + routName + "][내부자료구조] => 장비미사용(Skip) Zig 초기화: " + delResult);
		
								$XT(lineName + "." + routName + ".Procchk.frompc_complete").value = true;
								fnWriteLog("[" + routNode.prodID + "][" + routName + "][착완공-작업완료2] => SCADA송신 -> PLC");
							}
							else
							{
								fnWriteLog("[" + routNode.prodID + "][" + routName + "][착완공-작업완료1] => PLC송신 -> SCADA");
								fnEventComp(routNode);
							}
						}
						else
						{
							fnWriteLog("[" + routNode.prodID + "][" + routName + "][착완공-작업완료1] => PLC송신 -> SCADA");
							fnEventComp(routNode);
						}
						break;
				}
			}
		} 
		else 
		{
			if (tagName == "topc_complete") 
			{
				fnWriteLog("[" + routName + "][착완공-작업완료3] => PLC송신 -> SCADA");
				$XT(lineName + "." + routName + ".Procchk.frompc_complete").value = false;
				fnWriteLog("[" + routName + "][착완공-작업완료4] => SCADA 신호OFF");
				fnWriteLog("================================================================================");
			}
		}
	}
	else
	{
		fnSystemErrMsg("통신 에러 발생", "PLC MES OFF", lineName + "라인의 MES ON 모드인지 확인하세요.");
		fnWriteLog("MES OFF - [" + lineName + "][" + chkRoutConn + "]");
	}
}
/*===============================================================================================
| 착완공 1단계 - 바코드 리딩
| PLC로부터 리딩된 바코드를 읽어오며, 그에 따른 작업허가/배출 여부를 송신
| 현공정의 판접값이 있는경우 재작업으로 인식하고, 재작업 로직 수행
| return: true=작업허가, false=작업배출
===============================================================================================*/
function fnEventBCDRead(routNode) 
{
	if (routNode.putTimeRout) 
	{
		var putTime = "";
		var prevRout = routNode.prev;
		while (prevRout) {
			var putTime = prevRout.mesureTime;
			fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-바코드리딩] => 측정시간 put: " + putTime);
			if (typeof putTime !== 'undefined' && putTime != "" && putTime != null) {
				$XT(routNode.lineName + "." + routNode.routName + ".Process." + routNode.procTag).value = putTime;
				break;
			}
			prevRout = prevRout.prev;
		}
	}
	// 공정 인터락
	// 누락 공정 체크, 이전 공정들의 불량 확인, DB처리 확인
	if(!routNode.firstRout)
	{
		if(!fnChkValidation(routNode))
		{
			if(routNode.badRout)
			{
				fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-바코드리딩] => 누락 또는 불량 인터락: 불량취출 허가");
				return true;
			}
			else
			{	
				fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-바코드리딩] => (누락 또는 불량) OR(그룹공정 중복 작업) 인터락: 작업패스");
				return false;
			}
		}
	}

	/*공정의 판정값이 없거나, PS인경우 처리
	PS인 경우 현공정의 판정값이 존재, 재작업이지만 재작업로직 처리시 현공정에 대한 처리를 하지 않는다.
	PS는 작업패스로 처리되었기때문에 해당 공정의 재작업 가능여부를 신경쓰지 않아도 된다.*/
	//로드 공정은 무조건 작업 허가
	fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-바코드리딩] => 현재공정 판정값: " + routNode.judgement);
	//그룹 공정
	if(routNode.loadRout) 
	{
		fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-바코드리딩] => 로딩 공정 : 무조건 작업허가");
		return true;
	}
	//이전 공정이 없는경우 해당 제품의 첫 공정으로 처리
	//중간 투입을 위한 로직
	else if (routNode.prev == null) 
	{
		fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-바코드리딩] => 이전 공정 정보 없음");
		//불량취출 공정이면
		if (routNode.badRout) {
			fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-바코드리딩] => 불량취출공정 : 작업허가");
			return true;
		}
		//전용모델 공정
		else if (routNode.modelEx) 
		{
			fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-바코드리딩] => 전용모델 공정");
			//해당 공정의 전용 모델인 경우'
			if (routNode.modelId == routNode.ExModel) 
			{
				if (routNode.badRout) {
					fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-바코드리딩] => 전용모델 불량취출공정 : 작업패스");
					return true;
				} else {
					//작업허가
					fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-바코드리딩] => 전용모델 일반공정 : 작업허가");
					return false;
				}
			}
			//해당 공정의 전용 모델이 아닌경우
			else {
				fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-바코드리딩] => 전용모델 아닌 제품 : 작업패스");
				return false;
			}
		} else {
			fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-바코드리딩] => 첫투입 시점 : 작업허가");
			return true;
		}
	}
	// 이전 공정에 대한 데이터는 존재 
	// PS는 불량제품에 대한 재작업을 위한 처리
	// 앞공정에서 NG가 발생했고, 그에 따라 작업을 안하고 패스처리가 된 공정이기떄문에.
	else if (routNode.judgement == "" || routNode.judgement == "PS") 
	{
		// 현재 공정은 처음 수행 또는 작업을 하지 않은 공정
		var prevJudgement = fnChkPrevJudge(routNode);
		//이전 공정의 판정값이 NG 또는 PS인 경우
		if (prevJudgement == "NG" || prevJudgement == "PS" || prevJudgement == "OT") 
		{
			//무조건 반전을 안해도 되는 반전 공정
			if(routNode.reverseRout)
			{
				fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-바코드리딩] => 반전 미진행 공정 : 작업패스");
				return false;
			}
			//수동 공정 또는 무조건 OK처리가 되는 공정
			else if (routNode.manualRout) 
			{
				//브레이크 라인 한정
				//불량 취출을 하는 수동 공정
				if(routNode.manualStop)
				{
					fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-바코드리딩] => 불량취출 가능한 수동 공정 : 작업허가");
					return true;
				}
				else
				{
					fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-바코드리딩] => 수동 공정 : 작업패스");
					return false;
				}
			}
			//무조건 작업 허가
			else if(routNode.onlyOK)
			{
				fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-바코드리딩] => 무조건 작업 허가 공정 : 작업허가");
				return true;
			}
			//모델 전용 공정
			else if (routNode.modelEx) 
			{
				fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-바코드리딩] => 전용모델 공정");
				//전용모델 구간에서 작업가능한 제품일경우
				if (routNode.modelId == routNode.ExModel) 
				{
					if (routNode.badRout) 
					{
						fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-바코드리딩] => 전용모델 불량취출 공정 : 작업허가(불량 취출)");
						return true;
					} 
					else 
					{
						fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-바코드리딩] => 전용모델 일반공정 : 작업패스");
						return false;
					}
				}
				//생산 제품이 전용 모델이 아닌경우
				else 
				{
					fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-바코드리딩] => 전용모델 아닌 제품 : 작업패스");
					return false;
				}
			} 
			else if (routNode.badRout ) 
			{
				fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-바코드리딩] => 불량취출: 작업허가");
				return true;
			}
			else if(routNode.routGroup)
			{						
				fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-바코드리딩] => 그룹공정 : 작업패스 ");
				return false;
			}
			else 
			{
				fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-바코드리딩] => 일반 공정 : 작업패스");
				return false;
			}
		}
		//이전 공정의 판정값이 OK 또는 NT인경우
		else if(prevJudgement == "OK" || prevJudgement == "NT") 
		{
			if (routNode.manualRout || routNode.onlyOK) 
			{
				fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-바코드리딩] => 수동 또는 무조건OK 공정 : 작업허가");
				return true;
			}
			//모델 전용 공정
			else if (routNode.modelEx) 
			{
				fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-바코드리딩] => 전용모델 공정");
				//전용모델 구간에서 작업가능한 제품일경우
				if (routNode.modelId == routNode.ExModel) {
					if (routNode.badRout) {
						fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-바코드리딩] => 전용모델 불량취출 공정 : 작업패스");
						return false;
					} else {
						fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-바코드리딩] => 전용모델 일반공정 : 작업허가");
						return true;
					}
				}
				//생산 제품이 전용 모델이 아닌경우
				else 
				{
					fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-바코드리딩] => 전용모델 공정 : 작업패스");
					return false;
				}
			} 
			else if (routNode.badRout) 
			{
				fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-바코드리딩] => 불량취출 공정 : 작업패스");
				return false;
			} 
			else if(routNode.routGroup)
			{	
				var prevNode = routMemory[routNode.prodID].tail.prev;
				fnWriteLog(prevNode);
				while(prevNode)
				{
					if(prevNode.routGroup && prevNode.routGroupName == routNode.routGroupName)
					{
						return false;
					}
					prevNode = prevNode.prev;
				}
				return true;
			}
			else 
			{
				fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-바코드리딩] => 일반공정 : 작업허가");
				return true;
			}
		} 
		else 
		{
			fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-바코드리딩] => 작업허가");
			return true;
		}
	}
	//재작업
	else 
	{
		var prevJudgement = fnChkPrevJudge(routNode);
		//불량취출 공정은 무조건 재작업 가능
		//이전 공정 판정값에 따라 진행
		if (routNode.badRout) 
		{
			if (prevJudgement == "NG" || prevJudgement == "PS") 
			{
				fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-바코드리딩] => 재작업 불량취출 공정 이전판정값 " + prevJudgement + ": 작업허가 ");
				return true;
			} 
			else 
			{
				fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-바코드리딩] => 재작업 불량취출 공정 이전판정값 " + prevJudgement + ": 작업패스");
				return false;
			}
		}
		//수동공정은 무조건 재작업 
		else if(routNode.manualRout)
		{
			fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-바코드리딩] => 재작업 수동 공정: 작업허가 ");
			return true;			
		}
		else if(routNode.onlyOK)
		{
			fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-바코드리딩] => 무조건 허가 공정 : 작업허가 ");
			return true;	
		}
		else if(routNode.lastRout)
		{
			if(routNode.judgement == "OK")
			{
				fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-바코드리딩] => 무조건 허가 공정 : 작업허가 ");
				return true;	
			}
			else
			{
				fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-바코드리딩] => 무조건 허가 공정 : 작업패스 ");
				return false;	
			}
		}
		//재작업 가능 공정의 경우
		else if (routNode.reworkRout) 
		{
			//현재 공정의 판정값이 OK인 경우
			//재작업 가능 공정이라도 작업 패스
			if(routNode.judgement == "OK")
			{
				if(routNode.specialRework)
				{
					fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-바코드리딩] => 재작업 가능|현공정 판정값OK - 특수 공정(보빈비전) : 작업허가 ");
					return true;
				}
				else
				{
					fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-바코드리딩] => 재작업 가능|현공정 판정값OK : 작업패스 ");
					return false;
				}
			}
			//현재 공정 판정값이 OK가 아닌경우
			else
			{
				//이전 공정의 판정값에 따라 동작한다.
				//현재 공정이 NG,PS
				if(prevJudgement == "NG" || prevJudgement == "PS" || prevJudgement == "OT")
				{
					fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-바코드리딩] => 재작업 가능|이전 공정 판정값 " + prevJudgement +  ": 작업패스 ");
					return false;
				}
				else
				{
					fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-바코드리딩] => 재작업 가능|이전 공정 판정값 " + prevJudgement +  ": 작업허가 ");
					return true;
				}
			}
		}
		//재작업 불가능 공정의 경우
		else 
		{
			fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-바코드리딩] => 재작업 불가 공정 : 작업패스");
			return false;
		}
	}
}

/*==================================================================================================
| 착완공 2단계 - 공정의 작업허가 처리
| 불량취출 공정에서 작업허가를 했을시에 대한 처리 로직
| 생산실적 및 zig 사용완료 DB처리 후, 자료구 삭제
==================================================================================================*/
function fnEventPermission(routNode) 
{
	fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-작업허가] => 불량제품 배출처리 시작");
	//불량취출이 배출되기전 데이터 처리를 위한 로직

	routNode.judgement = "OT";
	fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-작업허가] => 불량배출 판정값: OT");

	//배출에 대한 ProcData DB 처리
	//DB데이터 처리
    // DB 데이터 처리만 하면되기때문에 두번째 파라미터인 신호 제어값은 "" 할당
    DBProcProcData(routNode, "");
	fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-작업허가] => 불량 배출 처리 완료");
}

/*==================================================================================================
| 착완공 2단계 - 공정의 작업패스 처리
==================================================================================================*/
function fnEventEmission(routNode) 
{	
	if ($XT("COMMON." + routNode.lineName + ".ProcRoutYN").value == "Y" && $XT("COMMON." + routNode.lineName + ".ProcMode").value == "R") 
	{
		fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-작업패스] => 재작업 처리 시작");
		var routJudge = $XT(routNode.lineName + "." + routNode.routName + ".Display.RoutJudge").value;
		routNode.judgement = routJudge;
		if(routJudge == "OK")
		{
			//배출
			if(routNode.badRout)
			{
				routNode.judgement = "NT"; //현재 공정에 할당
			}
		}

		if(routNode.prev != null)
		{
			var prevJudgement = routNode.prev.judgement;
			if(prevJudgement == "NG" || prevJudgement == "OT" || prevJudgement == "PS")
			{
				routNode.judgement = "PS";
			}
		}

		fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-작업패스] => 재작업 처리 판정값 : " + routNode.judgement);
		DBProcReworkData(routNode);
	} 
	else 
	{
		fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-작업패스] => 처리 시작");
		if(routNode.modelExOK)
		{
			routNode.judgement = "OK";
			routNode.dataProc = true;
			$XT(routNode.lineName + "." + routNode.routName + ".Procchk.frompc_ng").value = false;
			fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-작업패스3] MTA656 작업을 하지 않고 스캔만 하는 공정에 대한 예외처리  => SCADA 신호 OFF ");
			fnWriteLog("================================================================================");
		}
		else if(routNode.routGroup)
		{	
			
			//같은 그룹의 공정을 진행한 경우 덮어 씌우기
			var prevNode = routMemory[routNode.prodID].tail.prev;
			while(prevNode)
			{
				if(prevNode.routGroup && prevNode.routGroupName == routNode.routGroupName)
				{
					$XT(routNode.lineName + "." + routNode.routName + ".Procchk.frompc_ng").value = false;
					routMemory[routNode.prodID].delete(routNode.routName);
				}
				prevNode = prevNode.prev;
			}
		}
		else 
		{
			if(routNode.judgement == "")
			{
				if (routNode.badRout) //현재공정이 불량취출일때
				{
					//배출
					routNode.judgement = "NT"; //현재 공정에 할당
				}
				else
				{
					routNode.judgement = "PS"
				}
			}
			else
			{
				if(routNode.judgement == "OT" && routNode.badRout)
				{
					routNode.judgement = "NT";
				}
				else if(routNode.judgement == "NG" && routNode.judgement == "PS")
				{
					routNode.judgement = "PS";
				}
				else
				{
					routNode.judgement = routNode.judgement;
				}
			}
			//배출에 대한 ProcData DB 처리
			//DB데이터 처리
            DBProcProcData(routNode,"P");
			fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-작업패스] => 판정 결과 : " + routNode.judgement);
		}

		fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-작업패스] => 처리 완료");
	}
	
	
}

// 착완공
function fnEventComp(argNode) 
{
	var routNode = argNode;
	fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-작업완료] => 처리 시작");
    // PLC로부터 현공정에서의 작업에 대한 판정 값 
    
    var productBCD = fnGetTagValue($XT(routNode.lineName + "." + routNode.routName + ".Process.Product_ID"));
	var rcvJudge = fnGetTagValue($XT(routNode.lineName + "." + routNode.routName + ".Process.Judgement"));
	// 판정값 처리
	if (rcvJudge == null || rcvJudge == "" || typeof rcvJudge === 'undefined') 
	{
		fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-작업완료] => PLC 판정 없음");
		//불량취출 공정 처리
		if (routNode.badRout) {
			routNode.judgement = "OT";
			fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-작업완료] => 불량취출 공정 판정 : OT");
		}
		//수동 불량 처리
		else if (routNode.manualRout) 
		{
			if(routNode.manualStop)
			{
				if(routNode.prev.judgement == "NG" || routNode.prev.judgement == "OT" || routNode.prev.judgement == "PS")
				{
					routNode.judgement = "PS"
					fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-작업완료] => 불량취출 가능 수동 공정 판정 : PS");
				}
				else
				{
					routNode.judgement = "OK";
					fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-작업완료] => 수동공정 판정 : OK");
				}
			}
			else
			{
				routNode.judgement = "OK";
				fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-작업완료] => 수동공정 판정 : OK");
			}
		}
		// 양품 취출 처리
		else if (routNode.okRout) {
			routNode.judgement = "OK";
			fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-작업완료] => 양품취출 판정 : OK");
		}
		// 로드 공정 처리
		else if (routNode.loadRout) {
			routNode.judgement = "OK";
			fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-작업완료] =>  로드공정 판정 : OK");
		}
		// 반전 공정 처리
		else if (routNode.reverseRout) 
		{
			//이전 공정 정보 없을때
			if (routNode.prev == null) 
			{
				routNode.judgement = "OK";
			}
			//이전 공정 정보가 있을때
			else {
				routNode.judgement = routNode.prev.judgement;
			}
			fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-작업완료] => 반정공정 판정결과: " + routNode.judgement);
		}
		// 일반공정인 경우
		else 
		{
			if (routNode.prev == null) 
			{
				routNode.judgement = "OK";
				fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-작업완료] => 일반공정 이전 공정 없는 경우 판정 : OK");
			} else if (routNode.prev.judgement == "NT") {
				routNode.judgement = "OK";
				fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-작업완료] => 일반공정 이전 공정 판정 NT 경우 : OK");
			} else {
				routNode.judgement = routNode.prev.judgement;
				fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-작업완료] => 일반공정 이전 공정 판정 : " + routNode.judgement);
			}
		}
	} 
	else if (routNode.reverseRout) 
	{
		// 반전 공정 - 무조건 OK처리
		// 이때, 문제점은 다음공정에서 이전 공정 값을 확인시에
		// 반전공정은 무조건 OK이기 때문에 불량 제품도 처리한다.
		if (routNode.prev == null) {
			routNode.judgement = "OK";
			fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-작업완료] => 반전공정 이전 공정 정보 없음 : OK");
		} else {
			routNode.judgement = routNode.prev.judgement;
			fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-작업완료] => 반전공정 이전 공정 판정 정보 쉬프트 : " + routNode.judgement);
		}
	} 
	else if(routNode.onlyOK)
	{
		if(routNode.prev.judgement == "NG" || routNode.prev.judgement == "PS" || routNode.prev.judgement == "OT")
		{
			routNode.judgement = routNode.prev.judgement;
			fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-작업완료] => 무조건 작업허가 공정 최종 판정값 : " + routNode.judgement);
		}
		else
		{
			routNode.judgement = rcvJudge;
			fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-작업완료] => 무조건 작업허가 공정 최종 판정값 : " + routNode.judgement);
		}
	}
	else 
	{
		if(rcvJudge == "NG" && routNode.badRout)
		{
			rcvJudge = "OT";
		}
		else if(rcvJudge == "OK" && routNode.badRout)
		{
			rcvJudge = "NT";
		}
		routNode.judgement = rcvJudge;
		fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-작업완료] => PLC 수신 판정결과:" + routNode.judgement);
	}
	//특정 공정에 Date 쉬프트를 위한 처리 로직
	if (routNode.getTimeRout) 
	{
		fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-작업완료] => 측정시간 get : " + fnGetTagValue($XT(routNode.lineName + "." + routNode.routName + "." + "Process." + routNode.procTag)));
		routNode.mesureTime = fnGetTagValue($XT(routNode.lineName + "." + routNode.routName + ".Process." + routNode.procTag));
    }
    
    routNode.productBCD = productBCD;
    DBProcProcData(routNode, "C");

	if(routNode.judgement == "NG")
	{
		$XT("COMMON.LogNGText").value = "[라인명:" + routNode.lineName + "] [공정명:" + routNode.routName + "] [공정코드:" + routNode.routCode + "] [SerialNO:" + routNode.prodID + "]";
	}

	// Lot가 변경되는 시점
	if (routNode.lotPoint) 
	{
		fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-작업완료] => LotPoint 제품BCD: " + productBCD);
		DBProcLotData(routNode)
		//LotPoint지만 기존 바코드 흐름을 유지
		//DB데이터만 처리한다.
		if (!routNode.rawmatTuib) 
		{
			//새로운 바코드로 키값을 변경
			var newLinkedList = new DLinkedList();
			routMemory[productBCD] = newLinkedList.objCopy(routMemory[routNode.prodID]);
			routNode = routMemory[productBCD].search(routNode.routName);
			routNode.prodID = productBCD;
			fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-작업완료] => LotPoint 흐름 바코드: " + routNode.prodID);
		}
	} 
	
	//마지막 공정
	if (routNode.lastRout) {
		//일일 생산 수량 목표 달성 여부 체크
		fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-작업완료] => 마지막 공정 처리 시작");
		fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-작업완료] => ZigBCD : " + routNode.vZigBCD);
		fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-작업완료] => prodID : " + routNode.prodID);

		getPlanCntEnd(routNode.head, routNode.tail);

		if ($XT("COMMON." + lineName + ".ProcRoutYN").value && $XT("COMMON." + lineName + ".ProcMode").value == "R") 
		{
			//ReworkHist 업데이트
			$XD("mssql").execute("UPDATE.REWORK_PROC_DATA", {BCD:routNode.prodID}
			, function (data) {}
			, function (msg) 
			{
				fnWriteLog("[DataBase][updateRework] => DataBase Insert Error: " + msg);
			});
		}	
		//지그 바코드 사용완료 업데이트 및 메모리초기화
		var delResult = fnDeleteRout(routNode.vZigBCD, routNode.prodID);
		fnWriteLog("[" + routNode.routName + "][착완공-작업완료] => 자료구조 삭제: " + delResult);
	}
}

function fnChkZig(argBCD)
{
	if(argBCD.length <= 11)
	{
		return true;
	}
	else
	{
		return false;
	}
}

function fnChkPrevJudge(routNode)
{
	//바로 직전의 판정값이 널인경우 
	var prevJudgement = routNode.prev.judgement;
	if (prevJudgement == "" || prevJudgement == null) 
	{
		var tempRoutNode = routNode.prev;
		while (tempRoutNode) 
		{
			prevJudgement = tempRoutNode.judgement;
			if (prevJudgement != "") 
			{
				fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-바코드리딩] => 이전 공정[" + tempRoutNode.routName + "] 판정값 : " + prevJudgement);
				break;
			}
			tempRoutNode = tempRoutNode.prev
		}
	} 
	return prevJudgement;
}

function fnChkValidation(routNode)
{
	//이전 공정 수행 여부 확인
	if(routNode.routGroup)
	{
		var prevNode = routMemory[routNode.prodID].tail.prev;
		while(prevNode)
		{
			if(prevNode.routGroup && prevNode.routGroupName == routNode.routGroupName)
			{
				fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][Validation][그룹 공정 중복수행] =>" + prevNode.routGroupName);
				return false;
			}
			prevNode = prevNode.prev;
		}
	}
	
	else if(routNode.prevRoutCode != routNode.prev.routCode)
	{
		if(routNode.prev.routGroup)
		{
			if(routNode.prev.nextRoutCode != routNode.routCode)
			{
				fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][Validation][그룹 공정 진행 누락] =>" + routNode.prev.routName + "-그룹공정 중복 수행");
				return false;
			}
		}
		else
		{
			fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][Validation][앞공정 진행 누락] => 이전 : " + routNode.prev.routName + "(" + routNode.prev.routCode + ")-공정 순서 미일치");
			fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][Validation][앞공정 진행 누락] => 이전수행해야할 것 : (" + routNode.prevRoutCode + ")-공정 순서 미일치");
			fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][Validation][앞공정 진행 누락] => 현재 : " + routNode.routName + "(" + routNode.routCode + ")-공정 순서 미일치");
			return false;
		}
	}
	//이전 공정의 판정 정보 존재 유무 확인	
	if(routNode.prev.judgement == "")
	{
		fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][Validation][앞공정 진행 누락] =>" + routNode.prev.routName + "(" + routNode.prev.prevRoutCode + ")-판정값 Null");
		return false;
	}
	//이전 공정의 DB처리 유무 확인
	var tempRN = routNode.prev;
	while(tempRN)
	{
		if(!tempRN.dataProc)
		{
			fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][Validation][앞공전 DB 미처리]" + tempRN.routName);
			return false;
		}
		tempRN = tempRN.prev;
	}

	return true;
}

function fnChkDevConn(lineName) 
{
	var connectFlag = true;
	//해당 라인 전장비가 정상 Connect : ""
	//한 장비라도 Not Connect : 연결안된 장치명
	if(lineName in devList)
	{
		devList[lineName].forEach(function(dev)
		{
			if(!$XI(dev).isAlive)
			{
				connectFlag = false;
			}
		});
	}
	return connectFlag;
}

/* =========================================
PLC 연결 확인 
착완공 시작 시 라인별 PLC - MES ON 여부 체크
라인에서 한 설비라도 MES OFF 상태인 경우 False 반환
============================================ */
function fnChkPLCConnection(argLineName)
{
	var checkList = new Array();
	for(var key in connection){
		var splitName = connection[key].split('.');
		var lineName = splitName[0];

		if(lineName == argLineName)
		{
			checkList.push(connection[key]);
		}
	}
	var rtnVal = new Array();
	if(checkList != null)
	{
		checkList.forEach(function(element){
			var splitName = element.split('.');
			var lineName = splitName[0];
			var routName = splitName[1];
			if(!$XT(lineName + "." + routName + ".Procchk.connection").value)
			{
				rtnVal.push(routName);
			}
		});
	}
	return rtnVal;
}

const excludeTags = ["_System", "_Devices", "_Alarms", "COMMON"]; //예외 태그
// 장치 리스트 생성
var devList = (function () {
	var devObj = new Object();
	var devices = scada.devices;
	for (var i = 0; i < devices.count; i++) 
	{
		var devName = devices.getAt(i).name;
		var splitName = devName.split('_');
		var lineName = splitName[0] + "_" + splitName[1]
		if(lineName in devObj)
		{
			devObj[lineName].push(devName);
		}
		else
		{
			devObj[lineName] = new Array();
			devObj[lineName].push(devName);
		}
	}
	return devObj;
}());

// 모든 태그의 풀네임으로 Object 생성
var tagList = (function getTagList(container, tags) {
	for (var i = 0; i < tags.count; i++) {
		var tag = tags[i];
		if (excludeTags.indexOf(tag.fullName) < 0) {
			//개발자 정의 태그 인경우
			if (tag.type == "group" && tag.children != null) {
				container[tag.name] = new Object();
				getTagList(container[tag.name], tag.children);
			} else {
				container[tag.fullName] = "";
			}
		}
	}
	return container;
}(new Object(), scada.tags));

var routCodeDict = (function () {
	var rtnDict = new Object();
	var tags = scada.tags;
	for (var i = 0; i < tags.count; i++) {
		var lineTag = tags[i];
		if (excludeTags.indexOf(lineTag.name) < 0) 
		{
			var routTags = lineTag.children;
			for (var j = 0; j < routTags.count; j++) 
			{
				var routTag = routTags[j];
				rtnDict[routTag.name] = $XT(lineTag.name + "." + routTag.name + ".State.PROC_ID").value;
			}
		}
	}
	return fnObjSort(rtnDict, "A");
}());

var routInfo = (function()
{
	var rtnObj = new Object();
	var tags = scada.tags;
	for (var i = 0; i < tags.count; i++) {
		var lineTag = tags[i];
		if (excludeTags.indexOf(lineTag.name) < 0) 
		{
			rtnObj[lineTag.name] = new Object();
			
			var routTags = lineTag.children;
			for (var idx = 0; idx < routTags.count; idx++) 
			{
				var routTag = routTags[idx];
				var routCode = $XT(lineTag.name + "." + routTag.name + ".State.PROC_ID").value;
				var order = Number(routCode.substr(routCode.length-3, 3))/10;
				var firstFlag = false;
				var lastFlag = false;

				
				if(order == 1)
				{
					firstFlag = true;
				}

				if(order == routTags.count)
				{
					lastFlag = true;
				}
				rtnObj[lineTag.name][routTag.name] = {CODE :routCode , ORDER: order, F_ROUT: firstFlag, L_ROUT : lastFlag };
			}
			rtnObj[lineTag.name] = fnObjSort(rtnObj[lineTag.name], "D");
		}
	}
	return rtnObj;
}());


//라인별 공정 갯수
var routCnt = (function getRoutCnt(tags){
	var tempRoutObj = new Object();
	for (var i = 0; i < tags.count; i++) {
		var tag = tags[i];
		if (excludeTags.indexOf(tag.fullName) < 0) {
			tempRoutObj[tag.name] = tag.children.count;
		}
	}
	return tempRoutObj;
}(scada.tags));


function getPlanCntEnd(firstRout, lastRout)
{
	var todayPlan = $XT(firstRout.lineName + "." + firstRout.routName + ".Display.TodayPlan").value;
	var nowCnt = $XT(lastRout.lineName + "." + lastRout.routName + ".Event.Good_Count").value;
	if (todayPlan <= nowCnt) 
	{
		$XT("COMMON." + lastRout.lineName + ".End").value = 0;
	}
}

// 데이터 보관주기에 따른 데이터 삭제 처리
function deleteDataLog()
{
	if ($XT("COMMON.SaveDB").value == 0) return;
	// eqp_hisr, alarm_hisr, proc_data 테이블 delete
}
setInterval(deleteDataLog, 86400000);

    
//전역 내부메모리
var routMemory = null;
//시스템 시작
$XT("COMMON.SysStart").addEventListener("change", function (event) {
	var tagValue = event.target.value;
	if (tagValue == "1") {
		if (routMemory != null) {
			for (var key in routMemory) {
				routMemory[key] = null;
				delete routMemory[key];
			}
		}
		routMemory = new Object();
		var procMode = $XT("COMMON.SysMode").value;
		
		if(procMode == "N")
		{
			fnSystemSetting();
		}
		//리커버리 실행
		else if (procMode == "RC") 
		{
			fnSystemRecovery();	
		} 
	}
	else
	{
		$XT("COMMON.SysLoad").value = 0;
	}
});

var connection = fnGetSearchTag(new Array(), tagList, "connection");
function fnTimeInit(){
	if ($XT("_System.DateTime.Day").value != $XT("COMMON.Day").value) 
	{
		$XT("COMMON.Day").value = $XT("_System.DateTime.Day").value;
		//설비 시간값 초기화
		var timeTags = fnGetSearchTag(new Array(), tagList, ["PlayTime", "PmTime", "StopTime"]);
		fnInitTag(timeTags, 0);
	}
}

//시스템 셋팅
function fnSystemSetting() {
	var sysSettingCount = 7;
	var tagSysLoad = $XT("COMMON.SysLoad");
	var sysLoadValue = Math.round(100 / sysSettingCount) + 1;

	setInterval(function () {
		fnWatchDogConn(connection)
	}, 500);
	tagSysLoad.value += sysLoadValue;

	setInterval(function () {
		fnWatchDogOEE(connection)
	}, 1000);
	tagSysLoad.value += sysLoadValue;

	setTimeout(function () {

		var modelName = fnGetSearchTag(new Array(), tagList, "Model_Name");
		fnAddEvent(modelName, "change", fnEventChkModelName, "T");
		tagSysLoad.value += sysLoadValue;

		var alarmState = fnGetSearchTag(new Array(), tagList, ["Alarm_Level", "Alarm_Code"]);
		fnAddEvent(alarmState, "change", fnEventAlarmState, "T");
		tagSysLoad.value += sysLoadValue;

		var eqpState = fnGetSearchTag(new Array(), tagList, ["EQP_State", "Proc_State"]);
		fnAddEvent(eqpState, "change", fnEventEqpState, "T");
		tagSysLoad.value += sysLoadValue;

		var procRoutYN = ["COMMON.MTA_BRAKE.ProcMode", "COMMON.MTA_MAIN.ProcMode", "COMMON.MTA_CAN.ProcMode", "COMMON.MTA_HOUSING.ProcMode", "COMMON.BTA_MAIN.ProcMode"
						 ,"COMMON.MTA_BRAKE.ProcRoutYN", "COMMON.MTA_MAIN.ProcRoutYN", "COMMON.MTA_CAN.ProcRoutYN", "COMMON.MTA_HOUSING.ProcRoutYN", "COMMON.BTA_MAIN.ProcRoutYN"
						 ,"COMMON.MTA_BRAKE.ResetData", "COMMON.MTA_MAIN.ResetData", "COMMON.MTA_CAN.ResetData", "COMMON.MTA_HOUSING.ResetData", "COMMON.BTA_MAIN.ResetData"];
		fnAddEvent(procRoutYN, "change", fnSystemRework, "T");
		tagSysLoad.value += sysLoadValue;

		var procTags = fnGetSearchTag(new Array(), tagList, ["topc_bar", "topc_ok", "topc_ng", "topc_complete"]);
		fnAddEvent(procTags, "change", fnEventTransfer, "T");
		tagSysLoad.value += sysLoadValue;
	}, 4000);

	//공정 창고 데이터 조회
	DBProcStuck();

	//아마추어 라인 기본 셋팅
    fnSystemAmaSetting();

	//테스트용 데이터 셋팅
	//fnSystemTest()
}


function fnSystemAmaSetting()
{
    /* 아마추어 3/4라인 작화 코드 */
	//아마추어 3/4 라인 통신연결상태 체크 및 레일 애니메이션
	setInterval(function(){
		
		if(fnChkDevConn("LINE_3"))
		{
			$XT("COMMON.LINE_3.RAIL_YN").value = true;
		}
		else
		{
			$XT("COMMON.LINE_3.RAIL_YN").value = false;
		}
		if(fnChkDevConn("LINE_4"))
		{
			$XT("COMMON.LINE_4.RAIL_YN").value = true;
		}
		else
		{
			$XT("COMMON.LINE_4.RAIL_YN").value = false;
		}
	}, 1000);
	//아마추어 3/4 라인 30분 단위 효율 조회 
	
	DBProcAmaOEE();
}

function fnSystemRework(event)
{
	var fullNameSplit = event.target.fullName.split('.');
	var rootName = fullNameSplit[0]
	var lineName = fullNameSplit[1];
	var tagName = fullNameSplit[2];

	if(tagName == "ResetData")
	{
		//데이터 초기화 추가할것
		if(routMemory != null && event.target.value)
		{
			for(var bcd in routMemory)
			{
				if(routMemory[bcd].head.lineName == lineName)
				{
					routMemory[bcd] = null;
					delete routMemory[bcd];
				}
			}
			fnWriteLog(lineName + ": 내부 데이터 초기화 완료");
		}
		setTimeout(function(){
			event.target.value = false;	
		}, 3000);
	
	}
	else if(tagName == "ProcMode")
	{
		if(event.target.value == "N")
		{
			$XT(rootName + "." + lineName + ".ProcRoutYN").value = "D";
			var dynamicRout = fnGetSearchTag(new Array(), tagList, ["RoutJudge", "RoutYN"]);		
			dynamicRout.forEach(function(element)
			{
				var tag = element;
				var tagLineName = tag.split('.')[0];
				var tagName = tag.split('.')[3];
				if(tagLineName == lineName) 
				{
					if(tagName == "RoutJudge")
					{
						$XT(tag).value = "OK";
					}
					else if(tagName = "RoutYN")
					{
						$XT(tag).value = true;
					}
				}
			});
		}	
	}
	else if(tagName == "ProcRoutYN")
	{
		// ProcRoutYN = Y:재작업, N: 취소, D:기본값
		if(event.target.value =="Y" && $XT(rootName + "." + lineName + ".ProcMode").value == "R")
		{	
			fnWriteLog("DB Select");
			var lineCode = "";
			switch(lineName)
			{
				case "MTA_BRAKE":
					lineCode = "P3";
					break;
				case "MTA_CAN":
					lineCode = "P4";
					break;
				case "MTA_HOUSING":
					lineCode = "P5";
					break;
				case "MTA_MAIN":
					lineCode = "P6";
					break;
				case "BTA_MAIN":
					lineCode = "P7";
					break;
			}

			$XD("mssql").execute("SELECT.REWORK_LIST", {PROC_LINE : lineCode} , function (data) 
			{
				if(data != null)
				{	
					for (var i = 0; i < data.count; i++) 
					{
						var rowData = data.getAt(i);
						var barCode = rowData.getValueByName("SBCD");
						var routCode = rowData.getValueByName("PROC_ID");
						var routName = "";
						for(var routNm in routCodeDict)
						{
							if(routCodeDict[routNm] == routCode)
							{
								routName = routNm;
								break;
							}
						}
						var routNode = null;
						/* 전역객체의 키값 여부 확인 */
						if (barCode in routMemory) 
						{
							//신규생성이 아닌경우에 대한 처리
							//생성되어 있는 현재 공정을 찾음
							var routNode = routMemory[barCode].search(routName);
							if (routNode == null) 
							{
								//현재 공정에 대한 정보가 없는 경우 생성
								routMemory[barCode].append(lineName, routName, routCode)								
							}
						} 
						else 
						{
							var newLinkedList = new DLinkedList();
							routMemory[barCode] = newLinkedList.append(lineName, routName, routCode);
						}

						routNode = routMemory[barCode].search(routName);
						routNode.prodID = barCode;
						routNode.judgement = rowData.getValueByName("JUDGE");
						routNode.modelId = rowData.getValueByName("MODEL_ID");
						routNode.makeDt = rowData.getValueByName("MAKE_DT");
						routNode.workMode = rowData.getValueByName("MODE");
						routNode.dataProc = true;
						fnWriteLog("now: " + routNode);
						fnWriteLog("prevRoutCode: " + routNode.prevRoutCode);
						if(routNode.prev != null)
						{
							fnWriteLog("prev:" + routNode.prev);
							fnWriteLog("prev.RoutCode:" + routNode.prev.routCode);
						}

					}				
				}
			}, 
			function (msg) 
			{
				fnWriteLog(msg);
			});
		}
		else if(event.target.value == "N")
		{
			event.target.value = "D";
			$XT(rootName + "." + lineName + ".ProcMode").value = "N";
		}
	}
}


//리커버리 모드
function fnSystemRecovery() {
	var lotNoList = fnGetSearchTag(new Array(), tagList, "Lot_ID");
	lotNoList.forEach(function (tag) 
	{
		var barcode = fnGetTagValue($XT(tag));
		if (barcode != "" && !(barcode in routMemory)) 
		{
			
			var lineName = tag.split('.')[0];
			var routName = tag.split('.')[1];
			fnWriteLog("바코드 : " + barcode + "/lineName:" + lineName + "/routName:" + routName);
			$XD("mssql").execute("recoverySql", {
				BCD: barcode,
			}, 
			function (data) 
			{
				
				if(data != null)
				{	
					var tmpNode = null;
					for (var i = 0; i < data.count; i++) 
					{
						var rowData = data.getAt(i);
						var barcode = rowData.getValueByName("BCD");
						var procID = rowData.getValueByName("PROC_ID");
						var procName = "";
						for(var routNm in routCodeDict)
						{
							if(routCodeDict[routNm] == procID)
							{
								procName = routNm;
							}
						}
						/* 전역객체의 키값 여부 확인 */
						if (barcode in routMemory) 
						{
							//신규생성이 아닌경우에 대한 처리
							//생성되어 있는 현재 공정을 찾음
							tmpNode = routMemory[barcode].search(procName);
							if (tmpNode == null) 
							{
								//현재 공정에 대한 정보가 없는 경우 생성
								routMemory[barcode].append(lineName, procName, procID)								
							}
						} 
						else 
						{
							var newLinkedList = new DLinkedList();
							routMemory[barcode] = newLinkedList.append(lineName, procName, procID);
						}

						tmpNode = routMemory[barcode].search(procName);
						tmpNode.prodID = barcode;
						tmpNode.judgement = rowData.getValueByName("PROD_JUDGE");
						tmpNode.modelId = rowData.getValueByName("MODEL_ID");
						tmpNode.makeDt = rowData.getValueByName("PROD_MAKE_DATETIME");
						tmpNode.workMode = rowData.getValueByName("PROD_MODE");
						tmpNode.dataProc = true;

						fnWriteLog(tmpNode.routCode);

					}
				}
				else
				{
					fnGetRoutMemory(lineName,routName);
				}

				var routNode = routMemory[barcode].search(routName);
				if ($XT(routNode.lineName + "." + routNode.routName + ".Procchk.topc_bar").value) 
				{
					if (fnEventBCDRead(routNode)) {
						$XT(lineName + "." + routNode.routName + ".Procchk.frompc_ok").value = true;
						fnWriteLog("[" + routNode.routName + "] 바코드 리딩 - 작업허가 SCADA 신호 ON");
						
					} 
					else 
					{
						$XT(lineName + "." + routName + ".Procchk.frompc_ng").value = true;
						fnWriteLog("[" + routNode.routName + "] 바코드 리딩 - 작업패스 SCADA 신호 ON");
					}
				} 
				else if ($XT(routNode.lineName + "." + routNode.routName + ".Procchk.topc_complete").value) 
				{
					if (fnEventComp(routNode)) {
						//작업완료 처리가 정상적으로 된경우만
						fnWriteLog("[" + routName + "] 작업완료 - SCADA 신호 ON");
						
					}
				}

			}, 
			function (msg) 
			{
				fnWriteLog("[DB:recoverySql] - Error: " + msg);
			});
		}
	});

	//기본 시스템 셋팅
	fnSystemSetting();
}

/* Parameter Description
	errType : 에러 발생 유형, 에러가 발생한 개체의 구분 목적
	errLine : 퓨트로닉 한정, 에러가 발생한 라인며ㅕㅇ
	errMsg : 에러 발생 내용
*/
function fnSystemErrMsg(errType,  errLine, errMsg)
{
	var errMsgObj = $XT("COMMON.errMsg")
	var msg = "" 
	if(errMsgObj.value != null && errMsgObj.value != "")
	{
		msg = errMsgObj.value + "\n\n"; 
		msg += "==================구분선================= \n\n"
	}
	msg += "에러유형 : " + errType + "\n"
	msg += "에러발생지 : " + errLine + "\n"
	msg += "에러내용 : " + errMsg

	$XT("COMMON.SysErrorMsg").value = msg;
	fnWriteLog(msg);
}

function fnWriteLog(logMsg)
{
	console.log(logMsg);
	$XT("COMMON.SysLog").value = logMsg;
}

function fnProcDataLog(dataMsg)
{
	var log = "";
	for(key in obj)
	{
		log += key + ":" + obj[key] + " | ";
	}

	$XT("COMMON.SysProcDataLog").value = log;
	
}

//DB처리 시작============================================================================================================
/*
Lot Tracking 용 - ZigData DB 처리
param { VBCD : zigBarcode + yyyyMMddHHmmss 
        RBCD : zigBarcode
        ROUTCD : 공정바코드
*/
function DBProcZigData(param) {
	if(param.PROC_FLAG == "I")
	{
		$XD("mssql").execute("INSERT.ZIG_DATA", param
	, function (data) {}
	, function (msg) 
	{
		fnSystemErrMsg("DataBase Error", "DBProcZigData 처리 오류", msg);
		fnWriteLog("[DataBase][DBProcZigData] => DataBase Insert Error: " + msg);
	});
	}else if(param.PROC_FLAG == "U")
	{
		$XD("mssql").execute("UPDATE.ZIG_DATA", param
	, function (data) {}
	, function (msg) 
	{
		fnSystemErrMsg("DataBase Error", "DBProcZigData 처리 오류", msg);
		fnWriteLog("[DataBase][DBProcZigData] => DataBase Update Error: " + msg);
	});
	}
}

/* 
    Description : Lot Data 저장, Lot Tracking을 위한 데이터 처리
    param  = { BCD : 진행바코드
               PBCD: 상위 바코드
               ROUTCD: 공정코드
               ZIG_YN: zig여부 Y or N  }
*/
function DBProcLotData(routNode) 
{
    var param = {
        PBCD : ""
        ,BCD : ""
        ,PROC_ID : routNode.routCode
        ,ZIG_YN : "N"
    }
    //자재 투입 공정
    if(routNode.rawmatTuib) 
    {
        param.BCD = routNode.productBCD
        param.PBCD = (routNode.zigFlag == true ? routNode.vZigBCD : routNode.prodID)
        param.ZIG_YN = (routNode.zigFlag == true ? "Y" : "N")
    }
	//흐름이 변하는 경우
    else 
    {
        param.BCD = (routNode.zigFlag == true ? routNode.vZigBCD : routNode.prodID)
        param.PBCD = routNode.productBCD   
        param.ZIG_YN = routNode.zigFlag == true ? "Y" : "N"
    }
	
	$XD("mssql").execute("INSERT.LOT_DATA", param,
		function (data) {},
		function (msg) {
			fnSystemErrMsg("DataBase Error", "DBProcLotData 처리 오류", msg);
			fnWriteLog("[DataBase][DBProcLotData] => DataBase Insert Error: " + msg);
		}
	);
}

/* 
    Description : 생산 실적 DB 처리
    param  = {   }
*/
function DBProcProcData(routNode, procType) {
	
	fnWriteLog("[" + routNode.routName + "][" + routNode.prodID + "][착완공-작업완료2] 생산실적 DB처리 시작");
	
	var procTagList = $XT(routNode.lineName + "." + routNode.routName + ".Process").children;
	var procDataCnt = 120;
	var maxToolCnt = 3;

	var param = {
		BCD: "",
		PBCD: "",
		NBCD: "",
		PROC_ID: routNode.routCode,
		MAKE_DT: routNode.makeDt,
		EQP_ID: routNode.eqpId,
		MODEL_ID: routNode.modelId,
		JUDGE: routNode.judgement,
		MODE: routNode.workMode,
		CT: $XT(routNode.lineName + "." + routNode.routName + ".Process.CycleTime").value,
		QTY_OK: $XT(routNode.lineName + "." + routNode.routName + ".Event.Good_Count").value,
		QTY_NG: $XT(routNode.lineName + "." + routNode.routName + ".Event.NG_Count").value,
		NAR: routNode.nar,
		YIELD: routNode.yield
	}
       
    if(routNode.lineName == "MTA_BRAKE" || routNode.lineName == "MTA_CAN" || routNode.lineName == "MTA_HOUSING")
    {
        param.BCD = routNode.zigFlag == true ? routNode.vZigBCD : routNode.prodID
        if(routNode.firstRout)
        {
            param.PBCD = routNode.vZigBCD
            param.NBCD = routNode.vZigBCD + "-" + routNode.routCode
        }
        else
        {
            param.PBCD = routNode.vZigBCD + "-" + routNode.prev.routCode
            param.NBCD = routNode.vZigBCD + "-" + routNode.routCode
        }
    }
    else if(routNode.lineName == "MTA_MAIN")
    {
        param.BCD = routNode.zigFlag == true ? routNode.vZigBCD : routNode.prodID
        if(routNode.firstRout)
        {
            param.PBCD = routNode.vZigBCD + "-" + routNode.routCode
            param.NBCD = routNode.productBCD + "-" + routNode.routCode
        }
        else if(routNode.lastRout)
        {
            param.PBCD = routNode.prodID + "-" + routNode.prev.routCode
            param.NBCD = routNode.productBCD
        }
        else
        {
            param.PBCD = routNode.prodID + "-" + routNode.prev.routCode
            param.NBCD = routNode.prodID + "-" + routNode.routCode
        }
    }
    else if(routNode.lineName == "BTA_MAIN")
    {
        param.BCD = routNode.vZigBCD
        if(routNode.firstRout)
        {
            param.PBCD = routNode.vZigBCD
            param.NBCD = routNode.vZigBCD + "-" + routNode.routCode
        }
        else if(routNode.lastRout)
        {
            param.PBCD = routNode.vZigBCD + "-" +  routNode.prev.routCode
            param.NBCD = routNode.productBCD
        }
        else
        {
            param.PBCD = routNode.vZigBCD + "-" + routNode.prev.routCode
            param.NBCD = routNode.vZigBCD + "-" + routNode.routCode
        }
    }


	for(var i=1; i<=maxToolCnt; i++)
	{
		var tempCnt = "0";
		var tempLimit = "0";
		var objToolCnt = $XT(routNode.lineName + "." + routNode.routName + ".State.ToolCnt_" + i);
		var objToolLimit = $XT(routNode.lineName + "." + routNode.routName + ".State.ToolSet_" + i);
		if(objToolCnt != null)
		{
			tempCnt = objToolCnt.value;
		}
		
		if(objToolLimit != null)
		{
			tempLimit = objToolCnt.value;
		}

		param["TOOL_CNT"+i] = tempCnt;
		param["TOOL_LIMIT"+i] = tempLimit;
	}	

	for (var i = 1; i <= procDataCnt; i++) {
		var procData = "";
		for (var j = i; j < procTagList.count; j++) {
			if (("ProcData_" + i) == procTagList[j].name) {
				procData = procTagList[j].value;
			}
		}
		param["DATA_" + i] = procData;
	}
	//공정 처리 저장 데이터 로그 이력 저장
	//fnProcDataLog(param);
	$XD("mssql").execute("INSERT.PROC_DATA", param
	, function (data) 
	{
		routNode.dataProc = true;
		if(procType == "C")
		{			
			$XT(routNode.lineName + "." + routNode.routName + ".Procchk.frompc_complete").value = true;
			fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-작업완료2] DB처리 성공 => SCADA송신 -> PLC");
			fnWriteLog("================================================================================");
		}
		else if(procType == "P")
		{
			
			$XT(routNode.lineName + "." + routNode.routName + ".Procchk.frompc_ng").value = false;
			fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-작업패스3]  DB처리 성공  => SCADA 신호 OFF ");
			fnWriteLog("================================================================================");
		}
	}
	, function (msg) 
	{
		routNode.dataProc = false;
		if(procType == "C")
		{
		
			$XT(routNode.lineName + "." + routNode.routName + ".Procchk.frompc_complete").value = true;
			fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-작업완료2] DB처리 실패 => SCADA송신 -> PLC");
			fnWriteLog("[DataBase][DBProcProcData] => DB Error: " + msg);
		}
		else if(procType == "P")
		{
			$XT(routNode.lineName + "." + routNode.routName + ".Procchk.frompc_ng").value = false;
			fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-작업패스3] => SCADA 신호 OFF ");
			fnWriteLog("[DataBase][DBProcProcData] => DB Error: " + msg);
		}
		fnSystemErrMsg("DataBase Error", "DBProcProcData 처리 오류", msg);
	});
}
function DBProcReworkData(routNode) 
{
	var barcode = "";
	if(routNode.prev != null)
	{
		fnChkZig(routNode.prev.prodID) ? routNode.prev.vZigBCD : routNode.prev.prodID
	}
	else
	{
		fnChkZig(routNode.prodID) ? routNode.vZigBCD : routNode.prodID
	}

	var param = {
		BCD: barcode,
		PBCD: barcode + (routNode.firstRout ? "" : "-" + (routNode.prev == null ? routNode.routCode : routNode.prev.routCode)),
		NBCD: barcode + "-" + routNode.routCode,
		PROC_ID: routNode.routCode
	}

	$XD("mssql").execute("INSERT.REWORK_DATA", param
	, function (data) 
	{
		routNode.dataProc = true;
		$XT(routNode.lineName + "." + routNode.routName + ".Procchk.frompc_ng").value = false;
			fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-작업패스3]  DB처리 성공  => SCADA 신호 OFF ");
			fnWriteLog("================================================================================");
	}
	,function(msg)
	{
				
		$XT(routNode.lineName + "." + routNode.routName + ".Procchk.frompc_ng").value = false;
		fnWriteLog("[" + routNode.prodID + "][" + routNode.routName + "][착완공-작업패스3] => SCADA 신호 OFF ");
		fnWriteLog("[" + routNode.prodID + "][DataBase][DBProcReworkData] => DB Error: " + msg);
		fnSystemErrMsg("DataBase Error", "insertReworkData 처리 오류", msg);
	});

}

function DBProcProcInfo(param)
{
	param.APPY_DATE = new Date();
	$XD("mssql").execute("UPDATE.PROC_INFO" ,param
	, function (data) {}
	, function (msg) {
		fnWriteLog("[DataBase][DBProcProcInfo] => DB Error: " + msg);
		fnSystemErrMsg("DataBase Error", "DBProcProcInfo 처리 오류", msg);
	});
}


function DBProcMidTuinProcData(routNode) {
	var param = {
		BCD: routNode.zigFlag == true ? routNode.vZigBCD : routNode.prodID,
		PROC_ID: routNode.routCode,
		MAKE_DT: routNode.makeDt,
		MODEL_ID: routNode.modelId
	}
	
	
	$XD("mssql").execute("INSERT.MID_TUIB_PROC_DATA", param, function (data) {
		//fnWriteLog("[DataBase][DBProcMidTuinProcData] => DB SUCCESS : 생산 실적");
	}, function (msg) {
		fnWriteLog("[" + routNode.prodID + "][DataBase][DBProcMidTuinProcData] => DB Error: " + msg);
		fnSystemErrMsg("DataBase Error", "DBProcMidTuinProcData 처리 오류", msg);
	});
}

function DBProcOEEData(lineName, routName) {
	console.log(lineName + "/" + routName);
	var param = {
		OEE_DATETIME: new Date()
		,EQP_ID: $XT(lineName + "." + routName + ".State.EQP_ID").value
		,PROC_ID: $XT(lineName + "." + routName + ".State.PROC_ID").value
		,OEE: $XT("COMMON." + lineName + ".TotRate").value //종합효율
		,OEE_A: $XT("COMMON." + lineName + ".PlayRate").value //가동율
		,OEE_P: $XT("COMMON." + lineName + ".PresRate").value //진도율
		,OEE_Q: $XT("COMMON." + lineName + ".GoodRate").value //양품율
		,EQP_TIME_PM: $XT(lineName + "." + routName + ".Display.PmTime").value //계획정지
		,EQP_TIME_STOP: $XT(lineName + "." + routName + ".Display.StopTime").value //정지시간
		,EQP_TIME_RUN: $XT(lineName + "." + routName + ".Display.PlayTime").value //가동시간
		,EQP_TIME_PLAN: $XT("COMMON." + lineName + ".PlanCycleTime").value //계획 생산 시간
		,PROC_TIME_IDLE: $XT(lineName + "." + routName + ".Display.IdleTime").value //IDLE 누적시간
		,PROC_TIME_RUN: $XT(lineName + "." + routName + ".Display.RunTime").value //누적 가동시간
		,EQP_QTY: $XT(lineName + "." + routName + ".Display.TodayPlan").value // 계획 생산 수량
		,EQP_INPUT: $XT(lineName + "." + routName + ".Event.Total_Count").value //생산 총수량
		,EQP_NG: $XT(lineName + "." + routName + ".Event.NG_Count").value //불량 수량
		,EQP_JOB_END: ($XT(lineName + "." + routName + ".State.Proc_State").value == "R" && $XT(lineName + "." + routName + ".State.EQP_State").value == "N") ? "1" : "0" //생산여부
		,EQP_STAT: $XT(lineName + "." + routName + ".State.EQP_State").value //장비상태
		,PROC_STAT: $XT(lineName + "." + routName + ".State.Proc_State").value //공정상태
	}
	console.log(param);
	$XD("mssql").execute("INSERT.OEE_HISR", param
	, function (data) {
		
	}
	, function (msg) {
		fnWriteLog("[DataBase][DBProcOEEData] => DB Error: " + msg);
		fnSystemErrMsg("DataBase Error", "DBProcOEEData 처리 오류", msg);
	});
}


function DBProcEQPAlarm(argLine, argRout)
{
	var lineName = argLine;
	var routName = argRout;
	var nowDate = new Date();

	var param = {
		 EQP_ID: $XT(lineName + "." + routName + ".State.EQP_ID").value
		,PROC_ID: $XT(lineName + "." + routName + ".State.PROC_ID").value
		,STAT_UPDATE_DATETIME: nowDate
		,EQP_STAT: $XT(lineName + "." + routName + ".State.EQP_State").value //장비상태
		,PROC_STAT: $XT(lineName + "." + routName + ".State.Proc_State").value //공정상태
		,EMGR_ON_STAT: $XT(lineName + "." + routName + ".Event.Emergency").value //장비상태
		,SUPPLY_ON_STAT: $XT(lineName + "." + routName + ".Event.Parts_Supply_Request").value //장비상태
		,ALARM_CODE: $XT(lineName + "." + routName + ".Event.Alarm_Code").value //장비상태
		,ALARM_LEVEL: $XT(lineName + "." + routName + ".Event.Alarm_Level").value //장비상태   
		,ALARM_OCCURRED_TIME: ""
		,ALARM_CLEARED_TIME: ""
	}
	//장비 상태 업데이트
	// 알람 발생으로 인한 업데이트 알람에 대한 정보를 추가
	if (param.ALARM_LEVEL == "2" || param.ALARM_LEVEL == "1") 
	{
		param.ALARM_OCCURRED_TIME = nowDate;
		//장비 상태 업데이트
		$XD("mssql").execute("UPDATE.EQP_OCCURREND_ALARM", param
		, function (data) {
			//fnWriteLog("[DataBase][InUpdEqpState][" + lineName + "][" + routName + "] => DB Suecsess");
		}
		, function (msg) {
			fnWriteLog("[DB][UPDATE.EQP_OCCURREND_STAT] => DB Error: " + msg);
			fnSystemErrMsg("DB Error", "UPDATE.EQP_OCCURREND_STAT 처리 오류", msg);
		});
	} 
	else if (param.ALARM_LEVEL == "0") 
	{
		param.ALARM_CLEARED_TIME = nowDate;

		//장비 상태 업데이트
		$XD("mssql").execute("UPDATE.EQP_CLEAR_ALARM", param
		, function (data) {
			//fnWriteLog("[DataBase][InUpdEqpState][" + lineName + "][" + routName + "] => DB Suecsess");
		}
		, function (msg) {
			fnWriteLog("[DB][UPDATE.EQP_CLEAR_STAT] => DB Error: " + msg);
			fnSystemErrMsg("DB Error", "UPDATE.EQP_CLEAR_STAT 처리 오류", msg);
		});
	}
}

function DBProcEQPState(argLine, argRout) {
	var lineName = argLine;
	var routName = argRout;
	var nowDate = new Date();

	var param = {
		 EQP_ID: $XT(lineName + "." + routName + ".State.EQP_ID").value
		,PROC_ID: $XT(lineName + "." + routName + ".State.PROC_ID").value
		,STAT_UPDATE_DATETIME: nowDate
		,EQP_STAT: $XT(lineName + "." + routName + ".State.EQP_State").value //장비상태
		,PROC_STAT: $XT(lineName + "." + routName + ".State.Proc_State").value //공정상태
		,EMGR_ON_STAT: $XT(lineName + "." + routName + ".Event.Emergency").value //장비상태
		,SUPPLY_ON_STAT: $XT(lineName + "." + routName + ".Event.Parts_Supply_Request").value //장비상태
		,ALARM_CODE: $XT(lineName + "." + routName + ".Event.Alarm_Code").value //알람코드
		,ALARM_LEVEL: $XT(lineName + "." + routName + ".Event.Alarm_Level").value //알람레벨
		,ALARM_OCCURRED_TIME: "" //알람발생시간
		,ALARM_CLEARED_TIME: "" //알람해제시간
	}
	//장비 상태 업데이트
	// 알람 발생으로 인한 업데이트 알람에 대한 정보를 추가
	if (param.ALARM_LEVEL == "2" || param.ALARM_LEVEL == "1") 
	{
		param.ALARM_OCCURRED_TIME = nowDate;
	} 
	else if (param.ALARM_LEVEL == "0") 
	{
		param.ALARM_CLEARED_TIME = nowDate;
	}

	$XD("mssql").execute("UPDATE.EQP_STAT", param
	, function (data) {
		//fnWriteLog("[DataBase][InUpdEqpState][" + lineName + "][" + routName + "] => DB Suecsess");
	}
	, function (msg) {
		fnWriteLog("[DB][UPDATE.EQP_STAT] => DB Error: " + msg);
		fnSystemErrMsg("DB Error", "UPDATE.EQP_STAT 처리 오류", msg);
	});

	//장비 상태 내역 저장
	param.RECV_DT = nowDate;
	$XD("mssql").execute("INSERT.EQP_STAT_HISR", param
	, function (data) {
		
	}
	, function (msg) {
		fnWriteLog("[DB][INSERT.EQP_STAT_HISR] => DB Error: " + msg);
		fnSystemErrMsg("DB Error", "INSERT.EQP_STAT_HISR 처리 오류", msg);
	});

}

function DBProcAlarmInfo(argLine, argRout, argAlarmCode)
{
	var param = { ALARM_ID : Number(argAlarmCode)
				 ,PROC_ID : $XT(argLine + "." + argRout + ".State.PROC_ID").value}
	$XD("mssql").execute("SELECT.ALARM_INFO"
	, param
	, function (data) {
		if(data != null)
		{
			$XT(argLine + "." + argRout + ".Display.AlarmTxt").value = data.getAt(0).getValueByName("MSG");
		}
	}, function (msg) {
		fnWriteLog("[DataBase][SELECT.ALARM_INFO][" + argLine + "-" + argRout + "] => DB Error: " + msg);
		fnSystemErrMsg("DataBase Error", "DBProcAlarmInfo 처리 오류", msg);
	});
}

function DBProcAlarmHisr(argLine, argRout) {
	var lineName = argLine;
	var routName = argRout;

	var lotId = fnGetTagValue($XT(lineName + "." + routName + ".Process.Lot_ID"));
	var rZigBCD = "";

	if(lotId != "")
	{
		if(lotId in routMemory)
		{
			var routNode = routMemory[lotId].search(routName);
			if(routNode != null)
			{
				rZigBCD = routNode.rZigBCD;
			}
		}
	}
	
	var nowDate = new Date();
	var param = {
		BCD : rZigBCD,
		EQP_ID: $XT(lineName + "." + routName + ".State.EQP_ID").value,
		PROC_ID: $XT(lineName + "." + routName + ".State.PROC_ID").value,
		ALARM_ID: $XT(lineName + "." + routName + ".Event.Alarm_Code").value, //알람코드
		ALARM_LEVEL: $XT(lineName + "." + routName + ".Event.Alarm_Level").value, //알람레벨   
		ALARM_DESC: "",
		ALARM_DATETIME: nowDate
	}
	if (param.ALARM_LEVEL == "2" || param.ALARM_LEVEL == "1") 
	{
		param.CLEARED_TIME = "";
		param.OCCURED_TIME = nowDate;//$XT("COMMON.DateTime").value+"";
	} 
	else 
	{	
		param.OCCURED_TIME = "";
		param.CLEARED_TIME = nowDate;//$XT("COMMON.DateTime").value+"";
	}
	

	if(param.ALARM_LEVEL == "0")
	{
		$XD("mssql").execute("UPDATE.ALARM_HISR", param, function (data) {
		//fnWriteLog("[DataBase][iuAlarmHist][" + lineName + "][" + routName + "] => DB Suecsess");
		}, function (msg) {
			fnWriteLog("[DataBase][DBProcAlarmHisr] => DB Error: " + msg);
			fnSystemErrMsg("DataBase Error", "DBProcAlarmHisr 처리 오류", msg);
		});
	}
	else
	{
		$XD("mssql").execute("INSERT.ALARM_HISR", param, function (data) {
		//fnWriteLog("[DataBase][iuAlarmHist][" + lineName + "][" + routName + "] => DB Suecsess");
		}, function (msg) {
			fnWriteLog("[DataBase][DBProcAlarmHisr] => DB Error: " + msg);
			fnSystemErrMsg("DataBase Error", "DBProcAlarmHisr 처리 오류", msg);
		});
	}
}

function DBProcStuck(){
		
	// 공정창고 데이터 주기적 조회
	setInterval(function(){
		$XD("mssql").execute("SELECT.STUCK_LIST", null
		, function (data) 
		{
			if(data != null)
			{
				for(var i=0; i<data.count; i++)
				{
					var itemId = data.getAt(i).getValueByName("ITM_ID");
					var itemCnt = data.getAt(i).getValueByName("CALQTY");
					var ext2 = data.getAt(i).getValueByName("EXT2");
					var ext3 = data.getAt(i).getValueByName("EXT3");
					var ext4 = data.getAt(i).getValueByName("EXT4");
					var ext5 = data.getAt(i).getValueByName("EXT5");
					
					var tag = $XT("COMMON.WAREHOUSE." + itemId);
					if(tag != null)
					{
						
						$XT("COMMON.WAREHOUSE." + itemId + ".Total_Count").value = itemCnt;
						if(ext5 <= itemCnt)
						{
							$XT("COMMON.WAREHOUSE." + itemId + ".G_4").value = true;
						}
						else if(ext4 <= itemCnt)
						{
							$XT("COMMON.WAREHOUSE." + itemId + ".G_3").value = true;
						}
						else if(ext3 <= itemCnt)
						{
							$XT("COMMON.WAREHOUSE." + itemId + ".Y").value = true;
						}
						else if(ext2 <= itemCnt)
						{
							$XT("COMMON.WAREHOUSE." + itemId + ".R").value = true;
						}
					}
				}
			}
		}
		,function(msg)
		{
			fnSystemErrMsg("DataBase Error", "DBProcStuck 처리 오류", msg);
		});
	}, 600000);
}

function DBProcAmaOEE()
{
	setInterval(function(){

		$XD("mssql").execute("AMA.OEE_DATA", null, function(data) {
			if(data != null )
			{
				for(var i=0; i<data.count; i++)
				{
					var eqpId =  data.getAt(i).getValueByName("EQP_ID");
					var procId = data.getAt(i).getValueByName("PROC_ID");
				
					var lineName = "";
					var lineCode = eqpId.substr(0,7)
					if(lineCode == "0A00003")
					{
						lineName = "LINE_3";
					}
					else
					{
						lineName = "LINE_4";
					}

					var routName = "";
					switch(procId)
					{
						case null:
							routName = "";
							break;
						case "P030000A100":
						case "P040000A100":
							routName = "BOXING";
							break;
						case "P030000A090":
						case "P040000A090":
							routName = "BEARING";
							break;
						case "P030000A080":
						case "P040000A080":
							routName = "AWT";
							break;
						case "P030000A070":
						case "P040000A070":
							routName = "TURNING";
							break;
						case "P030000A060":
						case "P040000A060":
							routName = "FUSING";
							break;
						case "P030000A050":
						case "P040000A050":
							routName = "WINDING_2";
							break;
						case "P030000A040":
						case "P040000A040":
							routName = "WINDING_1";
							break;
						case "P030000A030":
						case "P040000A030":
							routName = "COMMUTATOR";
							break;
						case "P030000A020":
						case "P040000A020":
							routName = "INSULATOR";
							break;
						case "P030000A010":
						case "P040000A010":
							routName = "SHAFT";
							break;
					}
					
					if(routName == "")
					{
						$XT("COMMON." + lineName + ".GoodRate").value = Number(data.getAt(i).getValueByName("OEE_Q"));
						$XT("COMMON." + lineName + ".PlayRate").value = Number(data.getAt(i).getValueByName("OEE_A"));
						$XT("COMMON." + lineName + ".PresRate").value = Number(data.getAt(i).getValueByName("OEE_P"));
						$XT("COMMON." + lineName + ".TotRate").value = Number(data.getAt(i).getValueByName("OEE"));
					}
					else
					{
						$XT(lineName + "." + routName + ".Display.GoodRate").value = Number(data.getAt(i).getValueByName("OEE_Q"));
						$XT(lineName + "." + routName + ".Display.PlayRate").value = Number(data.getAt(i).getValueByName("OEE_A"));
						$XT(lineName + "." + routName + ".Display.PresRate").value = Number(data.getAt(i).getValueByName("OEE_P"));
						$XT(lineName + "." + routName + ".Display.TotRate").value = Number(data.getAt(i).getValueByName("OEE"));
					}
				}
			}
		}, null);
	}, 1800000);
}

