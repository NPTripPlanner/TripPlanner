import 'moment-timezone'
import moment, { Moment } from 'moment';

export const getDate = (format:string|null=null, incrementDays:number=0)=>{
    const dateFormat = format?format:'MM-DD-YYYY';
    let now = moment(new Date(), dateFormat);
    now = now.hours(0).minutes(0).seconds(0).milliseconds(0);
    now.add(incrementDays, 'days');
    return now
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

export const getLocalDateFromUTCFormat = (dateUTC:Date, format:string='MMM-DD-YYYY')=>{
    const momentUTC = moment.utc(dateUTC);
    const localDate = momentUTC.local();
    return localDate.format(format);
}