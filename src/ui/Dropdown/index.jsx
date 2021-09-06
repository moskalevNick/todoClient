import {useState, useRef} from 'react';

import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import './styles.css';

export const Dropdown = ({value, items, changeHandler}) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    const handleItemClick = (e) => {
        changeHandler(e);
        setOpen(false);
    }

    useOnClickOutside( ref, setOpen.bind( null, false ) );

    return (
        <div className={'wrapper'} ref={ref}>
            <div
                onKeyPress={setOpen.bind(null, !open)}
                onClick={setOpen.bind(null, !open)}
                className={'dropdown-header'}
                role={'button'}
                tabIndex={0}
            >
                <div className={'header-title'}>
                    <p className={'title-bold'}>{value}</p>
                </div>
            </div>
            {
                open && <div className={'list'}>
                    {items.map(item => (
                        <button className={'list-item'} name={item.id} onClick={handleItemClick} key={item.id}>
                            {item.name}
                        </button>
                    ))}
                </div>
            }
        </div>
    );
};
