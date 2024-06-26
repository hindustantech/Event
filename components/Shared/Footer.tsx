import Link from 'next/link'
import Image from 'next/image'
const Footer = () => {
  return (
<footer className='border-t'>
  <div className="flex items-center justify-between flex-col gap-4 p-5 text-center sm:flex-row">
    <Link href='/'>
      <Image 
        src="/assets/images/logo.png"
        alt="logo"
        width={128}
        height={30}
      />
    </Link>
    <p>2024 Evently. All Right</p>
  </div>
</footer>

  )
}

export default Footer