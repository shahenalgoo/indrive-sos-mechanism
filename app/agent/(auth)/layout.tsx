import '../../globals.scss';

// Providers
import Providers from '@/components/ClientProviders';




// Metadata
//
export const metadata = {
	title: 'InDrive Agent'
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<Providers>
				<body className='h-screen w-full flex justify-center items-center px-4'>
					{children}
				</body>
			</Providers>
		</html>
	)
}
