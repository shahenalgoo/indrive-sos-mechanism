import Image from 'next/image';
// Components

import RideTriggers from '../components/RideTriggers';
import MoodsPrefs from '../components/moods/MoodsPrefs';


export default function Home() {
	return (
		<>
			<MoodsPrefs />

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
