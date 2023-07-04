import RightSidebar from '../../components/RightSidebar';

export const metadata = {
	title: 'InDrive Team'
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<div className='content flex-1'>
				{children}
			</div>
			<RightSidebar />
		</>
	)
}