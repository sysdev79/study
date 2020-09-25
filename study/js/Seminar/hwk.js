//====================================================================================
//  대칭수
//====================================================================================
function RawData(){}
function Data(){}

// common data structure
var MyData = new Data();

// maxDummyCnt 범위안에서 lowNum보다 큰 최소 대칭수 구함
// maxDummyCnt : 더미데이터 생성 범위
// minNum : 최소값 기준
Data.prototype.fn_PalindromicNum = function(maxDummyCnt, minNum)
{    
    // validation
    if( minNum > maxDummyCnt)
    {
        throw new Error("최소범위는 더미생성 데이터 수보다 클수 없습니당");
    }
    
    // dumy data
    makeDummy(maxDummyCnt);

    // process
    for(var key in MyData)
    {
        if(!isNaN(key))
        {
            if( this.fn_IsCheck(MyData[key].bin) || this.fn_IsCheck(MyData[key].oct) || this.fn_IsCheck(MyData[key].hex) )
            {
                if(key > minNum)
                {
                    console.log("dec :", key, "bin :", MyData[key].bin, "oct :", MyData[key].oct, "hex :", MyData[key].hex);
                    break;
                }
            }
        }       
    }
}

// 대칭수 여부 확인
// argStr : 10진수, 8진수, 2진수 문자열
Data.prototype.fn_IsCheck = function(argStr)
{
    if(argStr.length > 1)
    {
        var reverse = argStr.split("").reverse().join(""); 
        if(argStr == reverse)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}

// 더미데이터 자료구조 생성
// maxDummyCnt : 최대 더미데이터 생산 갯수
function makeDummy(maxDummyCnt)
{
    for(var i = 0 ; i < maxDummyCnt ; i++)
    {
        var myRawData = new RawData();
        myRawData.bin = i.toString(2);
        myRawData.oct = i.toString(8);
        myRawData.hex = i.toString(16);

        MyData[i] = myRawData;
    }
}
// Execute
// MyData.fn_PalindromicNum(400, 300);


//====================================================================================
//  카드뒤집기
//====================================================================================
function Card(_cardNumber, _direction)
{
    this.cardNumber = _cardNumber;
    this.direction = _direction;
}

function CardSet(_argCnt)
{
    this.totalCount = _argCnt
    this.cards = new Array();
    this.MakeCard();
}

CardSet.prototype.MakeCard = function()
{
    for(var i = 1 ; i <= this.totalCount ; i++)
    {
        var cd = new Card(i.toString(), false);
        this.cards[i-1] = cd;
    }
}

CardSet.prototype.PopuplateCardList = function()
{
    var resultMsg = "";
    this.cards.forEach(function(v,i){
        var tmpStr = "[".concat(v.direction?(String(v.cardNumber).length<2?"0"+v.cardNumber:v.cardNumber):"##").concat("]");
        resultMsg += tmpStr;
    })
    console.log(resultMsg);
    console.log("");
}

CardSet.prototype.FlipCard = function(argCard)
{
    argCard.direction = argCard.direction ? false : true;
}

CardSet.prototype.DoMain = function()
{
    console.log("");
    console.log("요이~~~~땅~~~!!!");
    this.PopuplateCardList();

    for(var i = 0 ; i <= this.totalCount; i++)
    {
        if(i > 1)
        {
            console.log("[ " +i+" ] 번째카드 뒤집 뒤집~~");
            for( var j = i ; j <= this.totalCount; j=j+i)
            {
                this.FlipCard(this.cards[j-1]);
            }
            this.PopuplateCardList();
        }
    }
}
// Execute
// var cardSet = new CardSet(10);
// cardSet.DoMain();