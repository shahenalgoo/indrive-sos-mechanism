import '../../globals.scss';

// Components
import AgentProviders from '@/components/AgentProviders';
import CheckUser from '../components/CheckUser';
import LeftSidebar from '../components/LeftSidebar';




// Metadata
//
export const metadata = {
	title: 'InDrive Team'
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<AgentProviders>
				<CheckUser>
					<body className='h-[calc(100vh_-_56px)] overflow-hidden'>
						<main className='h-full flex'>

							<LeftSidebar />
							{children}

						</main>
					</body>
				</CheckUser>
			</AgentProviders>
		</html>
	)
}
