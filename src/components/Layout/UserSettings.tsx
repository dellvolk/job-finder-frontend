import React from 'react';
import styled from 'styled-components';

interface IUserSettingsProps {

}

const UserSettings: React.FC<IUserSettingsProps> = ({}) => {
    return (
        <UserSettingsStyled>
            Settings
        </UserSettingsStyled>
    )
};

const UserSettingsStyled = styled.div`
    min-width: 500px;
    padding: 50px 30px;
`

export default (UserSettings);
