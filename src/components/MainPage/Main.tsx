import React, { FC } from 'react';
import main1 from '../../image/main_page.png'
import SearchIcon from '@material-ui/core/SvgIcon/SvgIcon';
import { NoLoginText } from '../NoLogin/styles';

export const Main: FC = () => {

    const loginText: string = localStorage.getItem('token') === null ? 'Please login first' : 'Hello man';

    return (
        <div>
            <NoLoginText>
                Welcome to Github Client
                <br/>
                {loginText}
                <SearchIcon style={{color: '#a3aab1'}}/>
            </NoLoginText>
            <div>
                <img src={main1} style={{
                    display: 'block',
                    margin: '0 auto',
                    border: 'none',
                    height: 600,
                }} alt={'mainpage'}/>
            </div>
        </div>
    )
}
