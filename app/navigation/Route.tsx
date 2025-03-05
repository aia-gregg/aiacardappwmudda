import React from 'react';
import StackNavigator from './StackNavigator';
import { ThemeContextProvider } from '../constants/ThemeContext';

class Route extends React.PureComponent {
    render(){
        return (
            <ThemeContextProvider>
                <StackNavigator/>
            </ThemeContextProvider>
        )
    }
}

export default Route;