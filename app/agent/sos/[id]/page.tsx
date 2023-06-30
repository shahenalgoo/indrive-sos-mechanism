'use client';

// React
import { useCallback, useEffect, useRef, useState } from "react";
import { notFound } from "next/navigation";

// Components

import { ScrollArea } from "@/components/ui/scroll-area";

type PageProps = {
	params: {
		id: string;
	}
}

const SosHandlingPage = ({ params: { id } }: PageProps) => {



	return (
		<div className="h-full">
			<ScrollArea className="h-full w-full">
				<div className="flex flex-col gap-2 pr-4">

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
					<p>wefewf afww</p>
					<p>wefewf afww</p>

				</div>
			</ScrollArea>
		</div>
	)
}

export default SosHandlingPage;