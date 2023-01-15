import React, { useState } from 'react';
import uniqid from 'uniqid';

import AppHeader from './AppHeader';
import Passwords from './Passwords';
import NoPasswordSelected from './NoPasswordSelected';
import NoPasswords from './NoPasswords';
import PasswordView from './PasswordView';
import PasswordEdit from './PasswordEdit';

import { Password } from '../models';
import classes from './PasswordMainContainer.module.css';

function createNewPassword(): Password {
    const id = uniqid();

    return {
        id,
        value: '',
        url: [],
        createdAt: Date.now(),
        name: '',
    };
}

interface Props {
    decryptedPasswords: { [key: string]: Password };
    onLogout: () => void;
    onPasswordCreated: (password: Password) => void;
    onPasswordEdited: (password: Password) => void;
    onPasswordDeleted: (id: string) => void;
}

const PasswordMain = ({
    decryptedPasswords,
    onLogout,
    onPasswordCreated,
    onPasswordEdited,
    onPasswordDeleted,
}: Props) => {
    const [selectedPasswordId, setSelectedPasswordId] = useState<string | null>(null);

    const [editing, setEditing] = useState(false);

    function handleCreatePassword() {
        const newPassword = createNewPassword();
        onPasswordCreated(newPassword);
        setSelectedPasswordId(newPassword.id);
        setEditing(true);
    }

    async function handleSelectPassword(id: string) {
        setSelectedPasswordId(selectedPasswordId === id ? null : id);
    }

    function handleDelete(id: string) {
        return (): void => {
            onPasswordDeleted(id);
            setEditing(false);
            setSelectedPasswordId(null);
        };
    }

    function handleCancel() {
        setEditing(false);
    }

    function handlePasswordEditIntent() {
        setEditing(true);
    }

    function handleSave(password: Password) {
        onPasswordEdited(password);
        setEditing(false);
    }

    const amountOfVulnerablePasswords = Object.keys(decryptedPasswords).reduce<number>(
        (acc, key) => acc + +(decryptedPasswords[key].value.length < 3),
        0
    );

    return (
        <div className={classes.container}>
            <div className={classes.headerArea}>
                <AppHeader
                    editing={editing}
                    amountOfVulnerablePasswords={amountOfVulnerablePasswords}
                    onNewPassword={handleCreatePassword}
                    onLogout={onLogout}
                />
            </div>

            <div className={classes.passwordsArea}>
                {Object.values(decryptedPasswords).length > 0 ? (
                    <Passwords
                        selectedPasswordId={selectedPasswordId}
                        passwords={decryptedPasswords}
                        editing={editing}
                        onSelectPassword={handleSelectPassword}
                    />
                ) : (
                    <NoPasswords />
                )}
            </div>

            <div className={classes.passwordArea}>
                {selectedPasswordId !== null ? (
                    editing ? (
                        <PasswordEdit
                            password={decryptedPasswords[selectedPasswordId]}
                            onSave={handleSave}
                            onCancel={handleCancel}
                            onDelete={handleDelete(selectedPasswordId)}
                        />
                    ) : (
                        <PasswordView
                            password={decryptedPasswords[selectedPasswordId]}
                            onEdit={handlePasswordEditIntent}
                        />
                    )
                ) : (
                    <NoPasswordSelected />
                )}
            </div>
        </div>
    );
};

export default PasswordMain;
