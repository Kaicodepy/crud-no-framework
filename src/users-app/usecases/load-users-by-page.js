import { localhostUserToModel } from "../mappers/localhost-user.mapper";
import { User } from "../models/user";
/**
 * 
 * @param {number} page
 * @returns {Promise<User[]>} 
 */
export const loadUsersByPage = async( page = 1) =>{

const url = `${import.meta.env.VITE_BASE_URL}/users?_page=${page}`;
const res = await fetch(url);
const userdata = await res.json();

let users = userdata.data.map( userLike => localhostUserToModel( userLike ));

console.log(page > userdata.pages);
if(page > userdata.pages)
    users = [];

console.log(users);
return users;


}