import 'moment-timezone'
import moment, { Moment } from 'moment';

export const getDate = (incrementDays:number=0, zeroOutTime:boolean=true)=>{
    let now = moment(new Date());
    if(zeroOutTime){
        now = now.hours(0).minutes(0).seconds(0).milliseconds(0);
    }
    now.add(incrementDays, 'days');
    return now
}

export const getDateFormat = (format:string='MMM-DD-YYYY', date:Date)=>{
    const momentDate = moment(date);
    return momentDate.format(format);
}

export const getDateBaseOn = (date:Date, incrementDays:number=1)=>{
    const baseDate = moment(date);
    const fixedDate = baseDate.add(incrementDays, 'days');
    return fixedDate.toDate();
}

export const totalDays = (from:Date, to:Date)=>{
    const fromMoment = moment(from);
    const toMoment = moment(to);

    return toMoment.diff(fromMoment, 'days') + 1;
}

export const totalDaysInMoment = (from:Moment, to:Moment)=>{
    return to.diff(from, 'days') + 1;
}

export const getLocalDateFromUTC = (dateUTC:Date)=>{
    const momentUTC = moment.utc(dateUTC);
    const localDate = momentUTC.local().toDate();
    return localDate;
}

export const getLocalDateFromUTCFormat = (dateUTC:Date, format:string='MMM/DD/YYYY')=>{
    const momentUTC = moment.utc(dateUTC);
    const localDate = momentUTC.local();
    return localDate.format(format);
}

/**
 * Is date a before date b
 * @param a 
 * @param b 
 */
export const dateBefore = (a:Date, b:Date)=>{
    const aMoment = moment(a);
    const bMoment = moment(b);
    const result = aMoment.isBefore(bMoment);
    return result;
}

/**
 * Is date a as same as date b
 * @param a 
 * @param b 
 */
export const dateSame = (a:Date, b:Date)=>{
    const aMoment = moment(a);
    const bMoment = moment(b);
    return aMoment.isSame(bMoment);
}

export const sortDate = (a:Date, b:Date)=>{
    const aMoment = moment(a);
    const bMoment = moment(b);
    
    if(aMoment.isSame(bMoment)) return 0;
    if(aMoment.isBefore(bMoment)) return -1;
    if(aMoment.isAfter(bMoment)) return 1;

    return -1;
}