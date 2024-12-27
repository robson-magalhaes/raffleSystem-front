import axios from "axios"

export const create_payment = async (data: any) => {
    try {
        let body = {
            userId: data.userId,
            first_name: data.first_name,
            last_name: data.last_name,
            telephone: data.telephone,
            unit_price: data.unit_price,
            quantity: data.quantity,
            raffleId: data.raffleId
        };
        return await axios.post(import.meta.env.VITE_APP_BASE_URL + "/create_payment", body);
    } catch (error) {
        console.error("Erro ao criar cobrança de pagamento:", error);
        throw error;
    }
}

export const getPayment = async (data: any) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/get_payment`, { txid: data });
        return res.data;
    } catch (error: any) {
        console.error("Erro ao obter pagamento:", error.message);
        throw error;  // Você pode optar por lançar o erro novamente ou retornar uma mensagem personalizada
    }
};