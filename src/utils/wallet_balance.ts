import axios from 'axios';

const req = axios.create({
    'baseURL': import.meta.env.VITE_APP_BASE_URL
});

const token = localStorage.getItem('authToken');

export const checkBalance = async (id: number) => {
    const res = await req.post("/check_balance", { id }, {
        headers: {
            "authorization": `Bearer ${token}`
        }
    })
    return res.data
}
export const addBalance = (id: number, balance: number) => {
    req.post("/add_balance", { id, balance })
    return
}
export const GainPayment = async (userId: number, valor: number) => {
    let idEnvio = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 20; i++) {
        result += idEnvio.charAt(Math.floor(Math.random() * idEnvio.length));
    }
    idEnvio = result;
    const data = { userId, valor: (valor.toFixed(2)).toString(), idEnvio }
    const res = await req.post("pix_send", data, {
        headers: {
            "authorization": `Bearer ${token}`
        }
    })
    return res.data
}