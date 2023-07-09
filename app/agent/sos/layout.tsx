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
					<body className='overflow-hidden'>
						<main className='flex'>

							<LeftSidebar />
							{children}

						</main>
					</body>
				</CheckUser>
			</AgentProviders>
		</html>
	)
}
