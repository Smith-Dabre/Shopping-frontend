import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { View, Button, SafeAreaView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ProfileScreen({ navigation }) {
    const { logout } = useContext(AuthContext);

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#cdc2c2ff' }}>
            {/* <Button title="Logout" onPress={logout} /> */}
            <TouchableOpacity onPress={logout}>
                <Icon name="log-out-outline" size={100}/>
            </TouchableOpacity>
        </SafeAreaView>
    );

}

