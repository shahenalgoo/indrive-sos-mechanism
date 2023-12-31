import '../globals.scss';

// Provider
import ClientProviders from '@/components/ClientProviders';

// Modals
import SosModal from './components/sos/SosModal';
import PrecautionsModal from './components/precautions/PrecautionModal';
import RideDetailsModal from './components/ride-details/RideDetailsModal';

// Toaster
import Toaster from '@/components/misc/Toaster';
import CheckUser from './components/CheckUser';




// Metadata
//
export const metadata = {
	title: 'InDrive SOS'
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<ClientProviders>
				<body className='bg-neutral-950 h-screen flex flex-col justify-center items-center'>
					<div className='relative w-full max-w-[360px] h-[calc(100vh_-_50px)] max-h-[740px] bg-white rounded-3xl overflow-hidden shadow-[0_0_0_10px_rgba(255,255,255,0.1)]'>

						{children}
						<SosModal />
						<PrecautionsModal />
						<RideDetailsModal />
						<Toaster />

					</div>
				</body>
			</ClientProviders>
		</html>
	)
}
