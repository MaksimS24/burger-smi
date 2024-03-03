import style from './not-found.module.css';

const NotFound = () => {
    return (
        <>
        <div className={style.notFound}>
            <img src={'./error-404.svg'} alt={'error-image'}/>
            <p className="text text_type_main-large">
                Опаньки
                <br/>
                <p className="text text_type_main-small">
                    Такой страницы нет. Ошибка 404!
                </p>

            </p>

        </div>
        </>
    )
}

export default NotFound;