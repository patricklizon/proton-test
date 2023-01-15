import { ChangeEvent, ChangeEventHandler, memo, MouseEventHandler, useState } from 'react';

import Icon from '../atoms/Icon';
import LabelledIconButton from './LabelledIconButton';
import classes from './PasswordEdit.module.css';
import Labelled from '../atoms/Labelled';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import List from '../atoms/List';
import ListItem from '../atoms/ListItem';
import clsx from 'clsx';
import TextArea from '../atoms/TextArea';
import { Password } from '../models';

type UrlListProps = {
    urls: string[];
    onDelete: (idx: number) => MouseEventHandler;
    onEdit: (idx: number) => ChangeEventHandler;
};

const UrlList = memo(({ urls, onDelete, onEdit }: UrlListProps) => (
    <List className={classes.urlList}>
        {urls?.map((urlEntry, index) => (
            <ListItem dense className={classes.urlListItem} key={urlEntry}>
                <input autoFocus value={urlEntry} onChange={onEdit(index)} />
                <Icon onClick={onDelete(index)} size="small" className="fas fa-times" />
            </ListItem>
        ))}
        {urls?.length === 0 && (
            <ListItem dense className={clsx(classes.urlListItem, classes.urlListItemEmpty)}>
                No urls added
            </ListItem>
        )}
    </List>
));

type PasswordEditProps = {
    password: Password;
    onSave: (p: Password) => void;
    onDelete: () => void;
    onCancel: () => void;
};

function PasswordEdit({ password, onSave, onDelete, onCancel }: PasswordEditProps): JSX.Element {
    const [values, setValues] = useState<Password>(password);

    const [urlInput, setUrlInput] = useState('');
    const isUrlInputEmpty = !urlInput.length;

    function change(partial: Record<string, any>) {
        setValues((values) => ({
            ...values,
            ...partial,
        }));
    }

    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        change({ [e.target.name]: e.target.value });
    }

    function handleSaveClick() {
        onSave({
            ...password,
            ...values,
        });
    }

    function handleDeleteClick() {
        onDelete();
    }

    function handleCancelClick() {
        onCancel();
    }

    function handleUrlAdd(urls: readonly string[]): MouseEventHandler {
        return () => {
            const url = [...urls];

            url.unshift(urlInput.trim());

            change({ url });

            setUrlInput('');
        };
    }

    const handleUrlDelete =
        (urls: readonly string[]) =>
        (index: number): MouseEventHandler =>
        (_) => {
            const url = [...urls];

            url.splice(index, 1);

            change({ url });
        };

    const handleUrlEdit = (urls: readonly string[]) => (index: number) => (e: ChangeEvent<HTMLInputElement>) => {
        const url = [...urls];

        url[index] = e.target.value;

        change({ url });
    };

    return (
        <div className={classes.container}>
            <h2 className={classes.title}>
                <input
                    autoFocus
                    className={classes.titleInput}
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                />
            </h2>

            <div className={classes.content}>
                <Labelled label="description">
                    <TextArea name="description" value={values.description} onChange={handleChange} />
                </Labelled>

                <Labelled label="value">
                    <Input name="value" value={values.value} onChange={handleChange} />
                </Labelled>

                <Labelled label="url">
                    <div>
                        <Input
                            value={urlInput}
                            onChange={(e) => setUrlInput(e.target.value)}
                            style={{ marginRight: 4 }}
                        />

                        <Button onClick={handleUrlAdd(values.url)} disabled={isUrlInputEmpty}>
                            Add
                        </Button>
                    </div>

                    <UrlList
                        urls={values.url}
                        onEdit={handleUrlEdit(values.url)}
                        onDelete={handleUrlDelete(values.url)}
                    />
                </Labelled>
            </div>
            <div className={classes.controls}>
                <LabelledIconButton
                    label="Cancel"
                    className={classes.cancel}
                    onClick={handleCancelClick}
                    icon={<Icon size="small" className="fas fa-times" />}
                />

                <LabelledIconButton
                    label="Save"
                    onClick={handleSaveClick}
                    icon={<Icon size="small" className="fas fa-save" />}
                />

                <LabelledIconButton
                    label="Delete"
                    className={classes.delete}
                    onClick={handleDeleteClick}
                    icon={<Icon size="small" className="fas fa-trash" />}
                />
            </div>
        </div>
    );
}

export default PasswordEdit;
