import React from 'react';
import clsx from 'clsx';

import classes from './ListItem.module.css';

interface Props extends React.ComponentPropsWithoutRef<'li'> {
    clickable?: boolean;
    dense?: boolean;
    selected?: boolean;
}

function ListItem({ className, clickable, dense, onClick, selected, ...rest }: Props) {
    const rootClassName = clsx(className, classes.root, {
        [classes.clickable]: clickable,
        [classes.dense]: dense,
        [classes.selected]: selected,
    });

    function handleClick(e: React.MouseEvent<HTMLLIElement, MouseEvent>) {
        onClick?.(e);
    }

    return <li className={rootClassName} onClick={handleClick} {...rest} />;
}

export default ListItem;
