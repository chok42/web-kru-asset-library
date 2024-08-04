import moment from "moment";
import "moment/locale/th"

//-----------------------------------------------------------------------------------------
//date
//-----------------------------------------------------------------------------------------
export const dateISOtoThai = (date:string) => {
  return moment(date).add(543, "year").locale('th').format("D MMM YY");
};

export const toThaiDateString = (date:string) => {
  const dataDate = new Date(date)
  const datetoThai = dataDate.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
 return datetoThai
};

export const toThaiDateTimeString = (date:string) => {
  const dataDate = new Date(date)
  const datetoThai = dataDate.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour:"numeric",
    minute:'numeric',
    second:"numeric",
    // timeZone: "UTC",
    // formatMatcher:'basic',
  })
 return datetoThai
};
//-----------------------------------------------------------------------------------------
//number
//-----------------------------------------------------------------------------------------
export const currencyFormat = (num:number)=> {
    return num?.toFixed(2)?.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
//-----------------------------------------------------------------------------------------
//word
//-----------------------------------------------------------------------------------------
  export const lengthTextFormat = (text:string, maxText:number) => {
    return text?.length > maxText
      ? text.substring(0, maxText - 3) + "..."
      : text;
      
}

export const inputLengthThailand = (e: React.ChangeEvent<HTMLInputElement>) => {
  return e.target.value.replace(/[^ก-๛']/g, '')
    
}

export const inputLengthEnglish = (e: React.ChangeEvent<HTMLInputElement>) => {
  return e.target.value.replace(/[^a-zA-Z0-9']/g, '')
    
}

export const inputEnglishUppercase = (e: React.ChangeEvent<HTMLInputElement>) => {
  return e.target.value.replace(/[^A-Z0-9']/g, '') 
}

export const inputNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
  return e.target.value.replace(/[^0-9']/g, '') 
}
