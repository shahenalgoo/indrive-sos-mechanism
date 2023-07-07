'use client';

// React
import { useCallback, useEffect, useRef, useState } from "react";
import { notFound } from "next/navigation";

import { Role } from "@/types/enums";
import { SosMessage, SosReq } from "@/types/typings";

// Appwrite
import { AppwriteIds, client, databases, functions } from "@/lib/appwrite-config";
import { ID, Query } from "appwrite";

// Hooks
import { useUser } from "@/context/SessionContext";

// Components
import ChatMessages from "../../components/chat/ChatMessages";
import ChatInput from "../../components/chat/ChatInput";
import { useAgentSos } from "@/context/AgentSosContext";


type PageProps = {
	params: {
		id: string;
	}
}


const SosHandlingPage = ({ params: { id } }: PageProps) => {

	// States
	//
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [sosRequest, setSosRequest] = useState<SosReq | null>(null);


	const [newMessage, setNewMessage] = useState<string>('');
	const { user } = useUser();



	// FETCH SINGLE SOS REQUEST
	//
	const fetchSosRequest = useCallback(async () => {
		try {
			setIsLoading(true);
			const res = await databases.getDocument(AppwriteIds.databaseId, AppwriteIds.sosReqId, id);
			setSosRequest(res as SosReq);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}, []);

	const { updateSos } = useAgentSos();


	// Agent acknowledges SOS req
	const handleAcknowledgeReq = () => {
		updateSos(sosRequest, { req_acknowledged: true } as SosReq);
	}


	// Agent informs police
	const handleInformPolice = () => {
		updateSos(sosRequest, { agent_informed_police: true } as SosReq);
	}

	// Agent closes SOS req
	const handleChangeReqStatus = (value: boolean) => {
		updateSos(sosRequest, { is_active: value } as SosReq);
	}


	useEffect(() => {
		fetchSosRequest();

		const subscribe = client.subscribe(`databases.${AppwriteIds.databaseId}.collections.${AppwriteIds.sosReqId}.documents.${id}`, res => {
			fetchSosRequest();
		});

		return () => {
			subscribe();
		}
	}, [fetchSosRequest]);








	// Agent sends message to client
	const sendMessage = async () => {
		if (!sosRequest) {
			console.log("SOS REQUEST NOT FOUND");
			return;
		}

		try {
			const payload = {
				sos_related: id,
				agentId: user?.$id,
				// message: newMessage,
				message: "here to assist you",
				clientId: sosRequest.initiator
			}
			const res = await functions.createExecution(process.env.NEXT_PUBLIC_FUNCTION_SEND_MESSAGE as string, JSON.stringify(payload));
		} catch (error) {
			console.log(error);
		}
	}



	return (
		<div className="chat relative h-full">
			<ChatMessages id={id} />
			<ChatInput id={id} sosRequest={sosRequest} />
		</div>

		// <div className="h-full">
		// 	<ScrollArea className="h-full w-full bg-neutral-200">
		// 		<div className="flex flex-col gap-2 pr-4">

		// 			<Box>
		// 				<p>A critical SOS request has been initiated by the passenger.</p>
		// 				<p>The passenger {sosReq?.can_speak ? "CAN" : "CANNOT"} speak</p>

		// 			</Box>

		// 			{/* <p>wefewf afww</p>
		// 			<p>wefewf afww</p>
		// 			<p>wefewf afww</p>
		// 			<p>wefewf afww</p>
		// 			<p>wefewf afww</p>
		// 			<p>wefewf afww</p>
		// 			<p>wefewf afww</p>
		// 			<p>wefewf afww</p>
		// 			<p>wefewf afww</p>
		// 			<p>wefewf afww</p>
		// 			<p>wefewf afww</p>
		// 			<p>wefewf afww</p>
		// 			<p>wefewf afww</p>
		// 			<p>wefewf afww</p>
		// 			<p>wefewf afww</p>
		// 			<p>wefewf afww</p>
		// 			<p>wefewf afww</p>
		// 			<p>wefewf afww</p>
		// 			<p>wefewf afww</p>
		// 			<p>wefewf afww</p>
		// 			<p>wefewf afww</p>
		// 			<p>wefewf afww</p>
		// 			<p>wefewf afww</p>
		// 			<p>wefewf afww</p>
		// 			<p>wefewf afww</p> */}

		// 		</div>
		// 	</ScrollArea>
		// </div>
	)
}

export default SosHandlingPage;