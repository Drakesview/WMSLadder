export default (state = {},action) => {
 switch (action.type) {
     case 'LOGIN':
         return {
             uid: action.uid,
             emailVerified:action.emailVerified
         }
     case 'LOGOUT':
         return {};
     default:
         return state;
 }
};