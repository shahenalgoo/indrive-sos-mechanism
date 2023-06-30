import '../../globals.scss';

// Components
import AgentProviders from '@/components/AgentProviders';
import CheckUser from '../components/CheckUser';
import NavbarAgent from '../components/Navbar';
import LeftSidebar from '../components/LeftSidebar';

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
						<NavbarAgent />

						<main className='mt-14 h-full flex'>
							<LeftSidebar />
							{children}
						</main>
					</body>
				</CheckUser>
			</AgentProviders>
		</html>
	)
}
