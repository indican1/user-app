import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions, Image, Share } from 'react-native';
import { Text } from 'react-native-paper';
import AppHeader from '../components/header';
import { COLORS } from '../assets/colors';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { recentActivity } from '../redux/action/action';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { FONTS } from '../constants';



const { width, height } = Dimensions.get('window');

const Home = ({ navigation }) => {

    const array = [
        {
            'id': 1,
            'img': require('../assets/images/1.jpeg')
        },
        {
            'id': 2,
            'img': require('../assets/images/2.jpeg')
        },
        {
            'id': 3,
            'img': require('../assets/images/3.jpeg')
        },
        {
            'id': 4,
            'img': require('../assets/images/4.jpeg')
        },
        {
            'id': 5,
            'img': require('../assets/images/5.jpeg')
        }
    ]

    const dispatch = useDispatch()

    const { user, recentData } = useSelector(state => ({
        user: state.userReducer.user,
        recentData: state.userReducer.recentArray
    }));

    useEffect(async () => {
        const data = await AsyncStorage.getItem('RECENTDATA');
        if (data != null || data != undefined) {
            let mData = JSON.parse(data)
            dispatch(recentActivity(mData))
        }
    }, [])

    return (
        <View style={styles.container}>
            <AppHeader navigation={navigation} title='IndiScan' backgroundColor={COLORS.themeColor} icon1='menu' icon2='ios-search' icon3='notifications-outline'
                icon1Color={COLORS.white} profilePic={user.profile} />
            <KeyboardAwareScrollView keyboardShouldPersistTaps='always'>
                <View style={styles.greenCard} />
                    <View style={styles.whiteCard}>
                        <View style={{
                            borderBottomColor: COLORS.lightGray, borderBottomWidth: 2, height: 70,
                           width: '90%', alignSelf: 'center', justifyContent: 'space-between'
                        }}>
                            <Text style={{ marginTop: 10, color: COLORS.color3, fontFamily: FONTS.openSans_Bold, fontSize: 22 }}>Hello, {user.first_name}</Text>
                            <Text style={[styles.phone_number, { marginTop: 3 }]}>{user.phone_number}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ flex: 1, justifyContent: 'center' }}>
                                <Text style={{ marginTop: 20, marginLeft: 20, color: COLORS.color2, fontFamily: FONTS.openSans_Regular }}>Current Balance</Text>
                                <Text style={{ marginLeft: 20, marginTop: 5, color: COLORS.color1, fontFamily: FONTS.openSans_Regular, fontSize: 18 }}>{`$${user.wallet.toFixed(2)}`}</Text>
                            </View>

                            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', }}>
                                <TouchableOpacity style={styles.siginBtn}
                                    onPress={() => {
                                        navigation.navigate('addCash')
                                    }}
                                >
                                    <Text style={{ color: COLORS.white, alignSelf: 'center', fontSize: 12, fontFamily: FONTS.openSans_Regular }}>{
                                        'Add Cash'
                                    }</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                {/* Second Card */}
                <View style={[styles.whiteCard, { top: height / 4, flexDirection: 'row', height: height / 12, justifyContent: 'space-between', alignItems: 'center' }]}>
                    <TouchableOpacity style={[styles.trascationCard, { marginLeft: 10 }]}
                        onPress={() => {
                            navigation.navigate('sendCash')
                        }}
                    >
                        <Image style={styles.icon}
                            source={require('../assets/images/sendmoney.png')}
                        />
                        <Text style={styles.tabsTitle}>Send Money</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.trascationCard}
                        onPress={async () => {
                            await Share.share({
                                message: 'There will be app link'
                            })
                        }}
                    >
                        <Image style={styles.icon}
                            source={require('../assets/images/inviteuser.png')}
                        />
                        <Text style={styles.tabsTitle}>Invit User</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.trascationCard}
                        onPress={() => {
                            
                        }}
                    >
                        <Image style={styles.icon}
                            source={require('../assets/images/helpicon.png')}
                        />
                        <Text style={styles.tabsTitle}>Help</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.trascationCard, { marginRight: 10 }]}
                        onPress={() => navigation.navigate('transactionHistory')}
                    >
                        <Image style={styles.icon}
                            source={require('../assets/images/trx_history.png')}
                        />
                        <Text style={styles.tabsTitle}>Transaction History</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1, marginTop: height / 4 }}>
                    <Text style={styles.cardsTitle}>Promotions</Text>
                    <KeyboardAwareScrollView
                        contentContainerStyle={{ marginTop: 15 }}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        {
                            array.map((item, index) => {
                                return (
                                    <View key={index} style={[styles.promotionCard, { marginLeft: index > 0 ? 10 : 25, marginRight: index === array.length - 1 ? 10 : 0 }]}>
                                        <Image style={styles.promotionImg}
                                            source={item.img}
                                        />
                                    </View>
                                )
                            })
                        }

                    </KeyboardAwareScrollView>
                    {/* {
                        recentData.length != 0 && (
                            <>
                                <Text style={[styles.cardsTitle, { marginTop: 20 }]}>Favourites</Text>
                                <ScrollView
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                >
                                    {
                                        recentData.map((item, index) => {
                                            return (
                                                <View style={[styles.favouriteCard, { marginLeft: index > 0 ? 10 : 25, marginRight: index === array.length - 1 ? 10 : 0 }]}>
                                                    <Text>Icon</Text>
                                                    <Text>{item.destinationId.substring(0,10)}</Text>
                                                </View>
                                            )
                                        })
                                    }

                                </ScrollView>
                            </>
                        )
                    } */}
                </View>

            </KeyboardAwareScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.white },

    greenCard: { width: '100%', height: height / 6, backgroundColor: COLORS.themeColor },

    whiteCard: {
        width: '90%', height: height / 4.5, backgroundColor: COLORS.white, alignSelf: 'center', borderRadius: 10, marginTop: 40,
        shadowColor: COLORS.black, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.23, shadowRadius: 2.62, elevation: 10, position: 'absolute'
    },

    siginBtn: {
        width: 80, height: 22, borderRadius: 5, backgroundColor: COLORS.themeColor,
        justifyContent: 'center', alignSelf: 'flex-end', marginRight: 20
    },

    phone_number: { marginTop: 15, color: COLORS.color4, fontFamily: FONTS.openSans_Regular, fontSize: 15 },

    trascationCard: { width: 70, height: '100%', justifyContent: 'space-evenly', alignItems: 'center' },

    icon: { width: 30, height: 30, resizeMode: 'contain' },

    tabsTitle: { fontSize: 11, textAlign: 'center', color: COLORS.color3, fontFamily: FONTS.openSans_Regular },

    promotionCard: {
        width: 320, height: 170, backgroundColor: COLORS.white, borderRadius: 10, alignItems: 'center', justifyContent: 'center',
        shadowColor: COLORS.black, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.23,
        shadowRadius: 2.62, elevation: 10, marginTop: 10, flexDirection: 'row', bottom: 5
    },

    promotionImg: { width: 320, height: 170, borderRadius: 10, },

    cardsTitle: { marginLeft: 30, fontWeight: 'bold', color: COLORS.color1, fontFamily: FONTS.openSans_Bold, fontSize: 18 },

    favouriteCard: {
        width: 100, height: 100, backgroundColor: COLORS.white, borderRadius: 10, alignItems: 'center', justifyContent: 'center',
        shadowColor: COLORS.black, shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.23, shadowRadius: 2.62, elevation: 10, marginTop: 10, bottom: 5
    },
})

export default Home;