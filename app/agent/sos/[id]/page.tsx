'use client';

// React
import { useCallback, useEffect, useRef, useState } from "react";
import { notFound } from "next/navigation";

// Components

import { ScrollArea } from "@/components/ui/scroll-area";
import { SosMessage, SosReq } from "@/types/typings";
import { AppwriteIds, client, databases, functions } from "@/lib/appwrite-config";
import Box from "@/components/ui/box";
import { ID, Query } from "appwrite";
import { Role } from "@/types/enums";
import { useUser } from "@/context/SessionContext";

type PageProps = {
	params: {
		id: string;
	}
}

const SosHandlingPage = ({ params: { id } }: PageProps) => {

	// States
	const [sosReq, setSosReq] = useState<SosReq | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const [newMessage, setNewMessage] = useState<string>('');

	const [allMessages, setAllMessages] = useState<SosMessage[] | null>(null);

	const { user } = useUser();


	// Fetch Sos Request data
	const fetchSosReq = useCallback(async () => {
		setIsLoading(true);

		try {

			const res = await databases.getDocument(AppwriteIds.databaseId, AppwriteIds.sosReqId, id);

			setSosReq(res as SosReq);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}, []);


	// Fetch messages for SOS request
	//
	const fetchMessages = useCallback(async () => {
		try {

			const res = await databases.listDocuments(AppwriteIds.databaseId, AppwriteIds.messagesId,
				[
					Query.equal("sos_related", id),
					Query.orderDesc("$createdAt")
				]
			);

			if (res.total > 0) {
				setAllMessages(res.documents as SosMessage[]);
				console.log("all messages", res.documents);

			} else {
				console.log("No Messages found");
			}


		} catch (error) {

			console.log(error);

		} finally {
			setIsLoading(false);
		}
	}, []);


	// Update Sos
	//
	const updateSos = async (data: any) => {
		if (!sosReq) {
			console.log("SOS REQUEST NOT FOUND");
			return;
		}

		try {

			const res = await databases.updateDocument(AppwriteIds.databaseId, AppwriteIds.sosReqId, sosReq.$id, data)

		} catch (error) {
			console.log(error);
		}
	}


	// Agent acknowledges SOS req
	//
	const handleAcknowledgeReq = () => {
		updateSos({ req_acknowledged: true } as SosReq);
	}


	// Agent informs police
	//
	const handleInformPolice = () => {
		updateSos({ agent_informed_police: true } as SosReq);
	}


	// Agent closes SOS req
	//
	const handleChangeReqStatus = (value: boolean) => {
		updateSos({ is_active: value } as SosReq);
	}


	// Agent sends message to client
	//
	const sendMessage = async () => {
		if (!sosReq) {
			console.log("SOS REQUEST NOT FOUND");
			return;
		}

		try {

			// const res = await databases.createDocument(AppwriteIds.databaseId, AppwriteIds.messagesId, ID.unique(), {
			// 	sos_related: id,
			// 	sender: user?.$id,
			// 	role: Role.agent,
			// 	// message: newMessage
			// 	message: "here to assist you"
			// } as SosMessage)

			const payload = {
				sos_related: id,
				agentId: user?.$id,
				// message: newMessage,
				message: "here to assist you",
				clientId: sosReq.initiator
			}

			const res = await functions.createExecution(process.env.NEXT_PUBLIC_FUNCTION_SEND_MESSAGE as string, JSON.stringify(payload));


		} catch (error) {
			console.log(error);
		}
	}


	// UEF - Sos request
	useEffect(() => {
		fetchSosReq();

		// Subscribe to live changes for the SOS request
		const subscribeSos = client.subscribe(`databases.${AppwriteIds.databaseId}.collections.${AppwriteIds.sosReqId}.documents.${id}`, res => {
			fetchSosReq();
		});

		return () => {
			// Unsubscribe on unmount
			subscribeSos();
		}

	}, [fetchSosReq]);


	// UEF - SOS req messages
	useEffect(() => {
		fetchMessages();

		const subscribeSosMessages = client.subscribe(`databases.${AppwriteIds.databaseId}.collections.${AppwriteIds.messagesId}.documents`, res => {
			const eventMessage: SosMessage = res.payload as SosMessage;
			if (eventMessage.sos_related === id) {
				fetchMessages();
			}
		});
		return () => {
			// Unsubscribe on unmount
			subscribeSosMessages();
		}
	}, [fetchMessages]);



	return (
		<div className="h-full">
			<ScrollArea className="h-full w-full bg-neutral-200">
				<div className="flex flex-col gap-2 pr-4">

					<Box className="bg-white">
						<p>A critical SOS request has been initiated by the passenger.</p>
						<p>The passenger {sosReq?.can_speak ? "CAN" : "CANNOT"} speak</p>

					</Box>

					{/* <p>wefewf afww</p>
					<p>wefewf afww</p>
					<p>wefewf afww</p>
					<p>wefewf afww</p>
					<p>wefewf afww</p>
					<p>wefewf afww</p>
					<p>wefewf afww</p>
					<p>wefewf afww</p>
					<p>wefewf afww</p>
					<p>wefewf afww</p>
					<p>wefewf afww</p>
					<p>wefewf afww</p>
					<p>wefewf afww</p>
					<p>wefewf afww</p>
					<p>wefewf afww</p>
					<p>wefewf afww</p>
					<p>wefewf afww</p>
					<p>wefewf afww</p>
					<p>wefewf afww</p>
					<p>wefewf afww</p>
					<p>wefewf afww</p>
					<p>wefewf afww</p>
					<p>wefewf afww</p>
					<p>wefewf afww</p>
					<p>wefewf afww</p> */}

				</div>
			</ScrollArea>
		</div>
	)
}

export default SosHandlingPage;