class BizOperation
{
    // property list
    // node참조
    // db처리여부......
}

class BizRoutMaster
{
    // suppose : normal, batchrework
    // model : 556, 656
    
    // class Operation instance
}

class BizCurrentProdFlowState
{
    // RoutMaster instance
    // Operaion instance
    //          property : DB process
    // property : done, doing, plan

}


// self-invoke method 대체 고민...
class BizInit
{
    // taglist등 xscada정보 획득
}





// data class
class ProdModelType
{
    // 556, 656 
}
// data class
class OperationMaster
{
    // 공정명, 공정코드
    // getTagInfo()
}
// utility ( singleton )
class DatabaseHelper
{
    // ProdFlow
}
// utility class ( singleton )
class EquipmentHelper
{
    // rcv
    // sed
    //
    // equip state, alarm, ee
}