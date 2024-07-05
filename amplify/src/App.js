import React, { useState, useEffect } from 'react';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { createMessage } from './graphql/mutations';
import { onCreateMessage } from './graphql/subscriptions';
import { listMessages } from './graphql/queries';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchMessages();
    const subscription = API.graphql(graphqlOperation(onCreateMessage)).subscribe({
      next: (eventData) => {
        const newMessage = eventData.value.data.onCreateMessage;
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    });

    Auth.currentAuthenticatedUser()
      .then(user => setUser(user))
      .catch(() => console.log('Not signed in'));

    return () => subscription.unsubscribe();
  }, []);

  const fetchMessages = async () => {
    try {
      const messageData = await API.graphql(graphqlOperation(listMessages));
      const messages = messageData.data.listMessages.items;
      setMessages(messages);
    } catch (error) {
      console.error('Error fetching messages', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!message) return;

    try {
      await API.graphql(graphqlOperation(createMessage, { input: { content: message, owner: user.username } }));
      setMessage('');
    } catch (error) {
      console.error('Error sending message', error);
    }
  };

  return (
    <div className="App">
      <h1>Real-Time Chat</h1>
      {user ? (
        <>
          <div className="chat-box">
            {messages.map((msg) => (
              <p key={msg.id}><strong>{msg.owner}:</strong> {msg.content}</p>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message"
            />
            <button type="submit">Send</button>
          </form>
        </>
      ) : (
        <p>Please sign in to chat.</p>
      )}
    </div>
  );
};

export default App;
