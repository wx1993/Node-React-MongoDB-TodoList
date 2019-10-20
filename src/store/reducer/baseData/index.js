import {combineReducers} from 'redux';

const defaultDept = [
];
const defaultStaff = [
];
function dept(dept = defaultDept, action) {
    switch (action.type){
        case 'getDept':
            return action.data;
        default:
            return dept;
    }
}
function staff(staff = defaultStaff, action) {
    switch (action.type){
        case 'getStaff':
            return action.data;
        default:
            return staff;
    }
}
export default combineReducers({
    dept,
    staff
})