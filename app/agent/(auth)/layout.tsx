import Providers from '@/components/Providers';
import '../../globals.scss';

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
