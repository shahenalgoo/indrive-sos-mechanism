import Image from 'next/image';
// Components

import Navbar from "@/app/(client)/components/sos/Navbar";
import RideTriggers from '../components/RideTriggers';


export default function Home() {
	return (
		<>
			{/* Content */}
			<div className='relative z-30'>

				<RideTriggers />

			</div>

			{/* MAP DEMO */}
			<figure className='z-10 absolute top-0 left-0 w-full h-full bg-black'>
				<Image src='/map.jpg' width={750} height={1624} alt='' className='w-auto h-auto opacity-70' />
			</figure>
		</>
	)
}
