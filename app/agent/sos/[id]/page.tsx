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
import RightSidebar from "../../components/sidebar-right/RightSidebar";


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


	return (
		<>
			<div className="chat relative h-full flex-1">
				<ChatMessages id={id} sosRequest={sosRequest} />
				<ChatInput id={id} sosRequest={sosRequest} />
			</div>
			<RightSidebar sosRequest={sosRequest} />
		</>
	)
}

export default SosHandlingPage;