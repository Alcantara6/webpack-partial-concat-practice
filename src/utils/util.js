import _ from 'lodash';

const checkObjEmpty = obj => {
	return _.isEmpty(obj);
}

const checkEqual = (pre, cur) => {
	return _.isEqual(pre, cur);
} 

export { 
	checkObjEmpty,
	checkEqual
}
