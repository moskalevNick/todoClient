import moment from 'moment';

export const dateFormatter = ( date, format = 'DD MMM YYYY' ) => moment( date ).isValid()
  ? moment( date ).format( format )
  : '';

export const dateToStringFormatter = ( date ) => {
  return `${ date.day }-${ date.month.id }-${ date.year }`
};

export const dateToDeadline = ( date ) => {
  return `${ date.slice(6, 10) }-${ date.slice(3, 5) }-${ date.slice(0, 2) }`
};

export const dateObjectFormatter = ( date ) => {
  return {
    year: dateFormatter( date, 'YYYY' ),
    month: {
      id: dateFormatter( date, 'MM' ),
      name: dateFormatter( date, 'MMM' )
    },
    day: dateFormatter( date, 'DD' )
  }
};