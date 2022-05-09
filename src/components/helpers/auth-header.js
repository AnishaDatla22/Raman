import { AuthService } from './../services/AuthService';

export function authHeader() {
    // return authorization header with jwt token
    const currentUser = AuthService.currentUserValue;
    //console.log(currentUser);
    if (currentUser /*&& currentUser.token*/) {
        //return { Authorization: `Bearer ${currentUser.token}` };
        return {Authorization:currentUser}

    } else {
        return {};
    }
}