import clsx from 'clsx';

import classes from './Input.module.css';

interface Props extends React.ComponentProps<'input'> {}

function Input({ className, ...rest }: Props) {
    return <input className={clsx(className, classes.root)} {...rest} />;
}

export default Input;
