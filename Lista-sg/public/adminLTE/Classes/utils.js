class Utils{

    static DateFormat(data, addzeros){
        return `${addzeros(data.getDate())}/${addzeros(data.getMonth()+1)}/${data.getFullYear()} | 
        ${addzeros(data.getHours())}:${addzeros(data.getMinutes())}`;
    }

    
}