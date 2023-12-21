export function isBlank(str){
    if(str == null) return true;
    for(let i = 0; i < str.length; i++){
        if(str[i] != " "){
            return false;
        }
    }
    return true;
}

export function getDateString(date){
    return date.getFullYear()+"-" + (date.getMonth() + 1) + "-"+date.getDate()
}