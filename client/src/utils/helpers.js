import _ from 'lodash';

export const ObjectId = () => {
    const timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
};

export const convertArrayToObject = (array, key) => {
    return _.mapValues(_.groupBy(array, key),
        clist => clist.map(car => _.omit(car, key)));
};