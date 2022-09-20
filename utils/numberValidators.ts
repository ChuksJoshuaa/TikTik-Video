// To check for the numbers of like, share and comments


function numberValidatorThousand(number: any){
     if(number >= 1000){
        let value = number / 1000
        return `${parseFloat(value.toFixed(1))}K`
     }

     if(number >= 10000){
        let value = number / 10000
        return `${parseFloat(value.toFixed(2))}K`
     }

     if(number >= 100000){
        let value = number / 100000
        return `${parseFloat(value.toFixed(3))}k`
     }
     
     return number
  }


  const numberValidatorMillion = (number: any) => {
    if(number >= 1000000){
        let value = number / 1000000
        return `${parseFloat(value.toFixed(1))}M`
     }

     if(number >= 10000000){
        let value = number / 10000000
        return `${parseFloat(value.toFixed(2))}M`
     }

     if(number >= 100000000){
        let value = number / 100000000
        return `${parseFloat(value.toFixed(3))}M`
     }

     return number
  }

  const numberValidatorBillion = (number: any) => {
     if(number >= 1000000000){
        let value = number / 1000000000
        return `${parseFloat(value.toFixed(1))}B`
     }
     if(number >= 10000000000){
        let value = number / 10000000000
        return `${parseFloat(value.toFixed(2))}B`
     }

     if(number >= 100000000000){
        let value = number / 100000000000
        return `${parseFloat(value.toFixed(3))}B`
     }

     return number
  }

  
export const checkNumberValue = (number: any) => {
    if(number < 1000){
        return number
    }
    else if(number >= 1000 && number < 1000000){
       return numberValidatorThousand(number)
     }
     else if(number >= 1000000 && number < 1000000000){
       return numberValidatorMillion(number)
     }
     else{
        return numberValidatorBillion(number)
     }     
  }
