
export const deleteUser = async(id) => {


    const url = `${import.meta.env.VITE_API_URL}/users/${ user.id }`;
    const res = await fetch(url, {
        method: 'DELETE',
    
    });
    
    const data = await res.json();

    console.log(updatedUser);
    return true;
}

export default deleteUser;