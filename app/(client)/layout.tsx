import '../globals.scss';
import SOSModal from './components/sos-modal';
import ClientProviders from '@/components/ClientProviders';

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
				<body className='bg-neutral-900 h-screen flex flex-col justify-center items-center'>
					<div className='relative w-full max-w-[360px] h-[calc(100vh_-_50px)] max-h-[740px] bg-white rounded-3xl overflow-hidden'>

						{children}
						<SOSModal />

					</div>
				</body>
			</ClientProviders>
		</html>
	)
}
