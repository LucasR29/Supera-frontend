import { Routes, Route } from 'react-router-dom'
import { HomePage } from '../pages/home/home'

export const RoutesMain = () => {
    return (
        <Routes>
            <Route path='/'>
                <Route index element={<HomePage />} />
            </Route>
        </Routes>
    )
}