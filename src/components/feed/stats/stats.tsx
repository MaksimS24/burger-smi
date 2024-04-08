import {FC} from "react";
import style from './stats.module.css';

interface IStats {
    title: string,
    orders: number[];
    textId: string,
    extraClass?: string,
}
const Stats: FC<IStats> = ({title, orders, textId, extraClass}) => {
    return (
        <>
            <h3 className='text text_type_main-medium'>{title}</h3>
            <ul className={`${style['numberOrders']} ${extraClass? extraClass : null} text text_type_digits-default`}>
                {orders.map(order => <li className="fadeIn up" key={order}>{order}</li>)}
                {!orders.length && textId && <li className="text text_type_main-default fadeIn text_color_inactive">{textId}</li>}
            </ul>
        </>
    );
};

export default Stats;