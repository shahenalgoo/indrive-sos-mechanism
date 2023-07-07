
// Components
import ClientLogin from '@/app/(client)/(auth)/ClientLogin';

export default function Home() {
	return (
		<div className='auth-wrapper h-full flex justify-center items-center px-4'>
			<ClientLogin />
		</div>
	)
}
