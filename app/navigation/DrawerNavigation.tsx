import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomNavigation from './BottomNavigation';
import { DrawerParamList } from './DrawerParamList';
import DrawerMenu from '../layout/DrawerMenu';
import { SafeAreaView } from 'react-native';

const Drawer = createDrawerNavigator<DrawerParamList>();

function DrawerNavigation() {
    return (
        <SafeAreaView
            style={{
                flex:1,
            }}
        >
            <Drawer.Navigator
                screenOptions={{
                    headerShown : false,
                    overlayColor : 'rgba(13,16,16,.8)',
                }}
                drawerContent={(props) => <DrawerMenu {...props}/>}
                >
                <Drawer.Screen name="BottomTab" component={BottomNavigation} />
            </Drawer.Navigator>
        </SafeAreaView>
    );
}

export default DrawerNavigation;