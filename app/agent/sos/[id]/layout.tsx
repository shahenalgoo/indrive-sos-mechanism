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
		<div className='w-full h-screen'>
			{children}
		</div>
	)
}
