'use client';

// React
import { useCallback, useEffect, useState } from "react";

// Typings
import { SosReq } from "@/types/typings";

// Appwrite
import { AppwriteIds, client, databases } from "@/lib/appwrite-config";

// Components
import ChatMessages from "../../components/chat/ChatMessages";
import ChatInput from "../../components/chat/ChatInput";
import RightSidebar from "../../components/chat-sidebar/RightSidebar";
import ChatHeader from "../../components/chat-header/ChatHeader";




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


	// Fetch current sos request
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


	// UEF - fetch + subscribe to changes
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
			<ChatHeader sosRequest={sosRequest} />

			<div className="flex h-full">
				<div className="chat relative h-full flex-1">
					<ChatMessages id={id} sosRequest={sosRequest} />
					<ChatInput id={id} sosRequest={sosRequest} />
				</div>
				<RightSidebar sosRequest={sosRequest} />
			</div>
		</>
	)
}

export default SosHandlingPage;