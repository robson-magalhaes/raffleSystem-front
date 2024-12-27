import axios from "axios";

const req = axios.create({
    'baseURL': import.meta.env.VITE_APP_BASE_URL
})
const token = localStorage.getItem('authToken');
const jwtToken = import.meta.env.VITE_APP_JWT_SECRET_KEY

export const regiterUser = async (data: UserType) => {
    const response = await req.post('/register', data, {
        headers: {
            "authorization": `Bearer ${jwtToken}`
        }
    });
    return response.data
}

export const getUserData = async (userId: number) => {
    return await req.get(`/one_user/${userId}`)
}

export const editUser = async (data: UserType) => {
    return await req.post(`/edit_user`, data, {
        headers: {
            "authorization": `Bearer ${token}`
        }
    })
}
export const accountCompleted = async (userId: number) => {
    if (userId) {
        try {
            const response = await getUserData(Number(userId));
            const chavePix = response.data.chave_pix;
            
            if (chavePix) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Erro ao verificar dados do usuário:', error);
            return false;
        }
    }
};