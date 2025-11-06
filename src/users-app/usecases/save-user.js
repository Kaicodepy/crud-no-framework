
import { localhostUserToModel } from '../mappers/localhost-user.mapper';
import { userModeltoLocalhost } from '../mappers/user-to-localhost.mapper';
import { User } from '../models/user';
  

/**
 * 
 * @param {Like<User>}  userLike 
 */
export const saveUser = async(userLike) => {

    const user = new User(userLike);

    if(!user.firstName || !user.lastName){ throw 'Faltan datos obligatorios'; }

    const userToSave = userModeltoLocalhost(user);
    const userUpdated = null;

    if(user.id){
        userUpdated = await updatedUser( userToSave );
    
    }
    else
    {
        userUpdated = await createUser( userToSave );
    }

    return localhostUserToModel( userUpdated );    
}

const createUser = async(user) => {




    const url = `${import.meta.env.VITE_API_URL}/users`;
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    const newUser = await res.json();

    console.log(newUser);
    return newUser;
}

const updatedUser = async(user) => {




    const url = `${import.meta.env.VITE_API_URL}/users/${ user.id }`;
    const res = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    const updatedUser = await res.json();

    console.log(updatedUser);
    return updatedUser;
}
