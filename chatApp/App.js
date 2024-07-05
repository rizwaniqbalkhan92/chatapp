// import React, { useEffect, useState } from 'react';
// import { SafeAreaView, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
// import io from 'socket.io-client';

// const socket =  io('http://192.168.0.106:5001');

// const App = () => {
//     const [message, setMessage] = useState('');
//     const [messages, setMessages] = useState([]);

//     useEffect(() => {
//         socket.on('previousMessages', (previousMessages) => {
//             setMessages(previousMessages);
//         });

//         socket.on('message', (message) => {
//             setMessages((prevMessages) => [...prevMessages, message]);
//         });

//         return () => {
//             socket.off('previousMessages');
//             socket.off('message');
//         };
//     }, []);

//     const sendMessage = () => {
//         socket.emit('message', message);
//         setMessage('');
//     };

//     return (
//         <SafeAreaView style={styles.container}>
//             <FlatList
//                 data={messages}
//                 renderItem={({ item }) => <Text style={styles.message}>{item.content}</Text>}
//                 keyExtractor={(item) => item._id}
//             />
//             <TextInput
//                 style={styles.input}
//                 value={message}
//                 onChangeText={setMessage}
//                 placeholder="Type a message"
//             />
//             <Button title="Send" onPress={sendMessage} />
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         padding: 16,
//     },
//     input: {
//         borderWidth: 1,
//         padding: 8,
//         marginVertical: 16,
//     },
//     message: {
//         padding: 8,
//         backgroundColor: '#f1f1f1',
//         marginVertical: 4,
//     },
// });

// export default App;
import React, { useEffect, useState } from 'react';
import { SafeAreaView, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import io from 'socket.io-client';

// Replace with your server's IP and port
const socket = io('http://192.168.0.106:5001');

const App = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Listen for previous messages from the server
        socket.on('previousMessages', (previousMessages) => {
            setMessages(previousMessages);
        });

        // Listen for new messages from the server
        socket.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.off('previousMessages');
            socket.off('message');
        };
    }, []);

    const sendMessage = () => {
        socket.emit('message', message);
        setMessage('');
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={messages}
                renderItem={({ item }) => <Text style={styles.message}>{item.content}</Text>}
                keyExtractor={(item) => item._id}
            />
            <TextInput
                style={styles.input}
                value={message}
                onChangeText={setMessage}
                placeholder="Type a message"
            />
            <Button title="Send" onPress={sendMessage} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    input: {
        borderWidth: 1,
        padding: 8,
        marginVertical: 16,
    },
    message: {
        padding: 8,
        backgroundColor: '#f1f1f1',
        marginVertical: 4,
    },
});

export default App;
