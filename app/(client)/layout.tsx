import '../globals.scss';
import Providers from '@/components/Providers';
import SosModal from './components/SosModal';

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
			<Providers>
				<body className='bg-neutral-900 h-screen flex flex-col justify-center items-center'>
					<div className='relative w-full max-w-[360px] h-[calc(100vh_-_50px)] max-h-[740px] bg-white rounded-3xl overflow-hidden'>

						{children}
						<SosModal />

					</div>
				</body>
			</Providers>
		</html>
	)
}
