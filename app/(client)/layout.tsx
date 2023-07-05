import '../globals.scss';

import ClientProviders from '@/components/ClientProviders';
import SosModal from './components/sos/SosModal';

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

					</div>
				</body>
			</ClientProviders>
		</html>
	)
}
