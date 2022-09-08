
import { ReactElement } from "react";
import { Routes, Route } from "react-router-dom";
import * as View from '../views/view';

const RouterConfig = (): ReactElement => {
    return (
        <Routes>
            <Route path="/" element={<View.IndexView />}>
                <Route index element={<View.OverviewIndex />}></Route>
            </Route>
        </Routes>
    )
};

export default RouterConfig;