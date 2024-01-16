import React, { useState, useEffect, useRef } from 'react';
import { List, Typography, Box } from '@mui/material';
import { firestore } from '../../../configs/firebase';
import {
	collection,
	query,
	doc,
	orderBy,
	or,
	and,
	limit,
	where,
	startAfter,
	onSnapshot,
	getDocs,
	DocumentSnapshot,
} from 'firebase/firestore';
import {
	Message as MessageType,
	MessageWithId,
} from '../../../types/firestore';
import Message from './Message';

interface MessagesInfiniteScrollProps {
	userId: string;
	secondUserId: string;
}

export default function MessagesInfiniteScroll({
	userId,
	secondUserId,
}: MessagesInfiniteScrollProps) {
	const listRef = useRef<HTMLUListElement | null>(null);
	const [messages, setMessages] = useState<MessageWithId[]>([]);
	const [newMessages, setNewMessages] = useState<MessageWithId[]>([]);
	const [lastVisible, setLastVisible] = useState<DocumentSnapshot | null>(null);
	const [loading, setLoading] = useState(false);
	const [canFetchMore, setCanFetchMore] = useState(true);
	const [unsubscribes, setUnsubscribes] = useState<(() => void)[]>([]);
	const [unsubscribesNew, setUnsubscribesNew] = useState<(() => void)[]>([]);

	const processedMessageIds = new Set();

	const fetchMoreMessages = async () => {
		setLoading(true);
		const messagesRef = collection(firestore, 'messages');
		let messagesQuery = query(
			messagesRef,
			or(
				and(
					where('recipientId', '==', userId),
					where('senderId', '==', secondUserId)
				),
				and(
					where('recipientId', '==', secondUserId),
					where('senderId', '==', userId)
				)
			),
			orderBy('timestamp', 'desc'),
			limit(10)
		);
		if (lastVisible) {
			messagesQuery = query(
				messagesRef,
				or(
					and(
						where('recipientId', '==', userId),
						where('senderId', '==', secondUserId)
					),
					and(
						where('recipientId', '==', secondUserId),
						where('senderId', '==', userId)
					)
				),
				orderBy('timestamp', 'desc'),
				startAfter(lastVisible),
				limit(10)
			);
		}

		// Get the initial data and set up listeners for each document
		const querySnapshot = await getDocs(messagesQuery);
		if (querySnapshot.docs.length === 0) {
			// No more posts to load, disable the "fetch more"
			setCanFetchMore(false);
			return;
		}
		querySnapshot.docs.forEach((document) => {
			const messageId = document.id;
			const messageData = document.data() as MessageType;

			// Add new comment to the state
			setMessages((prevMessages) => {
				if (!prevMessages.some((prevMessage) => prevMessage.id === messageId)) {
					return [...prevMessages, { id: messageId, ...messageData }];
				}
				return prevMessages;
			});

			// Set up a listener for this specific document
			const docRef = doc(firestore, 'messages', messageId);

			const unsubscribeSnapshot = onSnapshot(docRef, (docSnapshot) => {
				const updatedMessage: MessageWithId = {
					id: docSnapshot.id,
					...(docSnapshot.data() as MessageType),
				};

				if (!processedMessageIds.has(messageId)) {
					processedMessageIds.add(docSnapshot.id);
					setMessages((prevMessages) =>
						prevMessages.map((prevMessage) =>
							prevMessage.id === updatedMessage.id
								? updatedMessage
								: prevMessage
						)
					);
				}
			});

			setUnsubscribes((prevUnsubscribes) => [
				...prevUnsubscribes,
				unsubscribeSnapshot,
			]);
		});

		setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]);
		setLoading(false);
	};

	const handleScroll = () => {
		if (
			listRef.current &&
			listRef.current.clientHeight - listRef.current.scrollHeight + 25 >=
				listRef.current.scrollTop &&
			!loading &&
			canFetchMore
		) {
			fetchMoreMessages();
		}
	};

	useEffect(() => {
		const listElement = listRef.current;
		listElement?.addEventListener('scroll', handleScroll);
		return () => {
			listElement?.removeEventListener('scroll', handleScroll);
		};
	}, [lastVisible]);

	useEffect(() => {
		fetchMoreMessages();

		return () => {
			unsubscribes.forEach((unsubscribe) => {
				unsubscribe();
			});

			setMessages([]);
			setLastVisible(null);
			setLoading(false);
			setCanFetchMore(true);
			setUnsubscribes([]);
		};
	}, [secondUserId]);

	const setupRealtimeListener = () => {
		const messagesRef = collection(firestore, 'messages');
		const realtimeQuery = query(
			messagesRef,
			or(
				and(
					where('recipientId', '==', userId),
					where('senderId', '==', secondUserId)
				),
				and(
					where('recipientId', '==', secondUserId),
					where('senderId', '==', userId)
				)
			),
			limit(1),
			orderBy('timestamp', 'desc')
		);

		const unsubscribeRealtime = onSnapshot(realtimeQuery, (snapshot) => {
			snapshot.docChanges().forEach((change) => {
				if (change.type === 'added') {
					const messageId = change.doc.id;
					const messageData = change.doc.data() as MessageType;

					// Check if the message is not already in the state
					if (!processedMessageIds.has(messageId)) {
						// Add the message ID to the set to mark it as processed
						processedMessageIds.add(messageId);
						if (listRef.current && listRef.current.scrollTop >= -25) {
							setTimeout(() => {
								if (listRef.current) {
									listRef.current.scrollTop = listRef.current.scrollHeight;
								}
							}, 50);
						}

						const timestamp = messageData.timestamp || new Date();

						setNewMessages((prevMessages) => [
							{ id: messageId, ...messageData, timestamp },
							...prevMessages,
						]);
					}
				}
			});
		});

		// Add the unsubscribe function to the state
		setUnsubscribesNew((prevUnsubscribes) => [
			...prevUnsubscribes,
			unsubscribeRealtime,
		]);
	};

	useEffect(() => {
		// Set up a real-time listener for new messages
		setTimeout(setupRealtimeListener, 1000);

		return () => {
			// Clean up listeners and state when the component unmounts
			unsubscribesNew.forEach((unsubscribe) => unsubscribe());

			setNewMessages([]);
			setUnsubscribesNew([]);
		};
	}, [secondUserId]);

	return (
		<List
			ref={listRef}
			style={{
				height: '100%',
				overflowY: 'auto',
				flexGrow: 1,
				display: 'flex',
				flexDirection: 'column-reverse',
			}}
		>
			<Box sx={{ display: 'flex', flexDirection: 'column-reverse' }}>
				{newMessages.map((message) => (
					<Message key={message.id} message={message} />
				))}
			</Box>
			<Box sx={{ display: 'flex', flexDirection: 'column-reverse' }}>
				{messages.map((message) => (
					<Message key={message.id} message={message} />
				))}
			</Box>
		</List>
	);
}
