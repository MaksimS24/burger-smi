import {FC} from "react";

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
            <ul className='text text_type_digits-default'>
                {orders.map(order => <li key={order}>{order}</li>)}
                {!orders.length && textId && <li>{textId}</li>}
            </ul>
        </>
    );
};

export default Stats;