import React, {useState} from 'react';
import { View } from 'react-native';
import TabStyle1 from '../../components/Tabs/TabStyle1';
import TradeHistory from './TradeHistory';
import OpenOrder from './OpenOrder';

type Props = {
    colors : any;
}

const OrderTabs = ({colors} : Props) => {

    const [activeTab , setActiveTab] = useState<string>('Open Orders');

    return (
        <View>
            <TabStyle1
                tabMenu={['Open Orders','Trade History']}
                setActiveTab={setActiveTab}
                activeTab={activeTab}
                colors={colors}
            />

            {activeTab === "Open Orders" ?
                <OpenOrder colors={colors}/>
                :
            activeTab === "Trade History" ?
                <TradeHistory colors={colors}/>
                :
                <></>
            }

        </View>
    )
}

export default OrderTabs;