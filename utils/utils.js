const utils = {
    getProgressPercentage: (totalRequired, hoursAccrued) => { return (hoursAccrued/totalRequired) * 100 },
    
    getDifferenceInDays: (dateA, dateB) => { 
        // Taken from https://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;

        const utc1 = Date.UTC(dateA.getFullYear(), dateA.getMonth(), dateA.getDate());
        const utc2 = Date.UTC(dateB.getFullYear(), dateB.getMonth(), dateB.getDate());
      
        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    },

    getAvgDailyProgress: (daysSoFar, hoursAccrued) => { return hoursAccrued/daysSoFar  },

    isValidChange(allowedFields, changingFields){
        let allowedChange = true;
        
        for(let changingField of changingFields){
            const searchResult = allowedFields.findIndex((allowedField) => changingField === allowedField);

            if(searchResult === -1){
                allowedChange = false;
                break;
            }
        }
        return allowedChange;
    }
}

export default utils;