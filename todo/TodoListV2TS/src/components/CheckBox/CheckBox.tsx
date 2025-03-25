// import s from './CheckBox.module.scss'

export function CheckBox() {

    return (
        <>
            <input
                id={id + '!'}
                type="checkbox"
                className={s.checkboxElement}
                checked={isChecked}
                onChange={() => handleCheckBox((id))}
            />
            <label htmlFor={id + '!'} className={s.checkboxWrapper}></label>
        </>
    );
}