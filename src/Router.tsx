import { Route, Routes } from "react-router-dom"
import Painel_de_controle from "./pages/painel_de_controle"
import Create_Raffle from "./pages/create_raffle"
import Buy_raffle_only from "./pages/buy_raffle_only"
import Buy_for_quota from "./pages/buy_for_quota"
import Create_campaign from "./pages/create_edit_campaign"
import PrivateRoute from "./PrivateRoute"
import Purchase_list from "./pages/purchase_list"
import Payment from "./pages/PaymentPage"
import BuyResult from "./pages/BuyResult"
// import Home from "./pages/home"
import Login from "./pages/login"
import Register from "./pages/register"
import My_account from "./pages/my_account"

function Router() {
    return (
        <>
            <Routes>
                <Route path={`/:userId/buy_quota`} element={<Buy_for_quota />} />
                <Route path={'/:userId/buy_raffle_only'} element={<Buy_raffle_only />} />
                <Route path={'/:userId/payment'} element={<Payment />} />
                <Route path={'/:userId/result'} element={<BuyResult />} />
                <Route path={'/login'} element={<Login />} />
                <Route path={'/register'} element={<Register />} />

                <Route element={<PrivateRoute />}>
                    <Route path={`/`} element={<Login/>} />
                    <Route path={'/create_raffle'} element={<Create_Raffle />} />
                    <Route path={'/create_edit_campaign'} element={<Create_campaign />} />
                    <Route path={'/panel'} element={<Painel_de_controle />} />
                    <Route path={'/purchase_list'} element={<Purchase_list />} />
                    <Route path={'/settings'} element={<My_account />} />
                </Route>
            </Routes>
        </>
    )
}

export default Router
