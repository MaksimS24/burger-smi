import {FC} from "react";
import {IOrdersFeed, IOrdersStatus} from "../../../utils/types/websocket";

interface IStatusOrder {
    status: string,
}

const StatusOrders: FC<IStatusOrder> = ({status}) => {

    let isStatus: string = '';

    switch (status) {
        case IOrdersStatus.CREATED:
        isStatus = 'Создан';
        break;
        case IOrdersStatus.PENDING:
            isStatus = 'Готовиться';
            break;
        case IOrdersStatus.DONE:
            isStatus = 'Выполнен';
            break;
        default: isStatus = status;
    }

    return (
        <div className={`text text_type_main-default`} style={{color: '#00CCCC'}}>{isStatus}</div>
    )
}

export default StatusOrders;