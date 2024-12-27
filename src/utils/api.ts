import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface CustomJwtPayload extends JwtPayload {
    userId: string;
}

const req = axios.create({
    'baseURL': import.meta.env.VITE_APP_BASE_URL
})
const token = localStorage.getItem('authToken');

export const listRaffles: any = async (id: number) => {
    const response = req.get(`/list_allRaffles/${id}`, {
        headers: {
            "authorization": `Bearer ${token}`
        }
    })
    return response
}
export const listCampaign: any = async (id: number) => {
    const response = req.get(`/list_campaign/${id}`, {
        headers: {
            "authorization": `Bearer ${token}`
        }
    })
    return response;
}
export const listPurchase = async (id: number) => {
    const response = req.get(`/list_purchase/${id}`, {
        headers: {
            "authorization": `Bearer ${token}`
        }
    });
    return response
}
export const delRaffle = (id: number) => {
    return req.delete(`/delete_raffle/${id}`, {
        headers: {
            "authorization": `Bearer ${token}`
        }
    })
}

export const delCampaign = (id: number) => {
    return req.delete(`/delete_campaign/${id}`, {
        headers: {
            "authorization": `Bearer ${token}`
        }
    })
}

export const destroyGlobal = (id: number) => {
    const result = confirm('ATENÇÂO, Todos os registros de sorteios, campanha e compradores serão excluidos. Tem certeza que deseja continuar?');
    if (result) {
        req.delete(`/destroy_all`, {
            headers: {
                "authorization": `Bearer ${token}`
            }
            , data: { userId: id }
        }).then(x => alert(x.data.status)).catch(x => alert(x.data.error));
        return
    }
}

export const createRaffle = (data: any) => {
    const decode = jwtDecode<CustomJwtPayload>(token as string);
    const userId = decode.userId;
    return req.post('/create_raffle/' + userId, data, {
        headers: {
            "authorization": `Bearer ${token}`
        }
    })
}
export const createCampaign = (data: any) => {
    ;
    const decode = jwtDecode<CustomJwtPayload>(token as string);
    const userId = decode.userId;
    return req.post(`/create_campaign/${userId}`, data, {
        headers: {
            "authorization": `Bearer ${token}`
        }
    })
}
export const editCampaign = (data: any) => {
    return req.post('/edit_campaign', data, {
        headers: {
            "authorization": `Bearer ${token}`
        }
    })
}
export const buy_raffle_only = (data: any) => {
    return req.post('/buy_raffle_only', data)
}
export const buy_for_quota = async (data: any) => {
    return await req.post('/buy_for_quota', data)
}
