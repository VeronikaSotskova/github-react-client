import React, { FC } from 'react';
import { NoLoginText } from './styles';


export const NoLogin: FC = () => {
    return (
        <div>
            <p>aaaa</p>
            <NoLoginText>Please log in</NoLoginText>
            <img src='/src/image/main_page.png' width={'650'} height={'540'} style={{
                display: 'block',
                margin: '0 auto',
            }} alt={'profilepage'}/>
        </div>
    );
}
