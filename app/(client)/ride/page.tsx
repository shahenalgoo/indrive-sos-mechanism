'use client';

// React
import Image from 'next/image';

// Components
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Icons
import { TbCircleCheckFilled, TbLoader2, TbMessage, TbPhone, TbStarFilled } from 'react-icons/tb';

// Libs
import { setGlobalState } from '@/lib/global-states';

// Other Comps
import RideTriggers from '../components/RideTriggers';
import Logout from '../components/Logout';
import TipsRotator from '../components/TipsRotator';


export default function Home() {

	// Tips List
	//
	const tips = [
		"Respect and empathy create a positive ride experience.",
		"Kindness is contagious, spread it during your ride.",
		"Everyone has their own story and struggles. Be nice.",
		"Treat others with the same compassion you expect.",
		"Embrace diversity, we are all unique individuals.",
		"Your words and actions can make someone's day better.",
		"Remember, we're all humans sharing this ride together."
	]


	return (
		<>

			{/* Header */}
			<div className='absolute top-0 left-0 z-30 w-full px-4 py-2 bg-white border-b-2 border-border'>
				<Logout />
			</div>


			{/* Tips Rotator */}
			<div className="absolute top-16 left-0 z-30 w-full px-3">
				<TipsRotator tips={tips} interval={4000} />
			</div>


			{/* Ride Details */}
			<div className='absolute bottom-0 left-0 z-30 w-full'>
				<div className='flex justify-center gap-2 p-4'>
					<RideTriggers />
				</div>

				<div className='flex items-center justify-between gap-4 px-4 py-3 bg-white border-t-2 border-border'>
					<div className=''>
						<h4 className='text-sm font-semibold mb-1 ml-1'>
							Ford Fiesta
						</h4>
						<span className='inline-block border border-neutral-300 rounded-lg px-4 font-bold bg-white'>
							FRD 3568
						</span>
					</div>

					<div>
						<Button onClick={() => setGlobalState('rideDetailsModal', true)} size='sm'>
							Ride Details
						</Button>
					</div>
				</div>

				<div className='flex items-center gap-2 p-3 bg-neutral-100'>
					<Avatar className='mr-2'>
						<AvatarImage src="https://github.com/shadcn.png" />
						<AvatarFallback>
							<TbLoader2 className='animate-spin opacity-30' />
						</AvatarFallback>
					</Avatar>

					<div>
						<div className='mb-1 flex items-center gap-2'>
							<TbCircleCheckFilled size={18} className='text-blue-500' />
							<h4 className='text-sm font-semibold'>Johnny</h4>
						</div>
						<div className='flex items-center gap-2'>
							<TbStarFilled className='text-yellow-500' />
							<span className='text-xs font-semibold text-neutral-500'>5.0 (800)</span>
						</div>
					</div>

					<Button variant='accent' size='icon' className='rounded-full w-10 h-10 ml-auto'>
						<TbMessage size={24} strokeWidth={1} />
					</Button>
					<Button variant='accent' size='icon' className='rounded-full w-10 h-10'>
						<TbPhone size={24} strokeWidth={1} />
					</Button>
				</div>
			</div>


			{/* MAP DEMO */}
			<figure className='z-10 absolute top-0 left-0 w-full h-full'>
				<Image src='/map.jpg' width={750} height={1624} alt='' className='w-auto h-auto opacity-40' />
			</figure>
		</>
	)
}
